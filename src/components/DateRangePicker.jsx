import { RANGE_OPTIONS } from "../data/dashboardData.js";

export default function DateRangePicker({ value, onChange, label }) {
  return (
    <div className="range-picker">
      <div className="range-buttons" role="group" aria-label="Date range">
        {RANGE_OPTIONS.map((o) => (
          <button key={o.key} type="button" className={`range-btn${value === o.key ? " active" : ""}`} aria-pressed={value === o.key} onClick={() => onChange(o.key)}>
            {o.label}
          </button>
        ))}
      </div>
      <p className="muted range-label">{label}</p>
    </div>
  );
}
