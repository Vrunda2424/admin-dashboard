import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FormField from "./FormField.jsx";
import { changePasswordRequest } from "../services/api.js";
import { validatePassword } from "../utils/validators.js";

const validate = ({ current, next, confirm }) => {
  const errors = {};
  if (!current) errors.current = "Enter your current password.";
  if (!next) errors.next = "Enter a new password.";
  else if (validatePassword(next)) errors.next = validatePassword(next);
  if (!confirm) errors.confirm = "Confirm your new password.";
  else if (confirm !== next) errors.confirm = "Passwords do not match.";
  return errors;
};

export default function ChangePasswordModal({ username, onClose, onChanged }) {
  const [values, setValues] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    try {
      await changePasswordRequest(username, values.current, values.next); // server checks the current password
      onChanged();
    } catch (err) {
      setServerError(err.message);
      setSaving(false);
    }
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" role="dialog" aria-modal="true" aria-labelledby="change-pw-title" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} noValidate>
        <h3 id="change-pw-title">Change password</h3>
        {serverError && <div className="alert" role="alert">{serverError}</div>}
        <FormField label="Current password" name="current" type="password" value={values.current} onChange={handleChange} error={errors.current} autoComplete="current-password" />
        <FormField label="New password" name="next" type="password" value={values.next} onChange={handleChange} error={errors.next} autoComplete="new-password" />
        <FormField label="Confirm new password" name="confirm" type="password" value={values.confirm} onChange={handleChange} error={errors.confirm} autoComplete="new-password" />
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving..." : "Change password"}</button>
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>,
    document.body
  );
}
