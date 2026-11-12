import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import DetailRows from "./DetailRows.jsx";
import { Spinner, ErrorPanel } from "./FetchState.jsx";
import useApi from "../hooks/useApi.js";
import { fetchBankingLog } from "../services/api.js";
import { formatDateTime } from "../utils/format.js";

const SLIDE_MS = 250;

// Side drawer that loads one log entry from the detail API.
export default function LogDrawer({ channel, logId, onClose }) {
  const [open, setOpen] = useState(false); // drives the slide-in and slide-out
  const closeButton = useRef(null);
  const { data, loading, error, reload } = useApi(() => fetchBankingLog(channel, logId), [channel, logId]);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(onClose, SLIDE_MS); // wait for the slide-out before removing it
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
      closeButton.current?.focus();
    }, 10);
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [close]);

  const log = data?.log;
  const rows = log && [
    ["Username", log.username],
    ["Action", log.action],
    ["Status", <span key="s" className={`badge ${log.status.toLowerCase()}`}>{log.status}</span>],
    ["Timestamp", formatDateTime(log.timestamp)],
    ["IP address", log.ip_address],
    ["Location", log.location],
    ["Device", log.device],
    ["Operating system", log.os],
    ["Browser", log.browser],
    ["Session ID", log.session_id],
    ["Details", log.details],
    // Face logs also carry a match score and a liveness result.
    ...(log.match_score === undefined ? [] : [["Face match score", log.match_score], ["Liveness check", log.liveness]]),
  ];

  return createPortal(
    <div className={`drawer-backdrop${open ? " open" : ""}`} onClick={close}>
      <aside className={`drawer${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Log details" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h3>Log entry #{logId}</h3>
          <button type="button" ref={closeButton} className="icon-btn" aria-label="Close details" onClick={close}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        {!log ? (loading ? <Spinner /> : <ErrorPanel message={error} onRetry={reload} />) : <DetailRows rows={rows} />}
      </aside>
    </div>,
    document.body
  );
}
