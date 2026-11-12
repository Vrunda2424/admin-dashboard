import PageHeader from "../components/PageHeader.jsx";
import DataTable from "../components/DataTable.jsx";
import { Spinner, ErrorPanel } from "../components/FetchState.jsx";
import useApi from "../hooks/useApi.js";
import { fetchFaceUsers } from "../services/api.js";

export default function FaceUsers() {
  const { data: d, loading, error, reload } = useApi(fetchFaceUsers, []);
  if (!d) return loading ? <Spinner /> : <ErrorPanel message={error} onRetry={reload} />;

  return (
    <>
      <PageHeader title={d.name} subtitle="Mobile banking customers enrolled for face recognition." />
      <section className="card">
        <DataTable columns={d.columns} rows={d.users} />
      </section>
    </>
  );
}
