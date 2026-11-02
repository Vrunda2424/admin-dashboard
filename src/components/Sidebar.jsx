import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, Settings, PanelLeftClose, PanelLeftOpen } from "lucide-react";

const LINKS = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }) {
  return (
    <aside className={`sidebar${open ? " open" : ""}`} aria-label="Main navigation">
      <nav>
        {LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={onClose} data-tip={label} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            <Icon size={18} aria-hidden="true" />
            <span className="nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>
      <button type="button" className="collapse-btn" data-tip={collapsed ? "Expand" : undefined} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={onToggleCollapse}>
        {collapsed ? <PanelLeftOpen size={18} aria-hidden="true" /> : <PanelLeftClose size={18} aria-hidden="true" />}
        <span className="nav-label">Collapse</span>
      </button>
    </aside>
  );
}
