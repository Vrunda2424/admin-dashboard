import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/dashboard", label: "Overview" },
  { to: "/users", label: "Users" },
  { to: "/analytics", label: "Analytics" },
  { to: "/settings", label: "Settings" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`sidebar${open ? " open" : ""}`} aria-label="Main navigation">
      <nav>
        {LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
