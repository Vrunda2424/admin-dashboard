import Logo from "./Logo.jsx";

// Shared split layout for the Login and Register pages.
export default function AuthLayout({ children }) {
  return (
    <main className="login-page">
      <aside className="brand-panel">
        <Logo />
        <div className="brand-copy">
          <h2>Everything your team needs, in one dashboard.</h2>
          <p>Sign in or create an account to continue.</p>
        </div>
      </aside>
      <section className="form-panel">{children}</section>
    </main>
  );
}
