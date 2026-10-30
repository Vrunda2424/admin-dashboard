import { createContext, useContext, useState } from "react";
import { loginRequest } from "../services/api.js";

const STORAGE_KEY = "username";
const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  // Reading storage in the initializer keeps the session after a page refresh.
  const [username, setUsername] = useState(readStoredUser);

  // Returns { ok: true } or { ok: false, message, status } so the page can react to it.
  const login = async (inputUser, inputPassword) => {
    try {
      const { user } = await loginRequest(inputUser, inputPassword);
      localStorage.setItem(STORAGE_KEY, user.username);
      setUsername(user.username);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err.message, status: err.status };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ username, isAuthenticated: Boolean(username), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
