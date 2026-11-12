import { formatDateTime } from "../utils/format.js";

// What a cell shows: a status badge, a formatted date (type "datetime"), or the plain value.
const cell = (column, row) => {
  if (column.key === "status") return <span className={`badge ${row.status.toLowerCase()}`}>{row.status}</span>;
  return column.type === "datetime" ? formatDateTime(row[column.key]) : row[column.key];
};

// Simple table driven by a column list. A column with the key "status" gets an Active/Inactive badge.
export default function DataTable({ columns, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{columns.map((c) => <th key={c.key}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((c) => (
                <td key={c.key}>
                  {cell(c, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
