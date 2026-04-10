"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  nameRu: string;
  nameEn: string;
  price: string;
  category: string;
  tag?: string;
  color: string;
  image: string;
  stockQty: number;
  sizes: string[];
  slug?: string;
}

const FILTER_TABS = [
  { key: "all", label: "Все" },
  { key: "new", label: "Новинки" },
  { key: "tops", label: "Верх" },
  { key: "outerwear", label: "Верхняя одежда" },
  { key: "bottoms", label: "Низ" },
  { key: "shoes", label: "Обувь" },
  { key: "accessories", label: "Аксессуары" },
];

export default function Collections() {
  const { lang } = useI18n();
  const { add, loading } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState("all");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []));
  }, []);

  const filtered = active === "all" ? products
    : active === "new" ? products.filter((p) => p.tag === "new")
    : products.filter((p) => p.category === active);

  const handleAdd = async (productId: string) => {
    if (loading) return;
    const prev = addedIds.has(productId);
    await add(productId);
    if (!prev) {
      setAddedIds((prev) => new Set([...prev, productId]));
      setTimeout(() => {
        setAddedIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      }, 2000);
    }
  };

  return (
    <section id="shop" className="py-20 md:py-32" style={{ backgroundColor: "#FFFBFC" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Emotional label */}
        <motion.p
          className="text-center mb-10"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(16px,1.8vw,22px)", color: "#6E4C57", fontStyle: "italic", fontWeight: 300 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Каждая вещь создана вручную, небольшими партиями.
          <br />
          Когда она уходит — она уходит навсегда.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#6E4C57" }}>Коллекция</p>
            <h2 className="font-display font-normal text-5xl md:text-7xl leading-none" style={{ color: "#2A1F23", fontWeight: 400 }}>
              Магазин
            </h2>
          </div>

          {/* Pill filter tabs — stronger active state */}
          <div className="flex gap-2 flex-wrap">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={active === tab.key ? "filter-pill active" : "filter-pill"}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stronger divider */}
        <div className="h-px mb-12" style={{ background: "linear-gradient(to right, #F1D5DE, #F1D5DE)" }} />

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group"
              >
                {/* Premium card */}
                <Link
                  href={`/product/${product.slug || product.nameEn.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block relative overflow-hidden aspect-[3/4] mb-3"
                  style={{
                    backgroundColor: "#FBE7EF",
                    borderRadius: "18px",
                    border: "1px solid #F1D5DE",
                    boxShadow: "0 2px 8px rgba(42,31,35,0.04)",
                    transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-5px)";
                    el.style.boxShadow = "0 16px 48px -12px rgba(183,110,138,0.18), 0 4px 16px -4px rgba(183,110,138,0.1)";
                    el.style.borderColor = "rgba(183,110,138,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = "0 2px 8px rgba(42,31,35,0.04)";
                    el.style.borderColor = "#F1D5DE";
                  }}
                >
                  <img
                    src={product.image}
                    alt={lang === "ru" ? product.nameRu : product.nameEn}
                    className="w-full h-full object-cover"
                    style={{ transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
                    loading="lazy"
                  />
                  {product.tag && (
                    <span
                      className="absolute top-3 left-3 text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 font-medium text-white"
                      style={{ backgroundColor: product.tag === "new" ? "#B76E8A" : "#2A1F23" }}
                    >
                      {product.tag === "new" ? "Новинка" : "Хит"}
                    </span>
                  )}
                  {/* Add to cart — revealed on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAdd(product.id); }}
                      className="w-full py-2.5 text-[10px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 active:scale-95"
                      style={
                        addedIds.has(product.id)
                          ? { backgroundColor: "#E8635A" }
                          : { backgroundColor: "#B76E8A" }
                      }
                    >
                      {addedIds.has(product.id) ? "✓ Добавлено" : "В корзину"}
                    </button>
                  </div>
                </Link>

                {/* Product info */}
                <div className="flex justify-between items-start gap-2">
                  <Link href={`/product/${product.slug || product.nameEn.toLowerCase().replace(/\s+/g, "-")}`}>
                    <p className="text-sm group-hover:opacity-70 transition-opacity truncate" style={{ color: "#2A1F23", fontWeight: 500, letterSpacing: "0.01em" }}>
                      {lang === "ru" ? product.nameRu : product.nameEn}
                    </p>
                  </Link>
                  <span className="text-sm shrink-0" style={{ color: "#2A1F23", fontWeight: 500 }}>{formatPrice(Number(product.price))}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="text-center text-[12px] tracking-[0.2em] uppercase mt-16"
          style={{ color: "#6E4C57" }}
          key={filtered.length}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          Показано {filtered.length} {filtered.length === 1 ? "вещь" : filtered.length < 5 ? "вещи" : "вещей"}
        </motion.p>
      </div>
    </section>
  );
}
