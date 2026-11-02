import { useCallback, useEffect, useState } from "react";
import { Download, RefreshCw, UserPlus } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import UserAccessTable from "../components/UserAccessTable.jsx";
import AddUserModal from "../components/AddUserModal.jsx";
import { fetchUsers } from "../services/api.js";
import { downloadCsv } from "../utils/csv.js";

const CSV_COLUMNS = [
  { label: "ID", value: (u) => u.id },
  { label: "Username", value: (u) => u.username },
  { label: "Registered (UTC)", value: (u) => u.created_at },
];

export default function UserAccess() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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
          <button type="button" className="btn-primary add-btn" onClick={() => setModalOpen(true)}>
            <UserPlus size={16} aria-hidden="true" /> Add User
          </button>
        </div>
      </div>
      <section className="card">
        {loading ? <p className="muted">Loading users...</p> : error ? <div className="alert" role="alert">{error}</div> : <UserAccessTable users={users} />}
      </section>
      {modalOpen && (
        <AddUserModal
          onClose={() => setModalOpen(false)}
          onCreated={() => {
            setModalOpen(false);
            loadUsers();
          }}
        />
      )}
    </>
  );
}
