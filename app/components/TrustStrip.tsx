"use client";

import { motion } from "framer-motion";

const TRUST_ITEMS = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: "Доставка по России",
    sub: "От ₽5 000 бесплатно",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
      </svg>
    ),
    title: "Авторский дизайн",
    sub: "Каждый принт от Дилары",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
      </svg>
    ),
    title: "Возврат 14 дней",
    sub: "Без вопросов",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Поддержка в Telegram",
    sub: "@bahetlekeshe",
  },
];

export default function TrustStrip() {
  return (
    <div
      className="py-12 md:py-16"
      style={{
        backgroundColor: "#FFFBFC",
        borderTop: "1px solid #F1D5DE",
        borderBottom: "1px solid #F1D5DE",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {TRUST_ITEMS.map((item) => (
            <motion.div
              key={item.title}
              className="flex flex-col items-center text-center gap-3"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <div style={{ color: "#B76E8A" }}>{item.icon}</div>
              <div>
                <p className="text-sm font-medium mb-0.5" style={{ color: "#2A1F23" }}>{item.title}</p>
                <p className="text-xs" style={{ color: "#6E4C57" }}>{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
