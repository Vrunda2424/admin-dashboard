import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import "../styles/dashboard.css";

// Shared shell: navbar and sidebar stay on every page, only <Outlet /> changes.
export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="shell">
      <Navbar onMenuClick={() => setMenuOpen((o) => !o)} />
      <Sidebar open={menuOpen} onClose={closeMenu} />
      <main className="content">
        <Outlet />
      </main>
      {menuOpen && <div className="overlay" onClick={closeMenu} />}
    </div>
  );
}
