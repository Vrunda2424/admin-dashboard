import { useState } from "react";
import { Users, UserCheck, UserX, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SummaryCard from "../components/SummaryCard.jsx";
import ChartCard from "../components/ChartCard.jsx";
import DateRangePicker from "../components/DateRangePicker.jsx";
import RecentRegistrationsTable from "../components/RecentRegistrationsTable.jsx";
import RegistrationsLineChart from "../components/charts/RegistrationsLineChart.jsx";
import UserGrowthBarChart from "../components/charts/UserGrowthBarChart.jsx";
import StatusDoughnutChart from "../components/charts/StatusDoughnutChart.jsx";
import { Spinner, ErrorPanel } from "../components/FetchState.jsx";
import useApi from "../hooks/useApi.js";
import { fetchOverview } from "../services/api.js";

function OverviewContent({ stats, updating }) {
  const { summary } = stats;
  const cards = [
    { label: "Total registered users", value: summary.total, icon: Users },
    { label: "Active users", value: summary.active, icon: UserCheck },
    { label: "Inactive users", value: summary.inactive, icon: UserX },
    { label: "New registrations this month", value: summary.newThisMonth, icon: UserPlus },
  ];
  return (
    <div className={updating ? "dim" : undefined}>
      <div className="cards-grid">
        {cards.map((c) => (
          <SummaryCard key={c.label} {...c} />
        ))}
      </div>
      <div className="charts-grid">
        <ChartCard title="Registrations"><RegistrationsLineChart data={stats.monthlyRegistrations} /></ChartCard>
        <ChartCard title="Active vs inactive users"><StatusDoughnutChart data={stats.statusBreakdown} /></ChartCard>
        <ChartCard title="User growth" wide><UserGrowthBarChart data={stats.userGrowth} /></ChartCard>
      </div>
      <RecentRegistrationsTable users={stats.recentUsers} />
    </div>
  );
}

export default function Overview() {
  const { username } = useAuth();
  const [range, setRange] = useState("year");
  const { data: stats, loading, error, reload } = useApi(() => fetchOverview(range), [range]);

  return (
    <>
      <div className="page-top">
        <PageHeader title={`Welcome back, ${username}`} subtitle="Here is an overview of your users." />
        <DateRangePicker value={range} onChange={setRange} label={stats?.label ?? ""} />
      </div>
      {!stats ? (loading ? <Spinner /> : <ErrorPanel message={error} onRetry={reload} />) : <OverviewContent stats={stats} updating={loading} />}
    </>
  );
}
