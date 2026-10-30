import { useCallback, useRef, useState } from "react";
import { Bell } from "lucide-react";
import useDismiss from "../hooks/useDismiss.js";
import { initialNotifications } from "../data/notifications.js";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initialNotifications);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, close);

  const unread = items.filter((n) => !n.read).length;
  const markRead = (id) => setItems((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllRead = () => setItems((list) => list.map((n) => ({ ...n, read: true })));

  return (
    <div className="bell" ref={ref}>
      <button
        type="button"
        className="profile-btn"
        aria-label={`Notifications, ${unread} unread`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Bell size={20} aria-hidden="true" />
        {unread > 0 && <span className="badge-count">{unread}</span>}
      </button>
      {open && (
        <div className="dropdown notif-panel">
          <div className="notif-head">
            <strong>Notifications</strong>
            <button type="button" className="link-btn" onClick={markAllRead} disabled={unread === 0}>Mark all as read</button>
          </div>
          {items.map((n) => (
            <button key={n.id} type="button" className={`notif-item${n.read ? "" : " unread"}`} onClick={() => markRead(n.id)}>
              <span className={`dot${n.read ? " read" : ""}`} aria-hidden="true" />
              <span>
                <span className="notif-text">{n.text}</span>
                <span className="notif-time">{n.time}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
