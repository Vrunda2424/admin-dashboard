import FormField from "./FormField.jsx";

export const EMPTY_USER = { username: "", email: "", password: "", role: "Viewer", status: "Active" };

function SelectField({ label, name, value, options, onChange }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

// The five user fields, shared by the Registration page and the Add User form.
export default function UserFormFields({ values, errors, onChange }) {
  return (
    <>
      <FormField label="Username" name="username" value={values.username} onChange={onChange} error={errors.username} autoComplete="off" />
      <FormField label="Email" name="email" type="email" value={values.email} onChange={onChange} error={errors.email} autoComplete="off" />
      <FormField label="Password" name="password" type="password" value={values.password} onChange={onChange} error={errors.password} autoComplete="new-password" />
      <SelectField label="Role" name="role" value={values.role} options={["Admin", "Editor", "Viewer"]} onChange={onChange} />
      <SelectField label="Status" name="status" value={values.status} options={["Active", "Inactive"]} onChange={onChange} />
    </>
  );
}
