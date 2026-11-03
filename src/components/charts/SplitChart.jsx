import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const PALETTE = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

// Doughnut when donut is true, full pie otherwise. Data: [{ name, value }].
export default function SplitChart({ data, donut = true }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={donut ? "58%" : 0} outerRadius="82%" paddingAngle={2} label={!donut}>
          {data.map((d, i) => (
            <Cell key={d.name} fill={PALETTE[i % PALETTE.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
