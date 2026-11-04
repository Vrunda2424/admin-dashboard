import { useState } from "react";
import Modal from "./Modal.jsx";
import { deleteUserRequest } from "../services/api.js";

export default function ConfirmDeleteDialog({ user, onClose, onDeleted }) {
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleYes = async () => {
    setDeleting(true);
    try {
      await deleteUserRequest(user.id);
      onDeleted();
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  return (
    <Modal title="Delete user" onClose={onClose} narrow>
      <p className="confirm-text">Are you sure you want to delete this user?</p>
      <p className="muted">{user.username}{user.email ? ` (${user.email})` : ""}</p>
      {error && <div className="alert" role="alert">{error}</div>}
      <div className="form-actions">
        <button type="button" className="btn-danger" onClick={handleYes} disabled={deleting}>{deleting ? "Deleting..." : "Yes"}</button>
        <button type="button" className="btn-secondary" onClick={onClose} disabled={deleting}>No</button>
      </div>
    </Modal>
  );
}
