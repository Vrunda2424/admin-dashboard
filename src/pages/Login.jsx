import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import FormField from "../components/FormField.jsx";
import Logo from "../components/Logo.jsx";

const validate = ({ username, password }) => {
  const errors = {};
  if (!username.trim()) errors.username = "Enter your username.";
  else if (username.trim().length < 3) errors.username = "Username must be at least 3 characters.";
  if (!password) errors.password = "Enter your password.";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
  return errors;
};

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  // Logged-in users do not need to see the login page again.
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setLoginError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (login(values.username.trim(), values.password)) {
      navigate("/dashboard", { replace: true });
    } else {
      setLoginError("Incorrect username or password. Check your details and try again.");
    }
  };

  return (
    <main className="login-page">
      <aside className="brand-panel">
        <Logo />
        <div className="brand-copy">
          <h2>Sign in to see your workspace.</h2>
        
        </div>
      </aside>

      <section className="form-panel">
        <form className="login-card" onSubmit={handleSubmit} noValidate>
          <h1>Sign in</h1>
          <p className="muted">Use your admin account to continue.</p>

          {loginError && <div className="alert" role="alert">{loginError}</div>}

          <FormField label="Username" name="username" value={values.username} onChange={handleChange} error={errors.username} autoComplete="username" />
          <FormField label="Password" name="password" type="password" value={values.password} onChange={handleChange} error={errors.password} autoComplete="current-password" />

          <button type="submit" className="btn-primary">Sign in</button>
        </form>
      </section>
    </main>
  );
}