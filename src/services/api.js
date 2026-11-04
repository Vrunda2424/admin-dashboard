const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// One place for every backend call, so pages stay free of fetch details.
async function request(path, { method = "GET", body } = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach the server. Check that the Flask backend is running.");
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong. Please try again.");
    error.status = response.status;
    throw error;
  }
  return data;
}

export const registerRequest = (user) => request("/api/register", { method: "POST", body: user });
export const loginRequest = (username, password) => request("/api/login", { method: "POST", body: { username, password } });
export const changePasswordRequest = (username, currentPassword, newPassword) =>
  request("/api/change-password", { method: "POST", body: { username, current_password: currentPassword, new_password: newPassword } });
export const fetchUsers = () => request("/api/users");
export const updateUserRequest = (id, { role, status }) => request(`/api/users/${id}`, { method: "PUT", body: { role, status } });
export const deleteUserRequest = (id) => request(`/api/users/${id}`, { method: "DELETE" });
