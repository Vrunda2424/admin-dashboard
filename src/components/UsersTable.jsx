const formatDate = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function UsersTable({ users }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Registered</th><th>Status</th></tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan={5} className="empty">No users match your search or filter.</td></tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{formatDate(u.registeredAt)}</td>
                <td><span className={`badge ${u.status.toLowerCase()}`}>{u.status}</span></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
