import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, User, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "./Logo.jsx";

export default function Navbar({ onMenuClick }) {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const goToUam = () => {
    setOpen(false);
    navigate("/uam");
  };

  const handleLogout = () => {
    logout();
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
    </header>
  );
}
