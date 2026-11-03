import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Overview from "./pages/Overview.jsx";
import Users from "./pages/Users.jsx";
import Analytics from "./pages/Analytics.jsx";
import Settings from "./pages/Settings.jsx";
import UserAccess from "./pages/UserAccess.jsx";
import BankingDashboard from "./pages/BankingDashboard.jsx";
import BankingUsers from "./pages/BankingUsers.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Every page inside this route needs a login and shares the same layout. */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Overview />} />
        <Route path="/users" element={<Users />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/uam" element={<UserAccess />} />
        <Route path="/internet-banking/dashboard" element={<BankingDashboard channel="internet" />} />
        <Route path="/internet-banking/users" element={<BankingUsers channel="internet" />} />
        <Route path="/mobile-banking/dashboard" element={<BankingDashboard channel="mobile" />} />
        <Route path="/mobile-banking/users" element={<BankingUsers channel="mobile" />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
