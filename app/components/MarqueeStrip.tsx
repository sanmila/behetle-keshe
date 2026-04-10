"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const ITEMS = [
  "Ручная работа",
  "Уфа, Россия",
  "Татарские традиции",
  "Авторский дизайн",
  "Маленькие партии",
  "@dishatattoo",
  "Бәхетле кеше",
  "Создано с любовью",
  "Ручная работа",
  "Уфа, Россия",
  "Татарские традиции",
  "Авторский дизайн",
  "Маленькие партии",
  "@dishatattoo",
  "Бәхетле кеше",
  "Создано с любовью",
];

export default function MarqueeStrip() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="py-7 overflow-hidden"
      style={{
        backgroundColor: "#FBE7EF",
        borderTop: "1px solid #F1D5DE",
        borderBottom: "1px solid #F1D5DE",
      }}
      ref={ref}
    >
      <motion.div
        className="flex items-center gap-0 whitespace-nowrap"
        style={{ animation: "marquee 40s linear infinite" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {ITEMS.map((item, i) => (
          <span key={i} className="flex items-center gap-0">
            <span
              className="font-display text-lg font-light tracking-[0.12em] uppercase px-8"
              style={{ fontFamily: "var(--font-cormorant)", color: "#B76E8A", opacity: 0.55 }}
            >
              {item}
            </span>
            <span className="text-[#B76E8A] text-[10px] mx-2 opacity-50">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
