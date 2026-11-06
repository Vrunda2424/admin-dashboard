import PageHeader from "../components/PageHeader.jsx";
import DataTable from "../components/DataTable.jsx";
import { Spinner, ErrorPanel } from "../components/FetchState.jsx";
import useApi from "../hooks/useApi.js";
import { fetchBankingUsers } from "../services/api.js";

export default function BankingUsers({ channel }) {
  const { data: d, loading, error, reload } = useApi(() => fetchBankingUsers(channel), [channel]);
  if (!d) return loading ? <Spinner /> : <ErrorPanel message={error} onRetry={reload} />;

  return (
    <>
      <PageHeader title={`${d.name} User Details`} subtitle={`Customers using ${d.name.toLowerCase()}.`} />
      <section className="card">
        <DataTable columns={d.columns} rows={d.users} />
      </section>
    </>
  );
}
