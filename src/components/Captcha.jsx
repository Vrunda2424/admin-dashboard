import { RefreshCw } from "lucide-react";

export default function Captcha({ chars, onRefresh }) {
  return (
    <div className="captcha-row">
      <div className="captcha-box" role="img" aria-label="CAPTCHA with distorted text">
        {chars.map((c, i) => (
          <span
            key={i}
            className="captcha-char"
            style={{ fontSize: c.size, color: c.color, transform: `translateY(${c.y}px) rotate(${c.rotate}deg) skewX(${c.skew}deg)` }}
          >
            {c.ch}
          </span>
        ))}
      </div>
      <button type="button" className="btn-secondary" onClick={onRefresh} aria-label="Refresh CAPTCHA">
        <RefreshCw size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
