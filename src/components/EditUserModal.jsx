import { useState } from "react";
import Modal from "./Modal.jsx";
import DetailRows from "./DetailRows.jsx";
import { updateUserRequest } from "../services/api.js";
import { formatDateTime } from "../utils/format.js";

// Only role and status can be changed. Everything else is shown as read-only text.
export default function EditUserModal({ user, onClose, onSaved }) {
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const changed = role !== user.role || status !== user.status;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserRequest(user.id, { role, status });
      onSaved();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const readOnly = [
    ["ID", user.id],
    ["Username", user.username],
    ["Email", user.email || "-"],
    ["Password", "********"],
    ["Registration Date", formatDateTime(user.registration_date)],
  ];

  return (
    <Modal title="Edit user" onClose={onClose}>
      <form onSubmit={handleSubmit} className="modal-form">
        {error && <div className="alert" role="alert">{error}</div>}
        <DetailRows rows={readOnly} />
        <div className="field">
          <label htmlFor="edit-role">Role</label>
          <select id="edit-role" value={role} onChange={(e) => { setRole(e.target.value); setError(""); }}>
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="edit-status">Status</label>
          <select id="edit-status" value={status} onChange={(e) => { setStatus(e.target.value); setError(""); }}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={!changed || saving}>{saving ? "Saving..." : "Save changes"}</button>
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}
