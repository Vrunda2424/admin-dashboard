import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import UsersTable from "../components/UsersTable.jsx";
import Pagination from "../components/Pagination.jsx";
import { users } from "../data/dashboardData.js";

const newestFirst = [...users].sort((a, b) => b.registeredAt - a.registeredAt);

export default function Users() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return newestFirst.filter(
      (u) =>
        (status === "All" || u.status === status) &&
        (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    );
  }, [query, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  // Any change to the search, filter, or page size starts again from page 1.
  const update = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  return (
    <>
      <PageHeader title="Users" subtitle="Search, filter, and browse all registered users." />
      <section className="card">
        <div className="toolbar">
          <div className="search">
            <Search size={16} aria-hidden="true" />
            <input type="search" placeholder="Search by name or email" aria-label="Search users" value={query} onChange={update(setQuery)} />
          </div>
          <select aria-label="Filter by status" value={status} onChange={update(setStatus)}>
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select aria-label="Users per page" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>{n} per page</option>
            ))}
          </select>
        </div>
        <UsersTable users={rows} />
        <div className="table-footer">
          <p className="muted">
            {filtered.length === 0 ? "0 users" : `Showing ${start + 1}-${start + rows.length} of ${filtered.length} users`}
          </p>
          <Pagination page={current} pageCount={pageCount} onChange={setPage} />
        </div>
      </section>
    </>
  );
}
