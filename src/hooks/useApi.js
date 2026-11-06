import { useCallback, useEffect, useState } from "react";
import { useToast } from "../context/ToastContext.jsx";

// Loads data with axios. Shows an error toast on failure. Keeps the old data while a new range loads.
export default function useApi(fetcher, deps = []) {
  const { showToast } = useToast();
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const [attempt, setAttempt] = useState(0);
  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false; // ignore answers that arrive after the page changed
    setState((prev) => ({ ...prev, loading: true, error: "" }));
    fetcher()
      .then((data) => !cancelled && setState({ data, loading: false, error: "" }))
      .catch((err) => {
        if (cancelled) return;
        setState((prev) => ({ ...prev, loading: false, error: err.message }));
        showToast(err.message, "error");
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  return { ...state, reload };
}
