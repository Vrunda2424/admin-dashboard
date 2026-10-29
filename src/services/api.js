const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// One place for every backend call, so pages stay free of fetch details.
async function post(path, body) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Cannot reach the server. Check that the Flask backend is running.");
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}

export const registerRequest = (username, password) => post("/api/register", { username, password });
export const loginRequest = (username, password) => post("/api/login", { username, password });
