import { useCallback, useEffect, useState } from "react";
import { Download, RefreshCw, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import PageHeader from "../components/PageHeader.jsx";
import UserAccessTable from "../components/UserAccessTable.jsx";
import AddUserModal from "../components/AddUserModal.jsx";
import ViewUserModal from "../components/ViewUserModal.jsx";
import EditUserModal from "../components/EditUserModal.jsx";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog.jsx";
import { fetchUsers } from "../services/api.js";
import { downloadCsv } from "../utils/csv.js";

const CSV_COLUMNS = [
  { label: "ID", value: (u) => u.id },
  { label: "Username", value: (u) => u.username },
  { label: "Email", value: (u) => u.email },
  { label: "Role", value: (u) => u.role },
  { label: "Status", value: (u) => u.status },
  { label: "Registration Date (UTC)", value: (u) => u.registration_date },
];

export default function UserAccess() {
  const { username } = useAuth();
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [dialog, setDialog] = useState(null); // { type: "view" | "edit" | "delete", user }

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setUsers(await fetchUsers());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const closeDialog = () => setDialog(null);
  const afterChange = (message) => {
    showToast(message, "success");
    closeDialog();
    loadUsers(); // refresh the table
  };

  return (
    <>
      <div className="page-top">
        <PageHeader title="User Access Management" subtitle="All registered users from the database." />
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => downloadCsv("uam-users.csv", CSV_COLUMNS, users)} disabled={loading || users.length === 0}>
            <Download size={16} aria-hidden="true" /> Export CSV
          </button>
          <button type="button" className="btn-secondary" onClick={loadUsers} disabled={loading}>
            <RefreshCw size={16} aria-hidden="true" /> Refresh
          </button>
          <button type="button" className="btn-primary add-btn" onClick={() => setAddOpen(true)}>
            <UserPlus size={16} aria-hidden="true" /> Add User
          </button>
        </div>
      </div>
      <section className="card">
        {loading ? (
          <p className="muted">Loading users...</p>
        ) : error ? (
          <div className="alert" role="alert">{error}</div>
        ) : (
          <UserAccessTable
            users={users}
            currentUsername={username}
            onView={(user) => setDialog({ type: "view", user })}
            onEdit={(user) => setDialog({ type: "edit", user })}
            onDelete={(user) => setDialog({ type: "delete", user })}
          />
        )}
      </section>

      {addOpen && (
        <AddUserModal
          onClose={() => setAddOpen(false)}
          onCreated={() => {
            setAddOpen(false);
            loadUsers();
          }}
        />
      )}
      {dialog?.type === "view" && <ViewUserModal user={dialog.user} onClose={closeDialog} />}
      {dialog?.type === "edit" && <EditUserModal user={dialog.user} onClose={closeDialog} onSaved={() => afterChange("User updated")} />}
      {dialog?.type === "delete" && <ConfirmDeleteDialog user={dialog.user} onClose={closeDialog} onDeleted={() => afterChange("User deleted")} />}
    </>
  );
}
