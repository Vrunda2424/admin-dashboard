export function Spinner() {
  return (
    <div className="page-loader" role="status" aria-label="Loading">
      <div className="spinner" />
    </div>
  );
}

export function ErrorPanel({ message, onRetry }) {
  return (
    <section className="card">
      <div className="alert" role="alert">{message || "Could not load the data."}</div>
      <p><button type="button" className="btn-secondary" onClick={onRetry}>Retry</button></p>
    </section>
  );
}
