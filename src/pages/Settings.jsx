import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import PageHeader from "../components/PageHeader.jsx";
import FormField from "../components/FormField.jsx";
import { Spinner, ErrorPanel } from "../components/FetchState.jsx";
import useApi from "../hooks/useApi.js";
import { fetchSettings, saveSettings } from "../services/api.js";
import { roleLabel } from "../utils/roles.js";

const EDITABLE = ["name", "email", "phone"];

const validate = ({ name, email, phone }) => {
  const errors = {};
  if (!name.trim()) errors.name = "Enter your full name.";
  else if (name.trim().length < 3) errors.name = "Name must be at least 3 characters.";
  if (!email.trim()) errors.email = "Enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Enter a valid email address.";
  if (!/^\d{10}$/.test(phone)) errors.phone = "Phone number must be exactly 10 digits.";
  return errors;
};

function SettingsForm({ profile }) {
  const { showToast } = useToast();
  const [saved, setSaved] = useState(profile);
  const [values, setValues] = useState(profile);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const dirty = EDITABLE.some((k) => values[k] !== saved[k]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    try {
      const { profile: updated } = await saveSettings({ username: saved.username, name: values.name, email: values.email, phone: values.phone });
      setSaved(updated);
      setValues(updated);
      setMessage("Profile updated.");
      showToast("Profile updated", "success");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setValues(saved);
    setErrors({});
    setMessage("");
  };

  return (
    <div className="settings-grid">
      <section className="card profile-card">
        <div className="avatar" aria-hidden="true">{saved.name.charAt(0).toUpperCase()}</div>
        <h3>{saved.name}</h3>
        <p className="muted">{saved.email || "No email on file"}</p>
        <p className="muted">Username: {saved.username}</p>
        <span className="badge active">{roleLabel(saved.role)}</span>
      </section>

      <form className="card settings-form" onSubmit={handleSave} noValidate>
        <h3>Edit profile</h3>
        {message && <div className="success" role="status">{message}</div>}
        <FormField label="Full name" name="name" value={values.name} onChange={handleChange} error={errors.name} />
        <FormField label="Email" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
        <FormField label="Phone" name="phone" type="tel" value={values.phone} onChange={handleChange} error={errors.phone} inputMode="numeric" />
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={!dirty || saving}>{saving ? "Saving..." : "Save changes"}</button>
          <button type="button" className="btn-secondary" disabled={!dirty || saving} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default function Settings() {
  const { username } = useAuth();
  const { data, loading, error, reload } = useApi(() => fetchSettings(username), [username]);

  return (
    <>
      <PageHeader title="Settings" subtitle="View and edit your profile." />
      {!data ? (loading ? <Spinner /> : <ErrorPanel message={error} onRetry={reload} />) : <SettingsForm profile={data.profile} />}
    </>
  );
}
