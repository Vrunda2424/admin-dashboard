import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, Settings, Landmark, Smartphone, ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";

const LINKS = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

// Parent tabs with two sub-tabs each.
const GROUPS = [
  {
    key: "internet", label: "Internet Banking", icon: Landmark, base: "/internet-banking",
    children: [{ to: "/internet-banking/dashboard", label: "Dashboard" }, { to: "/internet-banking/users", label: "User Details" }, { to: "/internet-banking/user-logs", label: "User Logs" }],
  },
  {
    key: "mobile", label: "Mobile Banking", icon: Smartphone, base: "/mobile-banking",
    children: [{ to: "/mobile-banking/dashboard", label: "Dashboard" }, { to: "/mobile-banking/users", label: "User Details" }, { to: "/mobile-banking/user-logs", label: "User Logs" }],
  },
];

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse, onExpand }) {
  const { pathname } = useLocation();
  const [openGroups, setOpenGroups] = useState(() => GROUPS.filter((g) => pathname.startsWith(g.base)).map((g) => g.key));

  const toggleGroup = (group) => {
    if (collapsed) onExpand(); // an icon-only sidebar has no room for sub-tabs, so open it first
    setOpenGroups((list) => (collapsed || !list.includes(group.key) ? [...new Set([...list, group.key])] : list.filter((k) => k !== group.key)));
  };

  return (
    <aside className={`sidebar${open ? " open" : ""}`} aria-label="Main navigation">
      <div className="sidebar-top">
        <button type="button" className="collapse-btn" data-tip={collapsed ? "Expand" : undefined} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={onToggleCollapse}>
          {collapsed ? <PanelLeftOpen size={18} aria-hidden="true" /> : <PanelLeftClose size={18} aria-hidden="true" />}
        </button>
      </div>
      <nav>
        {LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={onClose} data-tip={label} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            <Icon size={18} aria-hidden="true" />
            <span className="nav-label">{label}</span>
          </NavLink>
        ))}
        {GROUPS.map((group) => {
          const Icon = group.icon;
          const isOpen = openGroups.includes(group.key);
          const insideGroup = pathname.startsWith(group.base);
          return (
            <div key={group.key}>
              <button
                type="button"
                className={`nav-link nav-group${insideGroup ? " parent-active" : ""}`}
                data-tip={group.label}
                aria-expanded={isOpen}
                aria-controls={`sub-${group.key}`}
                onClick={() => toggleGroup(group)}
              >
                <Icon size={18} aria-hidden="true" />
                <span className="nav-label">{group.label}</span>
                <ChevronDown size={16} className={`chevron${isOpen ? " open" : ""}`} aria-hidden="true" />
              </button>
              {isOpen && (
                <div className="sub-list" id={`sub-${group.key}`}>
                  {group.children.map((child) => (
                    <NavLink key={child.to} to={child.to} onClick={onClose} className={({ isActive }) => `sub-link${isActive ? " active" : ""}`}>
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
