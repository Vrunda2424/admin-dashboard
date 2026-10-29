const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// One place for every backend call, so pages stay free of fetch details.
async function request(path, body) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: body ? "POST" : "GET",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach the server. Check that the Flask backend is running.");
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}

export const registerRequest = (username, password) => request("/api/register", { username, password });
export const loginRequest = (username, password) => request("/api/login", { username, password });
export const fetchUsers = () => request("/api/users");
