import { useEffect } from "react";

// Calls onDismiss when the user clicks outside the element or presses Escape.
export default function useDismiss(ref, onDismiss) {
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onDismiss();
    };
    const onKey = (e) => e.key === "Escape" && onDismiss();
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [ref, onDismiss]);
}
