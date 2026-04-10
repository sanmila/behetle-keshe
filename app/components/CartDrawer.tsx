"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useCartStore, selectItems, selectCount, selectSubtotal } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang } = useI18n();
  const items = useCartStore(selectItems);
  const count = useCartStore(selectCount);
  const subtotal = useCartStore(selectSubtotal);
  const { update, remove } = useCartStore();
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);

  const handleQuantityChange = async (itemId: string, nextQuantity: number) => {
    if (pendingItemId === itemId) return;
    setPendingItemId(itemId);
    try {
      await update(itemId, nextQuantity);
    } finally {
      setPendingItemId((current) => (current === itemId ? null : current));
    }
  };

  const handleRemove = async (itemId: string) => {
    if (pendingItemId === itemId) return;
    setPendingItemId(itemId);
    try {
      await remove(itemId);
    } finally {
      setPendingItemId((current) => (current === itemId ? null : current));
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70]"
            style={{ backgroundColor: "rgba(58,42,47,0.3)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-[80] flex flex-col shadow-xl"
            style={{ backgroundColor: "#FFFBFC" }}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid #F1D5DE" }}>
              <h2 className="font-display text-2xl font-light" style={{ color: "#2A1F23" }}>
                {t.cart.title} ({count})
              </h2>
              <button onClick={onClose} className="hover:opacity-60 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2A1F23" strokeWidth="1.5">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#B76E8A" strokeWidth="1" className="mb-4">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  <p style={{ color: "#6E4C57" }}>{t.cart.empty}</p>
                  <button onClick={onClose} className="mt-4 text-xs hover:opacity-70 transition-opacity" style={{ color: "#B76E8A" }}>
                    {t.cart.continueShopping}
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-5" style={{ borderBottom: "1px solid #F1D5DE" }}>
                      <img
                        src={item.product.image}
                        alt={item.product.nameRu}
                        className="w-20 h-24 object-cover shrink-0"
                        style={{ backgroundColor: "#FBE7EF" }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate mb-0.5" style={{ color: "#2A1F23" }}>
                          {lang === "ru" ? item.product.nameRu : item.product.nameEn}
                        </h3>
                        <p className="text-xs mt-0.5" style={{ color: "#6E4C57" }}>{formatPrice(Number(item.product.price))}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={pendingItemId === item.id || item.quantity <= 1}
                            className="relative w-6 h-6 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ border: "1px solid #F1D5DE" }}
                          >
                            <span style={{ color: "#2A1F23", fontSize: "14px", fontWeight: 300 }}>−</span>
                          </button>
                          <span className="text-sm w-6 text-center" style={{ color: "#2A1F23" }}>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={pendingItemId === item.id}
                            className="w-6 h-6 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ border: "1px solid #F1D5DE" }}
                          >
                            <span style={{ color: "#2A1F23", fontSize: "14px", fontWeight: 300 }}>+</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemove(item.id)}
                            disabled={pendingItemId === item.id}
                            className="ml-auto text-[10px] disabled:opacity-40 transition-opacity"
                            style={{ color: "#E8635A" }}
                          >
                            {t.cart.remove}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6" style={{ borderTop: "1px solid #F1D5DE" }}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm" style={{ color: "#6E4C57" }}>{t.cart.subtotal}</span>
                  <span className="font-display text-xl" style={{ color: "#2A1F23" }}>{formatPrice(subtotal)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block text-center py-3.5 text-xs tracking-[0.2em] uppercase font-medium transition-colors"
                  style={{ backgroundColor: "#B76E8A", color: "#fff" }}
                >
                  {t.cart.checkout}
                </Link>
                <button
                  onClick={onClose}
                  className="block w-full text-center mt-2 text-xs py-2 transition-colors"
                  style={{ color: "#6E4C57" }}
                >
                  {t.cart.continueShopping}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}