import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import FormField from "../components/FormField.jsx";
import { registerRequest } from "../services/api.js";

const validate = ({ username, password }) => {
  const errors = {};
  if (!username.trim()) errors.username = "Choose a username.";
  else if (username.trim().length < 3) errors.username = "Username must be at least 3 characters.";
  if (!password) errors.password = "Choose a password.";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
  return errors;
};

export default function Register() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

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

    setLoading(true);
    try {
      await registerRequest(values.username.trim(), values.password);
      navigate("/login", { replace: true, state: { registered: true } });
    } catch (err) {
      setServerError(err.message);
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h1>Create account</h1>
        <p className="muted">Choose a username and password.</p>

        {serverError && <div className="alert" role="alert">{serverError}</div>}

        <FormField label="Username" name="username" value={values.username} onChange={handleChange} error={errors.username} autoComplete="username" />
        <FormField label="Password" name="password" type="password" value={values.password} onChange={handleChange} error={errors.password} autoComplete="new-password" />

        <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Creating..." : "Register"}</button>
        <p className="muted">Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </AuthLayout>
  );
}
