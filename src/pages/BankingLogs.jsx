import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import LogsTable from "../components/LogsTable.jsx";
import LogDrawer from "../components/LogDrawer.jsx";
import { Spinner, ErrorPanel } from "../components/FetchState.jsx";
import useApi from "../hooks/useApi.js";
import { fetchBankingLogs } from "../services/api.js";

// One page for both channels: the channel prop picks which API to call.
export default function BankingLogs({ channel }) {
  const { data, loading, error, reload } = useApi(() => fetchBankingLogs(channel), [channel]);
  const [selectedId, setSelectedId] = useState(null);
  if (!data) return loading ? <Spinner /> : <ErrorPanel message={error} onRetry={reload} />;

  return (
    <>
      <PageHeader title={data.title} subtitle="Click a row to see the full details of a log entry." />
      <section className="card">
        <LogsTable logs={data.logs} selectedId={selectedId} onSelect={setSelectedId} />
      </section>
      {selectedId !== null && <LogDrawer key={selectedId} channel={channel} logId={selectedId} onClose={() => setSelectedId(null)} />}
    </>
  );
}
