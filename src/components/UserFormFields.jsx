import { KeyRound } from "lucide-react";
import FormField from "./FormField.jsx";
import { assignableRoles } from "../utils/roles.js";

export const EMPTY_USER = { username: "", email: "", password: "", role: "support_staff", status: "Active" };

const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const LOWER = "abcdefghijkmnopqrstuvwxyz";
const DIGITS = "23456789";
const SPECIAL = "!@#$%&*?";

function generateStrongPassword(length = 12) {
  const pick = (chars) => chars[Math.floor(Math.random() * chars.length)];
  const required = [pick(UPPER), pick(LOWER), pick(DIGITS), pick(SPECIAL)];
  const all = UPPER + LOWER + DIGITS + SPECIAL;
  while (required.length < length) {
    required.push(pick(all));
  }
  for (let i = required.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [required[i], required[j]] = [required[j], required[i]];
  }
  return required.join("");
}

function SelectField({ label, name, value, options, onChange }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

const STATUS_OPTIONS = [{ value: "Active", label: "Active" }, { value: "Inactive", label: "Inactive" }];

export default function UserFormFields({ values, errors, onChange, actorRole }) {
  const handleGeneratePassword = () => {
    const generated = generateStrongPassword(12);
    onChange({ target: { name: "password", value: generated } });
  };

  return (
    <>
      <FormField label="Username" name="username" value={values.username} onChange={onChange} error={errors.username} autoComplete="off" />
      <FormField label="Email" name="email" type="email" value={values.email} onChange={onChange} error={errors.email} autoComplete="off" />
      <div className="field">
        <label htmlFor="password">Password</label>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={onChange}
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            style={{ flex: 1, minWidth: 0 }}
          />
          <button
            type="button"
            className="btn-secondary"
            onClick={handleGeneratePassword}
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}
          >
            <KeyRound size={15} aria-hidden="true" /> Generate Password
          </button>
        </div>
        {errors.password && <span className="field-error" role="alert">{errors.password}</span>}
      </div>
      <SelectField label="Role" name="role" value={values.role} options={assignableRoles(actorRole)} onChange={onChange} />
      <SelectField label="Status" name="status" value={values.status} options={STATUS_OPTIONS} onChange={onChange} />
    </>
  );
}
