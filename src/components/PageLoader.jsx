import { useEffect, useState } from "react";

// Shows a centered spinner briefly, then the page content.
export default function PageLoader({ children, delay = 1200 }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!ready) {
    return (
      <div className="page-loader" role="status" aria-label="Loading">
        <div className="spinner" />
      </div>
    );
  }
  return children;
}
