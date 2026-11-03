import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import UserFormFields, { EMPTY_USER } from "../components/UserFormFields.jsx";
import { registerRequest } from "../services/api.js";
import { validateUser } from "../utils/validators.js";

export default function Register() {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY_USER);
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
    const found = validateUser(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return; // blocked until every rule passes

    setLoading(true);
    try {
      await registerRequest({ ...values, username: values.username.trim(), email: values.email.trim() });
      showToast("Registration successful", "success");
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
        <p className="muted">Fill in your details to register.</p>

        {serverError && <div className="alert" role="alert">{serverError}</div>}

        <UserFormFields values={values} errors={errors} onChange={handleChange} />

        <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Creating..." : "Register"}</button>
        <p className="muted">Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </AuthLayout>
  );
}
