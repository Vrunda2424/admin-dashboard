import axios from "axios";
import once from "../utils/once.js";
import { roleLabel } from "../utils/roles.js";

const http = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001" });

// Sends the saved token with every request.
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// AuthContext registers what should happen when the server says the token is no longer valid.
let onUnauthorized = null;
export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};
const PUBLIC_PATHS = ["/api/login", "/api/change-password"]; // a 401 here just means wrong details

// Every failure becomes a plain Error with a readable message and the HTTP status.
http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401 && !PUBLIC_PATHS.includes(error.config?.url) && localStorage.getItem("token")) {
      onUnauthorized?.();
    }
    const message = error.response
      ? error.response.data?.message || "Something went wrong. Please try again."
      : "Cannot reach the server. Check that the Flask backend is running.";
    const err = new Error(message);
    err.status = error.response?.status;
    return Promise.reject(err);
  }
);

// "2026-10-25" becomes a local Date, so it never shifts to the previous day.
const toDate = (iso) => {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day);
};
const withDates = (users) => users.map((u) => ({ ...u, registeredAt: toDate(u.registeredAt) }));

// ---- accounts ----
// Only a signed-in Super Admin or Admin can create users. There is no public registration.
export const createUserRequest = (user) => http.post("/api/users", user);
export const loginRequest = (username, password) => http.post("/api/login", { username, password });
export const changePasswordRequest = (username, currentPassword, newPassword) =>
  http.post("/api/change-password", { username, current_password: currentPassword, new_password: newPassword });
export const updateUserRequest = (id, { role, status }) => http.put(`/api/users/${id}`, { role, status });
export const deleteUserRequest = (id) => http.delete(`/api/users/${id}`);

// ---- reading data: each call is wrapped in once(), so the same request is never sent twice at the same time ----
export const fetchUsers = () => once("users", () => http.get("/api/users"));

export const fetchOverview = (range) =>
  once(`overview:${range}`, async () => {
    const data = await http.get("/api/overview", { params: { range } });
    return { ...data, recentUsers: withDates(data.recentUsers) };
  });
export const fetchAnalytics = (range) =>
  once(`analytics:${range}`, async () => {
    const data = await http.get("/api/analytics", { params: { range } });
    return { ...data, roleDistribution: data.roleDistribution.map((r) => ({ ...r, name: roleLabel(r.name) })) };
  });
export const fetchUsersPage = () => once("users-page", async () => withDates((await http.get("/api/users-page")).users));

const slugs = { internet: "internet-banking", mobile: "mobile-banking" };
export const fetchBankingDashboard = (channel) => once(`dashboard:${channel}`, () => http.get(`/api/${slugs[channel]}/dashboard`));
export const fetchBankingUsers = (channel) => once(`banking-users:${channel}`, () => http.get(`/api/${slugs[channel]}/users`));
// The three log pages share one list page and one drawer. Only the address differs.
const logPaths = { internet: "/api/internet-banking/user-logs", mobile: "/api/mobile-banking/user-logs", face: "/api/mobile-banking/face-logs" };
export const fetchBankingLogs = (channel) => once(`logs:${channel}`, () => http.get(logPaths[channel]));
export const fetchFaceUsers = () => once("face-users", () => http.get("/api/mobile-banking/face-users"));
export const fetchBankingLog = (channel, id) => once(`log:${channel}:${id}`, () => http.get(`${logPaths[channel]}/${id}`));

export const fetchSettings = (username) => once(`settings:${username}`, () => http.get("/api/settings", { params: { username } }));
export const saveSettings = (profile) => http.put("/api/settings", profile);
