import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, User, LogOut, ShieldCheck, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import useDismiss from "../hooks/useDismiss.js";
import Logo from "./Logo.jsx";
import NotificationBell from "./NotificationBell.jsx";

export default function Navbar({ onMenuClick }) {
  const { username, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(menuRef, close);

  const goToUam = () => {
    setOpen(false);
    navigate("/uam");
  };

  const handleLogout = () => {
    logout();
    showToast("Logged out", "success");
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button type="button" className="menu-btn" aria-label="Toggle navigation menu" onClick={onMenuClick}>
          <Menu size={20} aria-hidden="true" />
        </button>
        <Logo />
      </div>
      <div className="navbar-actions">
        <button
          type="button"
          className="profile-btn"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
        </button>
        <NotificationBell />
        <div className="profile" ref={menuRef}>
          <button
            type="button"
            className="profile-btn"
            aria-label="Open profile menu"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <User size={20} aria-hidden="true" />
          </button>
          {open && (
            <div className="dropdown" role="menu">
              <p className="dropdown-user">{username}</p>
              <button type="button" role="menuitem" className="dropdown-item" onClick={goToUam}>
                <ShieldCheck size={16} aria-hidden="true" /> User Access Management
              </button>
              <button type="button" role="menuitem" className="dropdown-logout" onClick={handleLogout}>
                <LogOut size={16} aria-hidden="true" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
