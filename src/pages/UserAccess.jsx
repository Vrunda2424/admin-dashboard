import { useCallback, useEffect, useState } from "react";
import { RefreshCw, UserPlus } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import UserAccessTable from "../components/UserAccessTable.jsx";
import AddUserModal from "../components/AddUserModal.jsx";
import { fetchUsers } from "../services/api.js";

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
          <button type="button" className="btn-secondary" onClick={loadUsers} disabled={loading}>
            <RefreshCw size={16} aria-hidden="true" /> Refresh
          </button>
          <button type="button" className="btn-primary add-btn" onClick={() => setModalOpen(true)}>
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
          <UserAccessTable users={users} />
        )}
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
