const formatDate = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function RecentRegistrationsTable({ users }) {
  return (
    <section className="card">
      <h3>Recent registrations</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Status</th><th>Registered</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span className={`badge ${u.status.toLowerCase()}`}>{u.status}</span></td>
                <td>{formatDate(u.registeredAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
