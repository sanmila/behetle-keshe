"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineX = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);

  return (
    <section ref={ref} className="py-28 md:py-40 overflow-hidden" style={{ backgroundColor: "#FFF4F7" }}>
      {/* Decorative horizontal line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(183,110,138,0.18), transparent)",
          x: lineX,
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Main quote — more authoritative */}
        <div className="text-center max-w-[820px] mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-10" style={{ color: "#6E4C57" }}>
              Основана в Уфе, 2024
            </p>

            {/* Large Tatar tamga decorative mark */}
            <div className="flex justify-center mb-14">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="31" stroke="#B76E8A" strokeWidth="0.5" opacity="0.3"/>
                <path d="M32 8 L38 22 L32 18 L26 22 Z" fill="#B76E8A" opacity="0.25"/>
                <path d="M32 56 L26 42 L32 46 L38 42 Z" fill="#B76E8A" opacity="0.25"/>
                <path d="M8 32 L22 26 L18 32 L22 38 Z" fill="#B76E8A" opacity="0.25"/>
                <path d="M56 32 L42 38 L46 32 L42 26 Z" fill="#B76E8A" opacity="0.25"/>
                <circle cx="32" cy="32" r="4" fill="#B76E8A" opacity="0.2"/>
              </svg>
            </div>

            {/* Heading — stronger contrast, rose only on emphasis word */}
            <h2
              className="font-display font-normal leading-[1.1]"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(36px,5.5vw,68px)", fontWeight: 400, color: "#2A1F23" }}
            >
              После потери — рождается
              <br />
              <span className="italic" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, color: "#B76E8A" }}>
                нечто большее
              </span>
            </h2>

            {/* Body — stronger contrast */}
            <p className="text-base md:text-lg leading-[1.9] max-w-[55ch] mx-auto" style={{ color: "#2A1F23" }}>
              Бәхетле кеше — это не просто одежда. Это дань памяти бабушке Дилары.
              Каждый принт — разговор с ней. Каждая нить — продолжение любви, которая не закончилась.
            </p>
          </motion.div>
        </div>

        {/* Three pillars — stronger visual authority */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-0"
          style={{ borderTop: "2px solid #F1D5DE", borderBottom: "2px solid #F1D5DE" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            {
              tatar: "Хәтер",
              russian: "Память",
              desc: "Каждый дизайн создан в честь тех, кого мы любили и потеряли",
            },
            {
              tatar: "Мөхәббәт",
              russian: "Любовь",
              desc: "Ручной труд и внимание к деталям в каждой вещи",
            },
            {
              tatar: "Билге",
              russian: "Идентичность",
              desc: "Татарские традиции, вплетённые в современную моду",
            },
          ].map((item, i) => (
            <div
              key={item.tatar}
              className="py-14 px-8 md:px-12 text-center"
              style={{
                borderRight: i < 2 ? "2px solid #F1D5DE" : "none",
              }}
            >
              <p
                className="italic mb-2"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", color: "#B76E8A", opacity: 0.4 }}
              >
                {item.tatar}
              </p>
              <p className="text-[11px] tracking-[0.3em] uppercase mb-5" style={{ color: "#B76E8A", fontWeight: 500 }}>
                {item.russian}
              </p>
              <p className="text-sm leading-relaxed max-w-[26ch] mx-auto" style={{ color: "#2A1F23" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Designer credit */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase" style={{ color: "#6E4C57" }}>
            Все иллюстрации — @dishatattoo · Дизайнер — Дилара
          </p>
        </motion.div>
      </div>
    </section>
  );
}
