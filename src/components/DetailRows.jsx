// Read-only label and value pairs. rows: [[label, value], ...]
export default function DetailRows({ rows }) {
  return (
    <dl className="details">
      {rows.map(([label, value]) => (
        <div key={label} className="details-row">
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
