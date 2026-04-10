"use client";

import { useEffect, useMemo, useState } from "react";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminShell from "../components/AdminShell";

interface Customer {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  _count: { orders: number };
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/customers")
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        setCustomers(data.customers || []);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const summary = useMemo(() => {
    const admins = customers.filter((c) => c.isAdmin).length;
    const withOrders = customers.filter((c) => c._count.orders > 0).length;
    return { admins, withOrders };
  }, [customers]);

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="Клиенты"
        title="База аккаунтов"
        description="Просматривайте аудиторию магазина, быстро оценивайте активность и выделяйте служебные аккаунты отдельно от обычных покупателей."
        actions={
          <div className="admin-summary-grid">
            <div className="admin-summary-card">
              <p className="admin-summary-label">Администраторы</p>
              <p className="admin-summary-value">{summary.admins}</p>
            </div>
            <div className="admin-summary-card">
              <p className="admin-summary-label">С заказами</p>
              <p className="admin-summary-value">{summary.withOrders}</p>
            </div>
          </div>
        }
      />

      <section className="admin-panel p-5">
        {loading ? (
          <div className="grid gap-3">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="h-18 rounded-[20px]" style={{ border: "1px solid var(--admin-border)", backgroundColor: "var(--admin-surface-alt)" }} />
            ))}
          </div>
        ) : customers.length === 0 ? (
          <div className="admin-empty">
            <p className="text-lg" style={{ color: "var(--admin-text)" }}>Клиентов пока нет</p>
            <p className="mt-2 text-sm" style={{ color: "var(--admin-text-muted)" }}>После регистрации пользователей здесь появится живая клиентская база.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Профиль</th>
                  <th>Email</th>
                  <th>Регистрация</th>
                  <th>Заказов</th>
                  <th>Тип</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div>
                        <p className="font-medium" style={{ color: "var(--admin-text)" }}>{customer.name}</p>
                        <p className="mt-1 text-xs" style={{ color: "var(--admin-text-muted)" }}>ID: {customer.id.slice(-8)}</p>
                      </div>
                    </td>
                    <td style={{ color: "var(--admin-text-muted)" }}>{customer.email}</td>
                    <td style={{ color: "var(--admin-text-muted)" }}>
                      {new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(customer.createdAt))}
                    </td>
                    <td className="font-medium" style={{ color: "var(--admin-text)" }}>{customer._count.orders}</td>
                    <td>
                      <span className={`admin-badge ${customer.isAdmin ? "badge-admin" : "badge-customer"}`}>
                        {customer.isAdmin ? "Администратор" : "Клиент"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminShell>
  );
}
