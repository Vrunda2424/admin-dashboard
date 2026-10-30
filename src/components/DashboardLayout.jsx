import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import PageLoader from "./PageLoader.jsx";
import "../styles/dashboard.css";

const SPINNER_PATHS = ["/dashboard", "/users", "/analytics", "/settings"];

// Shared shell: navbar, sidebar, and footer stay on every page, only the page content changes.
export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="shell">
      <Navbar onMenuClick={() => setMenuOpen((o) => !o)} />
      <Sidebar open={menuOpen} onClose={closeMenu} />
      <div className="main-col">
        <main className="content">
          {SPINNER_PATHS.includes(pathname) ? (
            <PageLoader key={pathname}><Outlet /></PageLoader>
          ) : (
            <Outlet />
          )}
        </main>
        <Footer />
      </div>
      {menuOpen && <div className="overlay" onClick={closeMenu} />}
    </div>
  );
}
