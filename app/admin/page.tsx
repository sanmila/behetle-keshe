"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "./components/AdminShell";
import { ADMIN_STATUS_CONFIG, mapOrderForAdmin, type AdminOrder } from "@/lib/admin-orders";
import { formatPrice } from "@/lib/utils";

const MONTH_NAMES_RU = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

function formatDateRu(date: Date): string {
  return `${date.getDate()} ${MONTH_NAMES_RU[date.getMonth()]} ${date.getFullYear()}`;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    orders: 0,
    pendingOrders: 0,
    revenue7d: 0,
    products: 0,
    customers: 0,
  });
  const [recentOrders, setRecentOrders] = useState<AdminOrder[]>([]);
  const today = new Date();

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((statsData) => {
        setStats({
          orders: statsData.orders || 0,
          pendingOrders: statsData.pendingOrders || 0,
          revenue7d: statsData.revenue7d || 0,
          products: statsData.products || 0,
          customers: statsData.customers || 0,
        });
        setRecentOrders((statsData.recentOrders || []).map(mapOrderForAdmin));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  return (
    <AdminShell>
      {/* Welcome Header */}
      <div>
        <p className="text-sm" style={{ color: "var(--admin-text-muted)" }}>
          {formatDateRu(today)}
        </p>
        <h1 className="mt-1 text-3xl font-medium tracking-[-0.02em]" style={{ color: "var(--admin-text)" }}>
          Добро пожаловать, Дилара
        </h1>
      </div>

      {/* KPI Grid */}
      <section className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <p className="admin-kpi-eyebrow">Новых сегодня</p>
          <p className="admin-kpi-value accent">{loading ? "—" : stats.pendingOrders}</p>
          {stats.pendingOrders > 0 && (
            <span className="admin-kpi-alert">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Требуют обработки
            </span>
          )}
        </div>

        <div className="admin-kpi-card">
          <p className="admin-kpi-eyebrow">Выручка за 7 дней</p>
          <p className="admin-kpi-value">{loading ? "—" : formatPrice(stats.revenue7d)}</p>
        </div>

        <div className="admin-kpi-card">
          <p className="admin-kpi-eyebrow">Товаров в каталоге</p>
          <p className="admin-kpi-value">{loading ? "—" : stats.products}</p>
        </div>

        <div className="admin-kpi-card">
          <p className="admin-kpi-eyebrow">Клиентов</p>
          <p className="admin-kpi-value">{loading ? "—" : stats.customers}</p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="grid gap-5 lg:grid-cols-[1.6fr_0.9fr]">
        {/* Recent Orders Table */}
        <div className="admin-panel overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid var(--admin-border)" }}>
            <div>
              <p className="admin-kicker !mb-2">Свежие заказы</p>
              <h2 className="text-lg font-medium" style={{ color: "var(--admin-text)" }}>Последние 5 заказов</h2>
            </div>
            <Link href="/admin/orders" className="admin-button-ghost">
              Все заказы
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Номер</th>
                  <th>Клиент</th>
                  <th>Сумма</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="cursor-pointer">
                    <td>
                      <p className="font-medium" style={{ color: "var(--admin-accent)" }}>{order.orderNumber}</p>
                      <p className="mt-0.5 text-xs" style={{ color: "var(--admin-text-muted)" }}>{order.email}</p>
                    </td>
                    <td style={{ color: "var(--admin-text)" }}>{order.name}</td>
                    <td className="font-medium" style={{ color: "var(--admin-text)" }}>
                      {formatPrice(order.total)}
                    </td>
                    <td>
                      <span className={`admin-badge ${ADMIN_STATUS_CONFIG[order.status].bg}`}>
                        {ADMIN_STATUS_CONFIG[order.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4" style={{ borderTop: "1px solid var(--admin-border)" }}>
            <Link href="/admin/orders" style={{ fontSize: "13px", color: "var(--admin-accent)", textDecoration: "none" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--admin-accent-hover)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--admin-accent)"}>
              Посмотреть все →
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="grid gap-4">
          {/* Quick Actions */}
          <div className="admin-panel p-5">
            <p className="admin-kicker !mb-4">Быстрые действия</p>
            <div className="admin-quick-actions">
              <Link href="/admin/products/add" className="admin-quick-action">
                <div className="admin-quick-action-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <div>
                  <p className="admin-quick-action-label">Новый товар</p>
                  <p className="admin-quick-action-desc">Добавить в каталог</p>
                </div>
              </Link>

              <Link href="/admin/orders" className="admin-quick-action">
                <div className="admin-quick-action-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div>
                  <p className="admin-quick-action-label">Заказы</p>
                  <p className="admin-quick-action-desc">Все статусы</p>
                </div>
              </Link>

              <Link href="/admin/customers" className="admin-quick-action">
                <div className="admin-quick-action-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="admin-quick-action-label">Клиенты</p>
                  <p className="admin-quick-action-desc">База аккаунтов</p>
                </div>
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="admin-panel p-5">
            <p className="admin-kicker !mb-4">Состояние системы</p>
            <div className="admin-status-stack">
              <div className="admin-status-card">
                <div className="admin-status-copy">
                  <div className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: "var(--admin-success)" }} />
                  <div>
                    <p className="admin-status-title">Панель активна</p>
                    <p className="admin-status-desc">Все системы работают</p>
                  </div>
                </div>
              </div>
              <div className="admin-status-card">
                <div>
                  <p className="admin-status-title">Всего заказов</p>
                  <p className="admin-status-desc">Общее количество заявок в системе</p>
                </div>
                <p className="admin-status-value">{loading ? "—" : stats.orders}</p>
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          {stats.pendingOrders > 0 && (
            <div className="admin-alert-card">
              <div className="admin-alert-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div className="admin-alert-text">
                <p className="admin-alert-title">{stats.pendingOrders} новых заказов</p>
                <p className="admin-alert-desc">Требуют обработки</p>
              </div>
              <Link href="/admin/orders" className="admin-button-secondary !h-10 !text-xs">
                Открыть
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Operations */}
      <section className="admin-panel p-5">
        <p className="admin-kicker !mb-4">Быстрые операции</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products/add" className="admin-button-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Добавить товар
          </Link>
          <Link href="/admin/orders" className="admin-button-secondary">
            Все заказы
          </Link>
          <Link href="/" target="_blank" rel="noopener noreferrer" className="admin-button-secondary">
            На сайт
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>
        </div>
      </section>
    </AdminShell>
  );
}
