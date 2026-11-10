import FormField from "./FormField.jsx";
import { assignableRoles } from "../utils/roles.js";

export const EMPTY_USER = { username: "", email: "", password: "", role: "support_staff", status: "Active" };

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

// The role list depends on who is signed in: Super Admin sees all five roles, Admin sees three.
export default function UserFormFields({ values, errors, onChange, actorRole }) {
  return (
    <>
      <FormField label="Username" name="username" value={values.username} onChange={onChange} error={errors.username} autoComplete="off" />
      <FormField label="Email" name="email" type="email" value={values.email} onChange={onChange} error={errors.email} autoComplete="off" />
      <FormField label="Password" name="password" type="password" value={values.password} onChange={onChange} error={errors.password} autoComplete="new-password" />
      <SelectField label="Role" name="role" value={values.role} options={assignableRoles(actorRole)} onChange={onChange} />
      <SelectField label="Status" name="status" value={values.status} options={STATUS_OPTIONS} onChange={onChange} />
    </>
  );
}
