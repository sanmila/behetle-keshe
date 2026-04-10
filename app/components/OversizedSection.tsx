"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function OversizedSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#FFF4F7" }}>
      {/* Full-bleed editorial image */}
      <div className="relative h-[70vh] md:h-[88vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <img
            src="/bottom-hero.webp"
            alt="Signature print collection"
            className="w-full h-[120%] object-cover object-top"
          />
        </motion.div>
        {/* Strong editorial overlay — left-to-right gradient for text legibility */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(255,251,252,0.92) 0%, rgba(255,251,252,0.6) 45%, rgba(255,251,252,0.1) 70%, transparent 100%)" }}/>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(255,251,252,0.5) 0%, transparent 25%)" }}/>
      </div>

      {/* Editorial text overlay — positioned left, anchored center */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <p className="text-[10px] tracking-[0.5em] uppercase mb-8" style={{ color: "#6E4C57" }}>
              Signature Print
            </p>

            {/* Dramatic editorial heading */}
            <h2
              className="font-display font-normal leading-[0.93] mb-8"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(56px,9vw,120px)",
                fontWeight: 400,
                color: "#2A1F23",
                maxWidth: "12ch",
              }}
            >
              Орнамент,
              <br />
              <em className="italic" style={{ fontFamily: "var(--font-cormorant)", color: "#B76E8A" }}>который</em>
              <br />
              помнит всё
            </h2>

            {/* Subtext — editorial copy */}
            <p className="text-sm md:text-base max-w-[38ch] leading-relaxed mb-10" style={{ color: "#2A1F23" }}>
              Дилара рисует каждый принт вручную — сначала на бумаге, потом на ткани.
              За каждым узором стоит история, имя, место.
            </p>

            {/* Strong CTA */}
            <a
              href="#shop"
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
              Смотреть принты
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
