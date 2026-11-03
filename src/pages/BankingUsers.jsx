import PageHeader from "../components/PageHeader.jsx";
import DataTable from "../components/DataTable.jsx";
import { banking } from "../data/bankingData.js";

export default function BankingUsers({ channel }) {
  const d = banking[channel];
  return (
    <>
      <PageHeader title={`${d.name} User Details`} subtitle={`Customers using ${d.name.toLowerCase()}.`} />
      <section className="card">
        <DataTable columns={d.columns} rows={d.users} />
      </section>
    </>
  );
}
