const formatDateTime = (iso) =>
  new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

export default function UserAccessTable({ users }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>ID</th><th>Username</th><th>Registered</th></tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan={3} className="empty">No registered users yet.</td></tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{formatDateTime(u.created_at)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
