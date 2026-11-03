import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { COLORS } from "./chartTheme.js";

// Draws a line or an area chart from [{ label, value }].
export default function TrendChart({ data, type = "line", seriesName = "Value" }) {
  const Chart = type === "area" ? AreaChart : LineChart;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
        <CartesianGrid stroke={COLORS.grid} vertical={false} />
        <XAxis dataKey="label" tickLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} />
        <Tooltip />
        {type === "area" ? (
          <Area type="monotone" dataKey="value" name={seriesName} stroke={COLORS.secondary} fill={COLORS.secondary} fillOpacity={0.25} strokeWidth={2.5} />
        ) : (
          <Line type="monotone" dataKey="value" name={seriesName} stroke={COLORS.primary} strokeWidth={2.5} dot={{ r: 3 }} />
        )}
      </Chart>
    </ResponsiveContainer>
  );
}
