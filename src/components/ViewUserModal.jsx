import Modal from "./Modal.jsx";
import DetailRows from "./DetailRows.jsx";
import { formatDateTime } from "../utils/format.js";

export default function ViewUserModal({ user, onClose }) {
  const rows = [
    ["ID", user.id],
    ["Username", user.username],
    ["Email", user.email || "-"],
    ["Role", user.role],
    ["Status", <span key="s" className={`badge ${user.status.toLowerCase()}`}>{user.status}</span>],
    ["Registration Date", formatDateTime(user.registration_date)],
  ];
  return (
    <Modal title="User details" onClose={onClose}>
      <DetailRows rows={rows} />
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
}
