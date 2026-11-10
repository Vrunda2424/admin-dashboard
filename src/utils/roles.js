export const ROLES = [
  { value: "super_admin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "analyst", label: "Analyst" },
  { value: "support_staff", label: "Support Staff" },
];

export const roleLabel = (value) => ROLES.find((r) => r.value === value)?.label ?? value;

// The roles each role may create, edit, and delete. The Flask API enforces the same rules.
const MANAGEABLE = {
  super_admin: ROLES.map((r) => r.value),
  admin: ["manager", "analyst", "support_staff"],
};
const manageable = (role) => (Object.hasOwn(MANAGEABLE, role) ? MANAGEABLE[role] : []);

export const canOpenUam = (role) => Object.hasOwn(MANAGEABLE, role);
export const assignableRoles = (role) => ROLES.filter((r) => manageable(role).includes(r.value));
export const canManageUser = (actorRole, actorUsername, user) => user.username !== actorUsername && manageable(actorRole).includes(user.role);
