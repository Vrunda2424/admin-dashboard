import { useState } from "react";
import { CalendarDays, Trophy, TrendingUp, Percent } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import SummaryCard from "../components/SummaryCard.jsx";
import ChartCard from "../components/ChartCard.jsx";
import DateRangePicker from "../components/DateRangePicker.jsx";
import RegistrationTrendChart from "../components/charts/RegistrationTrendChart.jsx";
import RoleDistributionChart from "../components/charts/RoleDistributionChart.jsx";
import { Spinner, ErrorPanel } from "../components/FetchState.jsx";
import useApi from "../hooks/useApi.js";
import { fetchAnalytics } from "../services/api.js";

function AnalyticsContent({ stats, updating }) {
  const { averagePerMonth, peak, growthRate, activeRate } = stats.analytics;
  const cards = [
    { label: "Average signups per month", value: averagePerMonth, icon: CalendarDays },
    { label: "Busiest period", value: peak.registrations > 0 ? `${peak.month} (${peak.registrations})` : "None", icon: Trophy },
    { label: "Growth vs previous period", value: growthRate === null ? "n/a" : `${growthRate > 0 ? "+" : ""}${growthRate}%`, icon: TrendingUp },
    { label: "Active user rate", value: `${activeRate}%`, icon: Percent },
  ];
  return (
    <div className={updating ? "dim" : undefined}>
      <div className="cards-grid">
        {cards.map((c) => (
          <SummaryCard key={c.label} {...c} />
        ))}
      </div>
      <div className="charts-grid">
        <ChartCard title="Registration trend by status"><RegistrationTrendChart data={stats.registrationsByStatus} /></ChartCard>
        <ChartCard title="Users by role"><RoleDistributionChart data={stats.roleDistribution} /></ChartCard>
      </div>
    </div>
  );
}

export default function Analytics() {
  const [range, setRange] = useState("year");
  const { data: stats, loading, error, reload } = useApi(() => fetchAnalytics(range), [range]);

  return (
    <>
      <div className="page-top">
        <PageHeader title="Analytics" subtitle="Registration trends and user distribution." />
        <DateRangePicker value={range} onChange={setRange} label={stats?.label ?? ""} />
      </div>
      {!stats ? (loading ? <Spinner /> : <ErrorPanel message={error} onRetry={reload} />) : <AnalyticsContent stats={stats} updating={loading} />}
    </>
  );
}
