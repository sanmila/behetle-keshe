"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  nameRu: string;
  nameEn: string;
  price: string;
  image: string;
  tag?: string;
  slug?: string;
}

export default function WomenCollection() {
  const { t, lang } = useI18n();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => setProducts(d.products?.slice(0, 4) || []));
  }, []);

  if (products.length === 0) return null;

  return (
    <section id="women" className="py-20 md:py-28" style={{ backgroundColor: "#FFFBFC" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header — stronger hierarchy */}
        <motion.div
          className="mb-14 flex items-end justify-between"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#6E4C57" }}>
              {t.products.womenEyebrow}
            </p>
            <h2 className="font-display font-normal text-5xl md:text-7xl leading-none" style={{ color: "#2A1F23", fontWeight: 400 }}>
              {t.products.womenTitle}
            </h2>
          </div>
          <a
            href="#shop"
            className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-200 group"
            style={{ color: "#6E4C57", paddingBottom: "1px", borderBottom: "1px solid #F1D5DE" }}
          >
            Смотреть все
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <motion.article
              key={product.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              {/* Premium card */}
              <Link
                href={`/product/${product.slug || product.nameEn.toLowerCase().replace(/\s+/g, "-")}`}
                className="block relative overflow-hidden aspect-[3/4] mb-4"
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
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(42,31,35,0.12) 0%, transparent 30%)" }}/>
                {product.tag && (
                  <span className="absolute top-3 left-3 text-white text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 font-medium" style={{ backgroundColor: "#B76E8A" }}>
                    {product.tag === "new" ? t.products.new : t.products.bestseller}
                  </span>
                )}
              </Link>

              {/* Product info */}
              <Link href={`/product/${product.slug || product.nameEn.toLowerCase().replace(/\s+/g, "-")}`}>
                <h3 className="text-sm mb-1 group-hover:opacity-70 transition-opacity" style={{ color: "#2A1F23", fontWeight: 500, letterSpacing: "0.01em" }}>
                  {lang === "ru" ? product.nameRu : product.nameEn}
                </h3>
              </Link>
              <p className="text-sm" style={{ color: "#6E4C57" }}>{formatPrice(Number(product.price))}</p>
            </motion.article>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          className="mt-14 text-center md:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#shop"
            className="btn-secondary inline-flex items-center gap-3 px-10 py-4"
          >
            {t.products.viewCollection}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>

        {/* Desktop CTA — secondary, refined */}
        <motion.div
          className="mt-12 text-center hidden md:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#shop"
            className="btn-secondary inline-flex items-center gap-3 px-10 py-4"
          >
            {t.products.viewCollection}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
