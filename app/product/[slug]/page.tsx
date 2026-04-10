"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const ALL_SIZES = ["XS", "S", "M", "L", "XL"];

interface Product {
  id: string;
  nameRu: string;
  nameEn: string;
  price: string;
  category: string;
  tag?: string;
  color: string;
  colorRu: string;
  colorEn: string;
  descriptionRu: string;
  descriptionEn: string;
  image: string;
  images: string;
  sizes: string;
  stockQty: number;
  colors?: string[];
  features?: string[];
  description?: string;
}

const SHIPPING_INFO = {
  ru: {
    title: "Доставка и возврат",
    delivery: "Доставка по России — от 300 ₽, 3–7 рабочих дней. Бесплатно при заказе от 5 000 ₽.",
    returns: "Возврат — 14 дней с момента получения. Изделия с авторским принтом возврату не подлежат.",
    international: "Международная доставка рассчитывается при оформлении.",
    contact: "Вопросы: hello@bahetle.ru",
  },
  en: {
    title: "Shipping & Returns",
    delivery: "Shipping across Russia — from 300 ₽, 3–7 business days. Free over 5 000 ₽.",
    returns: "Returns — 14 days from receipt. Items with custom prints are non-returnable.",
    international: "International shipping calculated at checkout.",
    contact: "Questions: hello@bahetle.ru",
  },
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const { t, lang } = useI18n();
  const { add } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setNotFound(false);
    fetch(`/api/products?slug=${encodeURIComponent(slug)}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then((d) => {
        if (d?.products && d.products.length > 0) {
          setProduct(d.products[0]);
          if (d.products[0].colors && d.products[0].colors.length > 0) {
            setSelectedColor(d.products[0].colors[0]);
          }
          if (d.products[0].sizes) {
            const sizes = typeof d.products[0].sizes === "string"
              ? d.products[0].sizes.split(",").map((s: string) => s.trim())
              : d.products[0].sizes;
            if (sizes.length > 0) setSelectedSize(sizes[0]);
          }
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  const handleAdd = async () => {
    if (!product) return;
    await add(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Build images array
  const images = product
    ? (() => {
        const imgs: string[] = [product.image];
        if (product.images) {
          const extra = typeof product.images === "string"
            ? product.images.split(",").map((s: string) => s.trim()).filter(Boolean)
            : [];
          imgs.push(...extra);
        }
        return imgs;
      })()
    : [];

  const primaryImage = images[activeImage] || product?.image || "";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FFFBFC" }}>
        <motion.div
          className="w-8 h-8 rounded-full border-2"
          style={{ borderColor: "#F1D5DE", borderTopColor: "#B76E8A" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#FFFBFC" }}>
        <Navbar />
        <div className="text-center mt-32 mb-16 px-6">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "#B76E8A" }}>404</p>
          <h1
            className="mb-3"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(32px,5vw,56px)", fontWeight: 300, color: "#2A1F23" }}
          >
            Товар не найден
          </h1>
          <p className="text-sm mb-8" style={{ color: "#6E4C57" }}>
            Возможно, он закончился или больше не продаётся.
          </p>
          <Link
            href="/#shop"
            className="inline-flex items-center gap-2 px-8 py-3 text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
            style={{ border: "1px solid #F1D5DE", color: "#6E4C57" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Вернуться в магазин
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const name = lang === "ru" ? product.nameRu : product.nameEn;
  const description = lang === "ru" ? product.descriptionRu : product.descriptionEn;
  const colorName = lang === "ru" ? product.colorRu : product.colorEn;
  const outOfStock = product.stockQty === 0;

  const productColors: string[] =
    product.colors && product.colors.length > 0
      ? product.colors
      : ["#F8C8DC", "#2D2620", "#F0E6EC"];

  const productFeatures: string[] =
    product.features && product.features.length > 0
      ? product.features
      : [
          "• Материал: 100% хлопок",
          "• Крой: оверсайз",
          "• Принт: авторский, ручной рисунок",
          "• Уход: стирка при 30°C",
          "• Производство: Россия",
        ];

  const shipping = SHIPPING_INFO[lang];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FFFBFC" }}>
      <Navbar />

      <main className="flex-1 pt-28 md:pt-36 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase transition-colors group"
              style={{ color: "#6E4C57" }}
            >
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5"
                className="transition-transform group-hover:-translate-x-0.5"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Назад
            </button>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-12 lg:gap-20">
            {/* LEFT: Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              {/* Main image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", backgroundColor: "#FBE7EF" }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={primaryImage}
                    alt={name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.slice(0, 4).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative shrink-0 w-16 h-20 overflow-hidden transition-all duration-200 ${
                        activeImage === i
                          ? "ring-2 ring-[#B76E8A] ring-offset-1"
                          : "opacity-60 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: "#FBE7EF" }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* RIGHT: Product details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex flex-col gap-0"
            >
              {/* 1. Category badge */}
              {product.tag && (
                <span
                  className="inline-block text-[10px] tracking-[0.2em] uppercase px-3 py-1 mb-5 w-fit text-white"
                  style={{ backgroundColor: product.tag === "new" ? "#B76E8A" : "#2A1F23" }}
                >
                  {product.tag === "new" ? "НОВИНКА" : "ХИТ"}
                </span>
              )}

              {/* 2. Product name */}
              <h1
                className="leading-tight mb-3"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(28px,4vw,48px)",
                  fontWeight: 300,
                  color: "#2A1F23",
                }}
              >
                {name}
              </h1>

              {/* 3. Short emotional description */}
              {description && (
                <p
                  className="italic mb-5 leading-relaxed"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(14px,1.5vw,18px)",
                    fontWeight: 300,
                    color: "#6E4C57",
                  }}
                >
                  {description}
                </p>
              )}

              {/* 4. Price */}
              <p
                className="mb-8 font-medium"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(26px,3vw,36px)", fontWeight: 400, color: "#2A1F23" }}
              >
                {formatPrice(Number(product.price))}
              </p>

              {/* 5. Color selector */}
              <div className="mb-7">
                <p className="text-[10px] tracking-[0.3em] uppercase mb-3 flex items-center gap-2" style={{ color: "#6E4C57" }}>
                  ЦВЕТ: <span style={{ color: "#2A1F23", opacity: 0.5 }} className="normal-case tracking-normal">{colorName}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {productColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      title={colorName}
                      aria-label={`Цвет: ${colorName}`}
                      className={`w-7 h-7 rounded-full transition-all duration-200 ${selectedColor === color ? "ring-2 ring-[#B76E8A] ring-offset-2 scale-110" : "hover:scale-105"}`}
                      style={{ backgroundColor: color, border: color === "#FFFFFF" || color === "#FFFBFC" || color === "#FFF8F5" ? "1px solid #F1D5DE" : "none" }}
                    />
                  ))}
                </div>
              </div>

              {/* 6. Size selector */}
              <div className="mb-7">
                <p className="text-[10px] tracking-[0.3em] uppercase mb-3 flex items-center gap-2" style={{ color: "#6E4C57" }}>
                  РАЗМЕР:
                  {!selectedSize && (
                    <span className="normal-case tracking-normal" style={{ color: "#E8635A" }}>
                      {lang === "ru" ? "выберите размер" : "select a size"}
                    </span>
                  )}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {(product.sizes ? product.sizes.split(",").map((s: string) => s.trim()) : ALL_SIZES).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 text-[11px] tracking-wider font-medium border transition-all duration-200 cursor-pointer active:scale-95 ${
                        selectedSize === size
                          ? "text-white"
                          : "hover:opacity-80"
                      }`}
                      style={
                        selectedSize === size
                          ? { backgroundColor: "#B76E8A", borderColor: "#B76E8A" }
                          : { borderColor: "#F1D5DE", color: "#2A1F23" }
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button className="mt-3 text-[10px] transition-colors underline underline-offset-2" style={{ color: "#6E4C57" }}>
                  Гид по размерам ↗
                </button>
              </div>

              {/* 7. Quantity selector */}
              <div className="mb-8">
                <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#6E4C57" }}>
                  КОЛИЧЕСТВО:
                </p>
                <div className="flex items-center gap-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 border hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors relative"
                    style={{ borderColor: "#F1D5DE" }}
                    aria-label="Уменьшить"
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-base font-light" style={{ color: "#2A1F23" }}>−</span>
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-sm border-t border-b" style={{ borderColor: "#F1D5DE", color: "#2A1F23" }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    disabled={quantity >= 10}
                    className="w-10 h-10 border hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors relative"
                    style={{ borderColor: "#F1D5DE" }}
                    aria-label="Увеличить"
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-base font-light" style={{ color: "#2A1F23" }}>+</span>
                  </button>
                </div>
              </div>

              {/* 8. Add to cart button */}
              <button
                onClick={handleAdd}
                disabled={outOfStock}
                className={`w-full py-4 text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-300 cursor-pointer active:scale-[0.99] disabled:cursor-not-allowed mb-10 ${
                  outOfStock ? "text-white" : "text-white hover:opacity-90"
                }`}
                style={
                  outOfStock
                    ? { backgroundColor: "#FBE7EF", color: "#6E4C57" }
                    : added
                    ? { backgroundColor: "#E8635A" }
                    : { backgroundColor: "#B76E8A" }
                }
              >
                {outOfStock
                  ? t.products.outOfStock
                  : added
                  ? "✓ Добавлено"
                  : "В КОРЗИНУ"}
              </button>

              {/* Low stock warning */}
              {!outOfStock && product.stockQty > 0 && product.stockQty <= 5 && (
                <p className="-mt-8 mb-8 text-xs" style={{ color: "#E8635A" }}>
                  {lang === "ru"
                    ? `Осталось всего ${product.stockQty} шт. — поторопитесь!`
                    : `Only ${product.stockQty} left — hurry!`}
                </p>
              )}

              {/* 9. Divider */}
              <div style={{ borderTop: "1px solid #F1D5DE" }}/>

              {/* 10. Product description section */}
              <div className="py-8">
                <h4
                  className="text-[10px] tracking-[0.3em] uppercase mb-4"
                  style={{ color: "#B76E8A" }}
                >
                  ОБ ЭТОМ ТОВАРЕ
                </h4>
                {description && (
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#6E4C57" }}>{description}</p>
                )}
                <ul className="space-y-2">
                  {productFeatures.map((feature, i) => (
                    <li key={i} className="text-sm leading-relaxed" style={{ color: "#6E4C57" }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 11. Shipping accordion */}
              <div style={{ borderTop: "1px solid #F1D5DE" }}>
                <button
                  onClick={() => setShippingOpen(!shippingOpen)}
                  className="w-full py-5 flex items-center justify-between text-left group"
                >
                  <span className="text-[10px] tracking-[0.3em] uppercase group-hover:opacity-70 transition-opacity" style={{ color: "#6E4C57" }}>
                    {shipping.title}
                  </span>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5"
                    className={`transition-transform duration-300 ${shippingOpen ? "rotate-180" : ""}`}
                    style={{ color: "#6E4C57" }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <AnimatePresence>
                  {shippingOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 space-y-2">
                        <p className="text-sm" style={{ color: "#6E4C57" }}>{shipping.delivery}</p>
                        <p className="text-sm" style={{ color: "#6E4C57" }}>{shipping.returns}</p>
                        <p className="text-sm" style={{ color: "#6E4C57" }}>{shipping.international}</p>
                        <p className="text-sm font-medium mt-1" style={{ color: "#6E4C57" }}>{shipping.contact}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 12. Share row */}
              <div className="pt-5 pb-2 flex items-center gap-4" style={{ borderTop: "1px solid #F1D5DE" }}>
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#6E4C57" }}>
                  {lang === "ru" ? "Поделиться" : "Share"}
                </span>
                <div className="flex items-center gap-3">
                  {/* Copy link */}
                  <button
                    onClick={handleCopyLink}
                    className="transition-colors"
                    style={{ color: "#6E4C57" }}
                    aria-label={lang === "ru" ? "Копировать ссылку" : "Copy link"}
                    title={lang === "ru" ? "Копировать ссылку" : "Copy link"}
                  >
                    {copied ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8635A" strokeWidth="1.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    )}
                  </button>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/bahetle__keshe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    style={{ color: "#6E4C57" }}
                    aria-label="Instagram"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>

                  {/* Telegram */}
                  <a
                    href="https://t.me/bahetlekeshe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    style={{ color: "#6E4C57" }}
                    aria-label="Telegram"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 2L11 13" />
                      <path d="M22 2L15 22l-4-9-9-5 20-6z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
