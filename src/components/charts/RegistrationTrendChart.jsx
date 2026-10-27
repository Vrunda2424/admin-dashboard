import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { COLORS } from "./chartTheme.js";

export default function RegistrationTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid stroke={COLORS.grid} vertical={false} />
        <XAxis dataKey="month" tickLine={false} fontSize={12} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Active" stroke={COLORS.primary} strokeWidth={2.5} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="Inactive" stroke={COLORS.inactive} strokeWidth={2.5} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
