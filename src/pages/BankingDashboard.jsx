import PageHeader from "../components/PageHeader.jsx";
import SummaryCard from "../components/SummaryCard.jsx";
import ChartCard from "../components/ChartCard.jsx";
import TrendChart from "../components/charts/TrendChart.jsx";
import CategoryBarChart from "../components/charts/CategoryBarChart.jsx";
import SplitChart from "../components/charts/SplitChart.jsx";
import { Spinner, ErrorPanel } from "../components/FetchState.jsx";
import useApi from "../hooks/useApi.js";
import { fetchBankingDashboard } from "../services/api.js";

// One page for both channels: the channel prop picks which API to call.
export default function BankingDashboard({ channel }) {
  const { data: d, loading, error, reload } = useApi(() => fetchBankingDashboard(channel), [channel]);
  if (!d) return loading ? <Spinner /> : <ErrorPanel message={error} onRetry={reload} />;

  return (
    <>
      <PageHeader title={`${d.name} Dashboard`} subtitle={d.subtitle} />
      <div className="cards-grid">
        {d.cards.map((c) => (
          <SummaryCard key={c.label} {...c} />
        ))}
      </div>
      <div className="charts-grid">
        <ChartCard title={d.trend.title}><TrendChart data={d.trend.data} type={d.trend.type} seriesName={d.trend.seriesName} /></ChartCard>
        <ChartCard title={d.split.title}><SplitChart data={d.split.data} donut={d.split.donut} /></ChartCard>
        <ChartCard title={d.bar.title} wide><CategoryBarChart data={d.bar.data} seriesName={d.bar.seriesName} /></ChartCard>
      </div>
    </>
  );
}
