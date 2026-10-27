import { Users, UserCheck, UserX, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SummaryCard from "../components/SummaryCard.jsx";
import ChartCard from "../components/ChartCard.jsx";
import RecentRegistrationsTable from "../components/RecentRegistrationsTable.jsx";
import RegistrationsLineChart from "../components/charts/RegistrationsLineChart.jsx";
import UserGrowthBarChart from "../components/charts/UserGrowthBarChart.jsx";
import StatusDoughnutChart from "../components/charts/StatusDoughnutChart.jsx";
import { summary, monthlyRegistrations, userGrowth, statusBreakdown, recentUsers } from "../data/dashboardData.js";

export default function Overview() {
  const { username } = useAuth();
  const cards = [
    { label: "Total registered users", value: summary.total, icon: Users },
    { label: "Active users", value: summary.active, icon: UserCheck },
    { label: "Inactive users", value: summary.inactive, icon: UserX },
    { label: "New registrations this month", value: summary.newThisMonth, icon: UserPlus },
  ];

  return (
    <>
      <PageHeader title={`Welcome back, ${username}`} subtitle="Here is an overview of your users." />
      <div className="cards-grid">
        {cards.map((c) => (
          <SummaryCard key={c.label} {...c} />
        ))}
      </div>
      <div className="charts-grid">
        <ChartCard title="Monthly registrations"><RegistrationsLineChart data={monthlyRegistrations} /></ChartCard>
        <ChartCard title="Active vs inactive users"><StatusDoughnutChart data={statusBreakdown} /></ChartCard>
        <ChartCard title="User growth" wide><UserGrowthBarChart data={userGrowth} /></ChartCard>
      </div>
      <RecentRegistrationsTable users={recentUsers} />
    </>
  );
}
