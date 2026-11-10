import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import PageHeader from "./PageHeader.jsx";
import { canOpenUam } from "../utils/roles.js";

// Only Super Admin and Admin may open the UAM page, even by typing its address.
export default function RoleRoute({ children }) {
  const { role } = useAuth();
  if (canOpenUam(role)) return children;
  return (
    <>
      <PageHeader title="Access denied" subtitle="You do not have permission to open this page." />
      <section className="card">
        <p className="muted">Ask a Super Admin or Admin if you need access.</p>
        <Link to="/dashboard" className="btn-secondary">Back to Overview</Link>
      </section>
    </>
  );
}
