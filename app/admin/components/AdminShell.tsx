"use client";

import AdminSidebar from "./AdminSidebar";

export default function AdminShell({
  children,
  contentClassName = "",
}: {
  children: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-main">
        <div className={`admin-content ${contentClassName}`.trim()}>{children}</div>
      </main>
    </div>
  );
}
