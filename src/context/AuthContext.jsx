import { createContext, useContext, useState } from "react";

const STORAGE_KEY = "username";
// Dummy credentials for this task only. Real apps verify credentials on a server.
const DUMMY_USER = { username: "admin", password: "admin123" };

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

  const login = (inputUser, inputPassword) => {
    const valid =
      inputUser === DUMMY_USER.username && inputPassword === DUMMY_USER.password;
    if (valid) {
      localStorage.setItem(STORAGE_KEY, inputUser);
      setUsername(inputUser);
    }
    return valid;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{ username, isAuthenticated: Boolean(username), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
