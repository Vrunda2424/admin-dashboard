export default function ChartCard({ title, wide = false, children }) {
  return (
    <section className={`card${wide ? " wide" : ""}`}>
      <h3>{title}</h3>
      <div className="chart-box">{children}</div>
    </section>
  );
}
