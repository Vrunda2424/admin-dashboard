import { useEffect, useState } from "react";
import UserFormFields, { EMPTY_USER } from "./UserFormFields.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { createUserRequest } from "../services/api.js";
import { downloadCsv } from "../utils/csv.js";
import { validateUser } from "../utils/validators.js";

const CREDENTIAL_COLUMNS = [
  { label: "Username", value: (row) => row.username },
  { label: "Password", value: (row) => row.password },
];

export default function AddUserModal({ actorRole, onClose, onCreated }) {
  const { showToast } = useToast();
  const [values, setValues] = useState(EMPTY_USER);
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
    const found = validateUser(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const trimmedUsername = values.username.trim();
    const trimmedEmail = values.email.trim();

    setSaving(true);
    try {
      await createUserRequest({ ...values, username: trimmedUsername, email: trimmedEmail });
      downloadCsv(`${trimmedUsername}-credentials.csv`, CREDENTIAL_COLUMNS, [
        { username: trimmedUsername, password: values.password },
      ]);
      showToast("User added and credentials CSV downloaded", "success");
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
        <UserFormFields values={values} errors={errors} onChange={handleChange} actorRole={actorRole} />
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving..." : "Create user"}</button>
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
