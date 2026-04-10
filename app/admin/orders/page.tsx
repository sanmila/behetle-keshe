"use client";

import { useEffect, useMemo, useState } from "react";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminShell from "../components/AdminShell";
import {
  ADMIN_STATUS_CONFIG,
  mapOrderForAdmin,
  type AdminOrder,
  type AdminOrderStatus,
} from "@/lib/admin-orders";
import { formatPrice } from "@/lib/utils";

const ALL_STATUSES: AdminOrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled"];

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [panelStatus, setPanelStatus] = useState<AdminOrderStatus>("pending");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        if (!active) {
          return;
        }

        const nextOrders = Array.isArray(data.orders)
          ? data.orders.map(mapOrderForAdmin)
          : [];
        setOrders(nextOrders);
        setLoading(false);
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const todayRevenue = orders
      .filter((o) => o.date.startsWith(todayStr))
      .reduce((sum, o) => sum + o.total, 0);

    const monthRevenue = orders
      .filter((o) => {
        const d = new Date(o.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, o) => sum + o.total, 0);

    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      todayRevenue,
      monthRevenue,
    };
  }, [orders]);

  const openPanel = (order: AdminOrder) => {
    setSelectedOrder(order);
    setPanelStatus(order.status);
  };

  const closePanel = () => {
    setSelectedOrder(null);
    setShowSuccess(false);
  };

  const handleSave = async () => {
    if (!selectedOrder) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/orders/${selectedOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: panelStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      setOrders((prev) =>
        prev.map((order) => (
          order.id === selectedOrder.id ? { ...order, status: panelStatus } : order
        )),
      );
      setSelectedOrder((prev) => (prev ? { ...prev, status: panelStatus } : prev));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="Продажи"
        title="Управление заказами"
        description="Просматривайте, фильтруйте и обновляйте статусы заказов. Нажмите на строку, чтобы открыть детали."
      />

      {/* Stats Row */}
      <section className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <p className="admin-kpi-eyebrow">Всего заказов</p>
          <p className="admin-kpi-value">{loading ? "—" : stats.total}</p>
        </div>
        <div className="admin-kpi-card">
          <p className="admin-kpi-eyebrow">Новых</p>
          <p className="admin-kpi-value accent">{loading ? "—" : stats.pending}</p>
          {stats.pending > 0 && (
            <span className="admin-kpi-alert">Требуют внимания</span>
          )}
        </div>
        <div className="admin-kpi-card">
          <p className="admin-kpi-eyebrow">Выручка сегодня</p>
          <p className="admin-kpi-value">{loading ? "—" : formatPrice(stats.todayRevenue)}</p>
        </div>
        <div className="admin-kpi-card">
          <p className="admin-kpi-eyebrow">Выручка за месяц</p>
          <p className="admin-kpi-value">{loading ? "—" : formatPrice(stats.monthRevenue)}</p>
        </div>
      </section>

      {/* Order Table */}
      <section className="admin-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Номер</th>
                <th>Дата</th>
                <th>Клиент</th>
                <th>Товары</th>
                <th>Сумма</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const truncated =
                  order.items.length > 1
                    ? `${order.items[0].name} +${order.items.length - 1}`
                    : order.items[0]?.name ?? "—";
                return (
                  <tr
                    key={order.id}
                    className="cursor-pointer"
                    onClick={() => openPanel(order)}
                  >
                    <td>
                      <div className="font-medium text-[#E8A8C8]">{order.orderNumber}</div>
                    </td>
                    <td className="text-[#8A7D70] whitespace-nowrap">
                      {formatDate(order.date)}
                    </td>
                    <td>
                      <div className="text-[#2D2620]">{order.name}</div>
                      <div className="mt-0.5 text-xs text-[#8A7D70]">{order.email}</div>
                    </td>
                    <td className="max-w-[180px]">
                      <span className="block truncate text-sm text-[#8A7D70]" title={truncated}>
                        {truncated}
                      </span>
                    </td>
                    <td className="whitespace-nowrap font-medium text-[#2D2620]">
                      {formatPrice(order.total)}
                    </td>
                    <td>
                      <span className={`admin-badge ${ADMIN_STATUS_CONFIG[order.status].bg}`}>
                        {ADMIN_STATUS_CONFIG[order.status].label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Slide-in Panel */}
      {selectedOrder && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px]"
            onClick={closePanel}
          />

          {/* Panel */}
          <div className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-[500px] flex-col"
            style={{ backgroundColor: "var(--admin-surface)", boxShadow: "-8px 0 40px rgba(183,110,138,0.12)", animation: "slideInRight 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
          >
            <style>{`
              @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to   { transform: translateX(0);    opacity: 1; }
              }
            `}</style>

            {/* Panel Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#F5E0ED] px-5 py-5 md:px-6">
              <div>
                <p className="admin-kicker !mb-1">Заказ</p>
                <h2 className="text-2xl font-medium text-[#2D2620]">{selectedOrder.orderNumber}</h2>
                <p className="mt-1.5 text-sm text-[#8A7D70]">
                  {formatDate(selectedOrder.date)}
                </p>
              </div>
              <button
                type="button"
                onClick={closePanel}
                className="admin-button-ghost !min-h-10 !px-3 flex-shrink-0 text-[#8A7D70]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5 md:px-6">
              <div className="flex flex-col gap-4">

                {/* Customer Info */}
                <div className="rounded-[20px] border border-[#F5E0ED] bg-[#FFFAF8] p-4">
                  <p className="admin-kicker !mb-3">Покупатель</p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[#2D2620]">{selectedOrder.name}</p>
                    <p className="text-sm text-[#8A7D70]">{selectedOrder.email}</p>
                    <p className="text-sm text-[#8A7D70]">{selectedOrder.phone}</p>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="rounded-[20px] border border-[#F5E0ED] bg-[#FFFAF8] p-4">
                  <p className="admin-kicker !mb-3">Адрес доставки</p>
                  <div className="space-y-1 text-sm leading-6 text-[#8A7D70]">
                    <p className="text-[#2D2620]">{selectedOrder.address}</p>
                    <p>{selectedOrder.city}, {selectedOrder.state} {selectedOrder.zip}</p>
                    <p>{selectedOrder.country}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="rounded-[20px] border border-[#F5E0ED] bg-[#FFFAF8] p-4">
                  <p className="admin-kicker !mb-4">Состав заказа</p>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div
                        key={`${item.productId}-${idx}`}
                        className="flex items-center gap-3 rounded-[16px] border border-[#F5E0ED] bg-white p-2.5"
                      >
                        {/* Thumbnail */}
                        <div className="flex-shrink-0 h-[54px] w-[54px] overflow-hidden rounded-[12px] border border-[#F5E0ED] bg-[#FFF8F5]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                        {/* Details */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-[#2D2620]">{item.name}</p>
                          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-[#8A7D70]">
                            <span>Размер: <span className="text-[#2D2620]">{item.size}</span></span>
                            <span>Цвет: <span className="text-[#2D2620]">{item.color}</span></span>
                            <span>Кол-во: <span className="text-[#2D2620]">{item.quantity}</span></span>
                          </div>
                        </div>
                        {/* Price */}
                        <p className="flex-shrink-0 text-sm font-medium text-[#2D2620]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="mt-4 flex items-center justify-between border-t border-[#F5E0ED] pt-4">
                    <span className="text-sm font-medium text-[#8A7D70]">Итого</span>
                    <span className="text-2xl font-semibold tracking-[-0.04em] text-[#2D2620]">
                      {formatPrice(selectedOrder.total)}
                    </span>
                  </div>
                </div>

                {/* Status Selector */}
                <div className="rounded-[20px] border border-[#F5E0ED] bg-[#FFFAF8] p-4">
                  <p className="admin-kicker !mb-3">Статус заказа</p>
                  <div className="relative">
                    <select
                      value={panelStatus}
                      onChange={(e) => setPanelStatus(e.target.value as AdminOrderStatus)}
                      className="admin-select appearance-none pr-10"
                    >
                      {ALL_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {ADMIN_STATUS_CONFIG[s].label}
                        </option>
                      ))}
                    </select>
                    {/* Custom chevron */}
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8A7D70]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  {panelStatus !== selectedOrder.status && (
                    <p className="mt-2 text-xs text-[#8A7D70]">
                      Текущий статус: <span className={`font-medium ${ADMIN_STATUS_CONFIG[selectedOrder.status].text}`}>{ADMIN_STATUS_CONFIG[selectedOrder.status].label}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="flex-shrink-0 border-t border-[#F5E0ED] px-5 py-4 md:px-6">
              <div className="flex flex-col gap-3">
                {showSuccess && (
                  <div className="flex items-center justify-center gap-2 rounded-full bg-[#F0FAF4] py-2.5 text-sm font-medium text-[#4CAF7D]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Статус обновлён
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="admin-button-primary w-full !min-h-11 text-sm"
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Сохранение…
                    </span>
                  ) : (
                    "Сохранить"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="admin-button-secondary w-full !min-h-11 text-sm"
                >
                  Распечатать
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminShell>
  );
}
