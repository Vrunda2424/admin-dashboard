import { useEffect, useState } from "react";
import FormField from "./FormField.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { registerRequest } from "../services/api.js";
import { validateCredentials } from "../utils/validators.js";

export default function AddUserModal({ onClose, onCreated }) {
  const { showToast } = useToast();
  const [values, setValues] = useState({ username: "", password: "" });
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
    const found = validateCredentials(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return; // blocked until every rule passes

    setSaving(true);
    try {
      await registerRequest(values.username.trim(), values.password);
      showToast("User added", "success");
      onCreated();
    } catch (err) {
      setServerError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" role="dialog" aria-modal="true" aria-labelledby="add-user-title" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} noValidate>
        <h3 id="add-user-title">Add User</h3>
        {serverError && <div className="alert" role="alert">{serverError}</div>}
        <FormField label="Username" name="username" value={values.username} onChange={handleChange} error={errors.username} autoComplete="off" />
        <FormField label="Password" name="password" type="password" value={values.password} onChange={handleChange} error={errors.password} autoComplete="new-password" />
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving..." : "Create user"}</button>
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
