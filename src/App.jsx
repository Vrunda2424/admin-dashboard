import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Overview from "./pages/Overview.jsx";
import Users from "./pages/Users.jsx";
import Analytics from "./pages/Analytics.jsx";
import Settings from "./pages/Settings.jsx";
import UserAccess from "./pages/UserAccess.jsx";
import BankingDashboard from "./pages/BankingDashboard.jsx";
import BankingUsers from "./pages/BankingUsers.jsx";
import BankingLogs from "./pages/BankingLogs.jsx";
import FaceUsers from "./pages/FaceUsers.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Every page inside this route needs a login and shares the same layout. All roles see every tab. */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Overview />} />
        <Route path="/users" element={<Users />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/uam" element={<RoleRoute><UserAccess /></RoleRoute>} />
        <Route path="/internet-banking/dashboard" element={<BankingDashboard channel="internet" />} />
        <Route path="/internet-banking/users" element={<BankingUsers channel="internet" />} />
        <Route path="/internet-banking/user-logs" element={<BankingLogs key="internet" channel="internet" />} />
        <Route path="/mobile-banking/dashboard" element={<BankingDashboard channel="mobile" />} />
        <Route path="/mobile-banking/users" element={<BankingUsers channel="mobile" />} />
        <Route path="/mobile-banking/user-logs" element={<BankingLogs key="mobile" channel="mobile" />} />
        <Route path="/mobile-banking/face" element={<FaceUsers />} />
        <Route path="/mobile-banking/face-logs" element={<BankingLogs key="face" channel="face" />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
