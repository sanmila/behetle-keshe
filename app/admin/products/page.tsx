"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminShell from "../components/AdminShell";
import { formatPrice } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface Product {
  id: string;
  nameRu: string;
  nameEn: string;
  price: string;
  category: string;
  tag?: string;
  stockQty: number;
  image: string;
}

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  new:        { bg: "badge-tag-new",        color: "" },
  bestseller: { bg: "badge-tag-bestseller", color: "" },
  sale:       { bg: "badge-tag-sale",       color: "" },
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [deleteModal, setDeleteModal] = useState<{ open: boolean; product: Product | null }>({ open: false, product: null });

  useEffect(() => {
    let active = true;
    const url = search ? `/api/admin/products?search=${encodeURIComponent(search)}` : "/api/admin/products";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => { if (!active) return; setLoading(false); });
    return () => { active = false; };
  }, [search]);

  const lowStockCount = useMemo(() => products.filter((p) => p.stockQty <= 5).length, [products]);

  const handleDelete = async () => {
    if (!deleteModal.product) return;
    setDeletingId(deleteModal.product.id);
    setDeleteModal({ open: false, product: null });
    try { await fetch(`/api/admin/products/${deleteModal.product.id}`, { method: "DELETE" }); } catch { /* noop */ }
    setProducts((prev) => prev.filter((p) => p.id !== deleteModal.product!.id));
    setDeletingId(null);
  };

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="Каталог"
        title="Управление товарами"
        description="Следите за остатками, корректируйте описания и быстро переходите к редактированию карточек без лишнего шума в интерфейсе."
        actions={
          <>
            <Link href="/admin/products/add" className="admin-button-primary">Добавить товар</Link>
            <div className="admin-summary-card">
              <p className="admin-summary-label">Низкий остаток</p>
              <p className="admin-summary-value">{lowStockCount}</p>
            </div>
          </>
        }
      />

      <section className="admin-panel p-5">
        <div className="admin-toolbar mb-5">
          <div className="admin-toolbar-copy">
            <p className="admin-kicker">Фильтр каталога</p>
            <h2 className="admin-toolbar-title">Список товаров</h2>
            <p className="admin-toolbar-description">Используйте поиск, чтобы быстро найти нужную карточку и перейти к редактированию.</p>
          </div>
          <div className="admin-field">
            <label className="admin-label">Поиск</label>
            <input
              type="text"
              value={search}
              onChange={(event) => { setLoading(true); setSearch(event.target.value); }}
              placeholder="Название, категория или артикул"
              className="admin-input"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-3">
            {[0, 1, 2, 3, 4].map((item) => (
              <div key={item} className="h-18 rounded-[20px]" style={{ border: "1px solid var(--admin-border)", backgroundColor: "var(--admin-surface-alt)" }} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="admin-empty">
            <p className="text-lg" style={{ color: "var(--admin-text)" }}>Товары не найдены</p>
            <p className="mt-2 text-sm" style={{ color: "var(--admin-text-muted)" }}>Измените поисковый запрос или добавьте новую карточку в каталог.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Товар</th>
                  <th>Категория</th>
                  <th>Цена</th>
                  <th>Остаток</th>
                  <th>Метка</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const tagStyle = TAG_STYLES[product.tag || ""] || { bg: "badge-customer", color: "" };
                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="flex items-center gap-4">
                          <div
                            className="relative h-16 w-14 overflow-hidden rounded-[16px]"
                            style={{ border: "1px solid var(--admin-border)", backgroundColor: "var(--admin-surface-alt)" }}
                          >
                            <Image src={product.image} alt={product.nameRu} fill className="object-cover" sizes="56px" />
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: "var(--admin-text)" }}>{product.nameRu}</p>
                            <p className="mt-1 text-xs" style={{ color: "var(--admin-text-muted)" }}>{product.nameEn}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "var(--admin-text-muted)" }}>{product.category}</td>
                      <td className="font-medium" style={{ color: "var(--admin-text)" }}>{formatPrice(Number(product.price))}</td>
                      <td>
                        <span style={{ color: product.stockQty <= 5 ? "var(--admin-urgent)" : "var(--admin-text-muted)" }}>
                          {product.stockQty}
                        </span>
                      </td>
                      <td>
                        {product.tag ? (
                          <span className={`admin-badge ${tagStyle.bg}`}>{product.tag}</span>
                        ) : (
                          <span className="text-sm" style={{ color: "var(--admin-text-muted)" }}>Без метки</span>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/products/${product.id}/edit`} className="admin-button-secondary !min-h-10 !px-4">Редактировать</Link>
                          <button
                            type="button"
                            onClick={() => setDeleteModal({ open: true, product })}
                            disabled={deletingId === product.id}
                            className="admin-button-ghost !min-h-10 !px-4 disabled:opacity-40"
                            style={{ color: "var(--admin-urgent)" }}
                          >
                            {deletingId === product.id ? "Удаление..." : "Удалить"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.open && deleteModal.product && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={() => setDeleteModal({ open: false, product: null })}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="admin-panel mx-4 max-w-sm p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: "var(--admin-urgent-bg)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.5">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z" />
                  <path d="M10 11v6M14 11v6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium" style={{ color: "var(--admin-text)" }}>Удалить товар?</h3>
              <p className="mt-3 text-sm" style={{ color: "var(--admin-text-muted)" }}>
                Вы уверены, что хотите удалить <span style={{ color: "var(--admin-text)" }}>&laquo;{deleteModal.product.nameRu}&raquo;</span>?
                <br />Это действие нельзя отменить.
              </p>
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteModal({ open: false, product: null })}
                  className="flex h-12 items-center gap-2 rounded-full px-6 transition-colors"
                  style={{ border: "1px solid var(--admin-border)", backgroundColor: "var(--admin-surface-alt)", color: "var(--admin-text)" }}
                >
                  Отмена
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deletingId !== null}
                  className="admin-button-danger disabled:opacity-50"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z" />
                  </svg>
                  {deletingId !== null ? "Удаление..." : "Удалить"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  );
}
