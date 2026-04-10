"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const stats = [
    { num: "106+", labelRu: "Авторских принтов", labelEn: "Original prints" },
    { num: "13.6K", labelRu: "Человек в сообществе", labelEn: "People in community" },
    { num: "100%", labelRu: "Ручной дизайн", labelEn: "Hand-drawn design" },
    { num: "1", labelRu: "История, начавшаяся с любви", labelEn: "Story born from love" },
  ];

  const marqueeItems = [
    "Память", "Традиция", "Татарская культура", "Ручной труд",
    "Малые партии", "Осознанность", "Любовь",
    "Память", "Традиция", "Татарская культура", "Ручной труд",
    "Малые партии", "Осознанность", "Любовь",
  ];

  return (
    <section id="about" ref={ref} className="relative">
      {/* Editorial content block */}
      <div className="py-24 md:py-44" style={{ backgroundColor: "#FFFBFC" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-center">
            {/* Text column */}
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9 }}
            >
              {/* Eyebrow */}
              <p className="text-[10px] tracking-[0.4em] uppercase mb-8" style={{ color: "#6E4C57" }}>
                Наша история
              </p>

              {/* Heading — authoritative */}
              <h2
                className="font-display font-normal leading-[1.05] mb-10"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(40px,5.5vw,72px)", fontWeight: 400, color: "#2A1F23" }}
              >
                Искусство помнить
              </h2>

              {/* Body — stronger contrast */}
              <div className="space-y-6 text-base leading-[1.95] max-w-[46ch]" style={{ color: "#2A1F23" }}>
                <p>
                  Бренд Бәхетле кеше появился не в мастерской и не на подиуме.
                  Он появился в тишине после потери. Дилара потеряла бабушку — женщину,
                  которая шила, вышивала и хранила татарские орнаменты как живую память.
                </p>
                <p>
                  Вместо того чтобы забыть, она решила сохранить. Первые принты были
                  нарисованы по памяти — по лоскуткам ткани, по фотографиям, по рукам,
                  которые она ещё помнит. Так родился бренд, имя которого переводится просто:
                  счастливый человек.
                </p>
              </div>

              {/* Stats grid */}
              <motion.div
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {stats.map((stat) => (
                  <div key={stat.labelRu}>
                    <p
                      className="mb-3"
                      style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.4rem", color: "#B76E8A", fontWeight: 400 }}
                    >
                      {stat.num}
                    </p>
                    <p className="text-[10px] tracking-[0.2em] uppercase leading-relaxed" style={{ color: "#6E4C57" }}>
                      {stat.labelRu}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image column — editorial treatment */}
            <motion.div
              className="order-1 md:order-2 relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              {/* Main image — premium card */}
              <div
                className="relative overflow-hidden"
                style={{
                  backgroundColor: "#FBE7EF",
                  aspectRatio: "4/5",
                  borderRadius: "24px",
                  border: "1px solid #F1D5DE",
                  boxShadow: "0 8px 32px rgba(42,31,35,0.06)",
                }}
              >
                <motion.img
                  src="/founder.webp"
                  alt="Founder portrait"
                  className="absolute inset-x-0 -top-[60px] h-[calc(100%+120px)] w-full object-cover"
                  style={{ y: imageY }}
                />
              </div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* Values marquee — strong rose band */}
      <div className="py-8 overflow-hidden" style={{ backgroundColor: "#B76E8A" }}>
        <div className="flex items-center gap-0 whitespace-nowrap" style={{ animation: "marquee 40s linear infinite" }}>
          {marqueeItems.map((word, i) => (
            <span key={i} className="flex items-center">
              <span
                className="font-display text-xl font-light px-8"
                style={{ fontFamily: "var(--font-cormorant)", color: "#FFFBFC", opacity: 0.3 }}
              >
                {word}
              </span>
              {i < marqueeItems.length - 1 && (
                <span className="text-white/20 text-xs mx-2">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
