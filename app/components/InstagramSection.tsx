"use client";

import { motion } from "framer-motion";

const INSTAGRAM_IMAGES = [
  "/products/Product 01/Young_woman_wearing_202604080916.jpeg",
  "/products/Product 03/Woman_wearing_oversized_202604080931.jpeg",
  "/products/product 09/Russian_woman_smiling_202604080958.jpeg",
  "/products/product 11/Young_woman_wearing_202604081026.jpeg",
  "/products/Product 08/Woman_wearing_oversized_202604080952.jpeg",
  "/products/product 10/Young_woman_touching_202604081023.jpeg",
];

export default function InstagramSection() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#FFF4F7" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "#6E4C57" }}>
            Сообщество
          </p>
          <h2
            className="mb-5"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(38px,5vw,68px)", fontWeight: 400, color: "#2A1F23", lineHeight: 1.1 }}
          >
            Бәхетле в жизни
          </h2>
          <p className="text-base max-w-[44ch] mx-auto leading-relaxed" style={{ color: "#2A1F23" }}>
            Наши вещи живут за пределами магазина.
            Каждый день — новая история.
          </p>
        </motion.div>

        {/* Image grid — premium grid with rounded corners */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {INSTAGRAM_IMAGES.map((src, i) => (
            <motion.a
              key={src}
              href="https://www.instagram.com/bahetle__keshe"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden aspect-square group cursor-pointer"
              style={{
                borderRadius: "16px",
                border: "1px solid #F1D5DE",
                backgroundColor: "#FBE7EF",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
              }}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 12px 32px -8px rgba(183,110,138,0.2)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "";
                el.style.boxShadow = "";
              }}
            >
              <img
                src={src}
                alt={`Бәхетле кеше community post ${i + 1}`}
                className="w-full h-full object-cover"
                style={{ transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: "rgba(183,110,138,0.5)" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA — strong primary button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://www.instagram.com/bahetle__keshe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300"
            style={{ backgroundColor: "#2A1F23", color: "#fff" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#B76E8A";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(183,110,138,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#2A1F23";
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            @bahetle__keshe в Instagram
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
