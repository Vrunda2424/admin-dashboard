import PageHeader from "./PageHeader.jsx";

export default function PagePlaceholder({ title }) {
  return (
    <>
      <PageHeader title={title} />
      <section className="card placeholder">
        <p className="muted">The {title} page content will be added in the next task.</p>
      </section>
    </>
  );
}
