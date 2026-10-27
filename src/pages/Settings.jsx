import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import PageHeader from "../components/PageHeader.jsx";
import FormField from "../components/FormField.jsx";
import { currentUserProfile } from "../data/dashboardData.js";

const STORAGE_KEY = "profile";
const EDITABLE = ["name", "email", "phone"];

const loadProfile = () => {
  try {
    return { ...currentUserProfile, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return currentUserProfile;
  }
};

const validate = ({ name, email, phone }) => {
  const errors = {};
  if (!name.trim()) errors.name = "Enter your full name.";
  else if (name.trim().length < 3) errors.name = "Name must be at least 3 characters.";
  if (!email.trim()) errors.email = "Enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Enter a valid email address.";
  if (!/^\d{10}$/.test(phone)) errors.phone = "Phone number must be exactly 10 digits.";
  return errors;
};

export default function Settings() {
  const { username } = useAuth();
  const [saved, setSaved] = useState(loadProfile);
  const [values, setValues] = useState(saved);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const dirty = EDITABLE.some((k) => values[k] !== saved[k]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    const next = { ...values, name: values.name.trim(), email: values.email.trim() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(next);
    setValues(next);
    setMessage("Profile updated.");
  };

  const handleCancel = () => {
    setValues(saved);
    setErrors({});
    setMessage("");
  };

  return (
    <>
      <PageHeader title="Settings" subtitle="View and edit your profile." />
      <div className="settings-grid">
        <section className="card profile-card">
          <div className="avatar" aria-hidden="true">{saved.name.charAt(0).toUpperCase()}</div>
          <h3>{saved.name}</h3>
          <p className="muted">{saved.email}</p>
          <p className="muted">Username: {username}</p>
          <span className="badge active">{saved.role}</span>
        </section>

        <form className="card settings-form" onSubmit={handleSave} noValidate>
          <h3>Edit profile</h3>
          {message && <div className="success" role="status">{message}</div>}
          <FormField label="Full name" name="name" value={values.name} onChange={handleChange} error={errors.name} />
          <FormField label="Email" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
          <FormField label="Phone" name="phone" type="tel" value={values.phone} onChange={handleChange} error={errors.phone} inputMode="numeric" />
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={!dirty}>Save changes</button>
            <button type="button" className="btn-secondary" disabled={!dirty} onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}
