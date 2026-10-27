import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, pageCount, onChange }) {
  return (
    <nav className="pagination" aria-label="Pagination">
      <button type="button" className="btn-secondary" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft size={16} aria-hidden="true" /> Prev
      </button>
      <span className="muted">Page {page} of {pageCount}</span>
      <button type="button" className="btn-secondary" disabled={page >= pageCount} onClick={() => onChange(page + 1)}>
        Next <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  );
}
