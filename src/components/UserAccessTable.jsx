import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatDateTime } from "../utils/format.js";
import { canManageUser, roleLabel } from "../utils/roles.js";

// All three action buttons are disabled on your own row, and on any role you are not allowed to manage.
export default function UserAccessTable({ users, currentUsername, actorRole, onView, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th>Registration Date</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan={7} className="empty">No registered users yet.</td></tr>
          ) : (
            users.map((u) => {
              const allowed = canManageUser(actorRole, currentUsername, u);
              const blocked = u.username === currentUsername ? "You cannot manage your own account" : "You do not have permission to manage this role";
              return (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email || "-"}</td>
                  <td>{roleLabel(u.role)}</td>
                  <td><span className={`badge ${u.status.toLowerCase()}`}>{u.status}</span></td>
                  <td>{formatDateTime(u.registration_date)}</td>
                  <td className="actions-col">
                    <div className="icon-actions">
                      <button type="button" className="icon-btn view" title={allowed ? "View" : blocked} aria-label={`View ${u.username}`} disabled={!allowed} onClick={() => onView(u)}>
                        <Eye size={18} aria-hidden="true" />
                      </button>
                      <button type="button" className="icon-btn edit" title={allowed ? "Edit" : blocked} aria-label={`Edit ${u.username}`} disabled={!allowed} onClick={() => onEdit(u)}>
                        <Pencil size={18} aria-hidden="true" />
                      </button>
                      <button type="button" className="icon-btn delete" title={allowed ? "Delete" : blocked} aria-label={`Delete ${u.username}`} disabled={!allowed} onClick={() => onDelete(u)}>
                        <Trash2 size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
