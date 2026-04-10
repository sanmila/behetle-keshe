"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  nameRu: string;
  nameEn: string;
  price: string;
  image: string;
  images?: string;
  sizes?: string;
  tag?: string;
  slug?: string;
  descriptionRu?: string;
  descriptionEn?: string;
}

const PRODUCT_DESCRIPTIONS: Record<string, { ru: string; en: string }> = {
  "oversized-t-shirt": {
    ru: "Тот самый принт, который начался с бабушкиного эскиза",
    en: "The print that started from grandmother's sketch",
  },
  "floral-blouse": {
    ru: "Татарский орнамент, который она носила каждую пятницу",
    en: "Tatar pattern she wore every Friday",
  },
  "summer-dress": {
    ru: "Лёгкость. Лето. Бәхетле.",
    en: "Lightness. Summer. Bähetle.",
  },
  "essential-dress": {
    ru: "Лёгкость. Лето. Бәхетле.",
    en: "Lightness. Summer. Bähetle.",
  },
};

const PRODUCT_IMAGES: Record<string, { primary: string; secondary: string }> = {
  "oversized-t-shirt": {
    primary: "/products/Product 01/Young_woman_wearing_202604080916.jpeg",
    secondary: "/products/Product 01/Model_wearing_oversized_202604080917.jpeg",
  },
  "floral-blouse": {
    primary: "/products/Product 03/Woman_wearing_oversized_202604080931.jpeg",
    secondary: "/products/Product 03/Woman_wearing_t-shirt_202604080931.jpeg",
  },
  "summer-dress": {
    primary: "/products/product 11/Woman_wearing_red_202604081026.jpeg",
    secondary: "/products/product 11/Young_woman_wearing_202604081026.jpeg",
  },
  "essential-dress": {
    primary: "/products/product 11/Young_woman_wearing_202604081026.jpeg",
    secondary: "/products/product 11/Woman_wearing_red_202604081026 (1).jpeg",
  },
};

const ALL_SIZES = ["XS", "S", "M", "L", "XL"];

function QuickViewModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { lang } = useI18n();
  const { add } = useCartStore();
  const [selectedSize, setSelectedSize] = useState("M");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleAdd = async () => {
    await add(product.id);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(42,31,35,0.45)" }} />

      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: "#FFFBFC", boxShadow: "0 40px 100px rgba(42,31,35,0.2)", borderRadius: "24px", border: "1px solid #F1D5DE" }}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center z-10 rounded-full shadow-sm transition-all duration-200"
          style={{ backgroundColor: "#fff", color: "#2A1F23" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FBE7EF")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-[3/4] overflow-hidden" style={{ backgroundColor: "#FBE7EF", borderRadius: "24px 0 0 24px" }}>
            <img
              src={product.image}
              alt={lang === "ru" ? product.nameRu : product.nameEn}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:p-10 flex flex-col">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#B76E8A" }}>Новинка</p>
            <h3 className="font-display font-normal text-3xl mb-2 leading-tight" style={{ color: "#2A1F23" }}>
              {lang === "ru" ? product.nameRu : product.nameEn}
            </h3>
            {PRODUCT_DESCRIPTIONS[product.nameEn.toLowerCase().replace(/\s+/g, "-")] && (
              <p className="text-sm mb-4 italic" style={{ color: "#6E4C57" }}>
                {lang === "ru"
                  ? PRODUCT_DESCRIPTIONS[product.nameEn.toLowerCase().replace(/\s+/g, "-")]?.ru
                  : PRODUCT_DESCRIPTIONS[product.nameEn.toLowerCase().replace(/\s+/g, "-")]?.en}
              </p>
            )}
            <p className="font-display text-2xl mb-8" style={{ color: "#2A1F23" }}>
              {formatPrice(Number(product.price))}
            </p>

            <div className="mb-6">
              <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: "#6E4C57" }}>Размер</p>
              <div className="flex gap-2">
                {(product.sizes ? product.sizes.split(",").map((s: string) => s.trim()) : ALL_SIZES).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="w-11 h-11 text-[11px] tracking-wider border transition-all duration-200"
                    style={
                      selectedSize === size
                        ? { backgroundColor: "#B76E8A", color: "#fff", borderColor: "#B76E8A", fontWeight: 500 }
                        : { borderColor: "#F1D5DE", color: "#2A1F23", backgroundColor: "transparent" }
                    }
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="w-full py-4 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 mt-auto"
              style={
                added
                  ? { backgroundColor: "#E8635A", color: "#fff" }
                  : { backgroundColor: "#B76E8A", color: "#fff" }
              }
              onMouseEnter={(e) => { if (!added) e.currentTarget.style.backgroundColor = "#9F5C75"; }}
              onMouseLeave={(e) => { if (!added) e.currentTarget.style.backgroundColor = "#B76E8A"; }}
            >
              {added ? "✓ Добавлено" : "В корзину"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function NewArrivals() {
  const { lang } = useI18n();
  const [products, setProducts] = useState<Product[]>([]);
  const [quickProduct, setQuickProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("/api/products?category=new")
      .then((r) => r.json())
      .then((d) => setProducts(d.products?.slice(0, 4) || []));
  }, []);

  if (products.length === 0) return null;

  return (
    <>
      {/* White background — clean, premium canvas */}
      <section id="new-arrivals" className="py-20 md:py-32" style={{ backgroundColor: "#FFFBFC" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            className="flex items-end justify-between mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#6E4C57" }}>Новое</p>
              <h2 className="font-display font-normal text-5xl md:text-7xl leading-none" style={{ color: "#2A1F23", fontWeight: 400 }}>
                Новинки
              </h2>
            </motion.div>
            <motion.a
              href="#shop"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.3 } } }}
              className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-200 group"
              style={{ color: "#6E4C57" }}
            >
              Все новинки
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.a>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {products.map((product) => {
              const slug = product.slug || product.nameEn.toLowerCase().replace(/\s+/g, "-");
              const imgPair = PRODUCT_IMAGES[slug] || { primary: product.image, secondary: product.image };

              return (
                <motion.article
                  key={product.id}
                  className="group"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {/* Premium card */}
                  <Link
                    href={`/product/${slug}`}
                    className="block relative overflow-hidden mb-4"
                    style={{
                      aspectRatio: "3/4",
                      backgroundColor: "#FBE7EF",
                      borderRadius: "20px",
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
                    {/* Primary image */}
                    <img
                      src={imgPair.primary}
                      alt={lang === "ru" ? product.nameRu : product.nameEn}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
                    />
                    {/* Secondary image — revealed on hover */}
                    <img
                      src={imgPair.secondary}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    {/* Quick view button */}
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickProduct(product); }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium backdrop-blur-md"
                      style={{
                        whiteSpace: "nowrap",
                        backgroundColor: "rgba(255,255,255,0.92)",
                        color: "#2A1F23",
                        border: "1px solid #F1D5DE",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                      }}
                    >
                      Быстрый просмотр
                    </button>

                    {product.tag && (
                      <span
                        className="absolute top-3 left-3 text-white text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 font-medium"
                        style={{ backgroundColor: "#B76E8A", letterSpacing: "0.1em" }}
                      >
                        Новинка
                      </span>
                    )}
                  </Link>

                  {/* Name */}
                  <Link href={`/product/${slug}`}>
                    <h3 className="text-sm mb-1 group-hover:opacity-70 transition-opacity" style={{ color: "#2A1F23", fontWeight: 500, letterSpacing: "0.01em" }}>
                      {lang === "ru" ? product.nameRu : product.nameEn}
                    </h3>
                  </Link>
                  <p className="text-xs mb-1 leading-snug" style={{ color: "#6E4C57" }}>
                    {lang === "ru" ? PRODUCT_DESCRIPTIONS[slug]?.ru : PRODUCT_DESCRIPTIONS[slug]?.en}
                  </p>
                  <p className="text-sm font-medium" style={{ color: "#2A1F23" }}>{formatPrice(Number(product.price))}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {quickProduct && (
        <QuickViewModal product={quickProduct} onClose={() => setQuickProduct(null)} />
      )}
    </>
  );
}
