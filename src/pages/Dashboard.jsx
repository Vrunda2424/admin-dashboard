import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { username } = useAuth();
  return (
    <>
      <Navbar />
      <main className="dashboard">
        <section className="welcome">
          <h1>Welcome, {username}</h1>
          <p className="muted">You are signed in. More dashboard sections will be added here.</p>
        </section>
      </main>
    </>
  );
}
