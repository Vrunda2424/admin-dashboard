import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { loginRequest, setUnauthorizedHandler } from "../services/api.js";
import { useToast } from "./ToastContext.jsx";

const KEYS = ["username", "role", "token"];
const EMPTY = { username: null, role: null, token: null };
const AuthContext = createContext(null);

const readSession = () => {
  try {
    return Object.fromEntries(KEYS.map((k) => [k, localStorage.getItem(k)]));
  } catch {
    return EMPTY;
  }
};

export function AuthProvider({ children }) {
  const { showToast } = useToast();
  // Reading storage in the initializer keeps the session after a page refresh.
  const [session, setSession] = useState(readSession);

  // Returns { ok: true } or { ok: false, message, status } so the page can react to it.
  const login = async (inputUser, inputPassword) => {
    try {
      const { user, token } = await loginRequest(inputUser, inputPassword);
      localStorage.setItem("username", user.username);
      localStorage.setItem("role", user.role);
      localStorage.setItem("token", token);
      setSession({ username: user.username, role: user.role, token });
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err.message, status: err.status };
    }
  };

  const logout = useCallback(() => {
    KEYS.forEach((k) => localStorage.removeItem(k));
    setSession(EMPTY);
  }, []);

  // If the server rejects the token (expired, or the account was removed), sign the user out.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout();
      showToast("Your session has expired. Please sign in again.", "error");
    });
  }, [logout, showToast]);

  // A session saved before roles existed has no token, so it counts as signed out.
  const isAuthenticated = Boolean(session.username && session.role && session.token);

  return (
    <AuthContext.Provider value={{ username: session.username, role: session.role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
