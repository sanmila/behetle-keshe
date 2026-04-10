"use client";

export default function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className="admin-panel admin-page-header">
      <div className="admin-page-copy">
        <p className="admin-kicker">{eyebrow}</p>
        <h1 className="admin-title">{title}</h1>
        <p className="admin-description">{description}</p>
      </div>
      {actions ? <div className="admin-actions">{actions}</div> : null}
    </section>
  );
}
