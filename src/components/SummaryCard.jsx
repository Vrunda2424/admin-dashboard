export default function SummaryCard({ label, value, icon: Icon }) {
  return (
    <div className="card">
      <div className="stat-head">
        <p className="stat-label">{label}</p>
        {Icon && <Icon size={18} className="stat-icon" aria-hidden="true" />}
      </div>
      <p className="stat-value">{value}</p>
    </div>
  );
}
