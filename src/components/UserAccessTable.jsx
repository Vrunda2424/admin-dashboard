import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatDateTime } from "../utils/format.js";

export default function UserAccessTable({ users, currentUsername, onView, onEdit, onDelete }) {
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
              const isSelf = u.username === currentUsername;
              return (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email || "-"}</td>
                  <td>{u.role}</td>
                  <td><span className={`badge ${u.status.toLowerCase()}`}>{u.status}</span></td>
                  <td>{formatDateTime(u.registration_date)}</td>
                  <td className="actions-col">
                    <div className="icon-actions">
                      <button type="button" className="icon-btn view" title="View" aria-label={`View ${u.username}`} onClick={() => onView(u)}>
                        <Eye size={18} aria-hidden="true" />
                      </button>
                      <button type="button" className="icon-btn edit" title="Edit" aria-label={`Edit ${u.username}`} onClick={() => onEdit(u)}>
                        <Pencil size={18} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="icon-btn delete"
                        title={isSelf ? "You cannot delete your own account" : "Delete"}
                        aria-label={`Delete ${u.username}`}
                        disabled={isSelf}
                        onClick={() => onDelete(u)}
                      >
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
