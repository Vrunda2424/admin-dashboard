// One set of rules, used by the Registration page and the Add User form.
export function validatePassword(password) {
  const missing = [];
  if (password.length < 6) missing.push("at least 6 characters");
  if (!/[A-Z]/.test(password)) missing.push("an uppercase letter (A-Z)");
  if (!/[a-z]/.test(password)) missing.push("a lowercase letter (a-z)");
  if (!/[^A-Za-z0-9\s]/.test(password)) missing.push("a special character (!@#$%^&* etc.)");
  if (missing.length === 0) return "";
  const list = missing.length > 1 ? `${missing.slice(0, -1).join(", ")} and ${missing[missing.length - 1]}` : missing[0];
  return `Password needs ${list}.`;
}

export function validateCredentials({ username, password }) {
  const errors = {};
  if (!username.trim()) errors.username = "Choose a username.";
  else if (username.trim().length < 3) errors.username = "Username must be at least 3 characters.";
  if (!password) errors.password = "Choose a password.";
  else {
    const problem = validatePassword(password);
    if (problem) errors.password = problem;
  }
  return errors;
}
