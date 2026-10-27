import { CalendarDays, Trophy, TrendingUp, Percent } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import SummaryCard from "../components/SummaryCard.jsx";
import ChartCard from "../components/ChartCard.jsx";
import RegistrationTrendChart from "../components/charts/RegistrationTrendChart.jsx";
import RoleDistributionChart from "../components/charts/RoleDistributionChart.jsx";
import { analyticsStats as s, registrationsByStatus, roleDistribution } from "../data/dashboardData.js";

export default function Analytics() {
  const cards = [
    { label: "Average signups per month", value: s.averagePerMonth, icon: CalendarDays },
    { label: "Best month", value: `${s.bestMonth.month} (${s.bestMonth.registrations})`, icon: Trophy },
    { label: "Growth vs last month", value: `${s.growthRate > 0 ? "+" : ""}${s.growthRate}%`, icon: TrendingUp },
    { label: "Active user rate", value: `${s.activeRate}%`, icon: Percent },
  ];

  return (
    <>
      <PageHeader title="Analytics" subtitle="Registration trends and user distribution." />
      <div className="cards-grid">
        {cards.map((c) => (
          <SummaryCard key={c.label} {...c} />
        ))}
      </div>
      <div className="charts-grid">
        <ChartCard title="Registration trend by status"><RegistrationTrendChart data={registrationsByStatus} /></ChartCard>
        <ChartCard title="Users by role"><RoleDistributionChart data={roleDistribution} /></ChartCard>
      </div>
    </>
  );
}
