import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import UserAccessTable from "../components/UserAccessTable.jsx";
import { fetchUsers } from "../services/api.js";

export default function UserAccess() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        <button type="button" className="btn-secondary" onClick={loadUsers} disabled={loading}>
          <RefreshCw size={16} aria-hidden="true" /> Refresh
        </button>
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
    </>
  );
}
