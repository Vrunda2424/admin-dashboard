import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, Settings } from "lucide-react";

const LINKS = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`sidebar${open ? " open" : ""}`} aria-label="Main navigation">
      <nav>
        {LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            <Icon size={18} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
