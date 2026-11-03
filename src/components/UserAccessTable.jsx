const formatDateTime = (iso) => new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

export default function UserAccessTable({ users }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th>Registration Date</th></tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan={6} className="empty">No registered users yet.</td></tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email || "-"}</td>
                <td>{u.role}</td>
                <td><span className={`badge ${u.status.toLowerCase()}`}>{u.status}</span></td>
                <td>{formatDateTime(u.registration_date)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
