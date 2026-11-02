import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import PageLoader from "./PageLoader.jsx";
import "../styles/dashboard.css";

const SPINNER_PATHS = ["/dashboard", "/users", "/analytics", "/settings"];
const COLLAPSE_KEY = "sidebarCollapsed";

// Shared shell: navbar, sidebar, and footer stay on every page, only the page content changes.
export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false); // mobile and tablet menu
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(COLLAPSE_KEY) === "true";
    } catch {
      return false;
    }
  });
  const { pathname } = useLocation();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSE_KEY, String(collapsed));
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  return (
    <div className={`shell${collapsed ? " collapsed" : ""}`}>
      <Navbar onMenuClick={() => setMenuOpen((o) => !o)} />
      <Sidebar open={menuOpen} onClose={closeMenu} collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} />
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
