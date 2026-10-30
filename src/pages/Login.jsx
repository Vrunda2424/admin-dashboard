import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import FormField from "../components/FormField.jsx";

const validate = ({ username, password }) => {
  const errors = {};
  if (!username.trim()) errors.username = "Enter your username.";
  else if (username.trim().length < 3) errors.username = "Username must be at least 3 characters.";
  if (!password) errors.password = "Enter your password.";
  return errors;
};

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const registered = useLocation().state?.registered;
  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // Logged-in users do not need to see the login page again.
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    const result = await login(values.username.trim(), values.password);
    setLoading(false);
    if (result.ok) {
      showToast("Login successful", "success");
      navigate("/dashboard", { replace: true });
    } else {
      // 401 means wrong credentials. Other errors (server off, inactive) show their own text.
      showToast(result.status === 401 ? "Invalid credentials" : result.message, "error");
      setLoginError(result.message);
    }
  };

  return (
    <AuthLayout>
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h1>Sign in</h1>
        <p className="muted">Use your account to continue.</p>

        {registered && !loginError && <div className="success" role="status">Account created. Please sign in.</div>}
        {loginError && <div className="alert" role="alert">{loginError}</div>}

        <FormField label="Username" name="username" value={values.username} onChange={handleChange} error={errors.username} autoComplete="username" />
        <FormField label="Password" name="password" type="password" value={values.password} onChange={handleChange} error={errors.password} autoComplete="current-password" />

        <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        <button type="button" className="btn-secondary btn-block" onClick={() => navigate("/register")}>Register</button>
      </form>
    </AuthLayout>
  );
}
