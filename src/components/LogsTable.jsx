import { formatDateTime } from "../utils/format.js";

// Click a row (or press Enter on it) to open its details.
export default function LogsTable({ logs, selectedId, onSelect }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>ID</th><th>Username</th><th>Action</th><th>IP address</th><th>Device</th><th>Browser</th><th>Timestamp</th><th>Status</th></tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr><td colSpan={8} className="empty">No log entries yet.</td></tr>
          ) : (
            logs.map((log) => (
              <tr
                key={log.id}
                className={`clickable${log.id === selectedId ? " selected" : ""}`}
                tabIndex={0}
                onClick={() => onSelect(log.id)}
                onKeyDown={(e) => e.key === "Enter" && onSelect(log.id)}
              >
                <td>{log.id}</td>
                <td>{log.username}</td>
                <td>{log.action}</td>
                <td>{log.ip_address}</td>
                <td>{log.device}</td>
                <td>{log.browser}</td>
                <td>{formatDateTime(log.timestamp)}</td>
                <td><span className={`badge ${log.status.toLowerCase()}`}>{log.status}</span></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
