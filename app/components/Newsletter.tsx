"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Введите корректный email");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="py-28 md:py-36 overflow-hidden relative" style={{ backgroundColor: "#FFFBFC" }}>
      {/* Decorative rose watermark — subtle */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.04]">
        <svg width="600" height="600" viewBox="0 0 200 200" fill="none">
          <path d="M100 10 C100 10 80 60 100 90 C120 60 100 10 100 10Z" fill="#B76E8A"/>
          <path d="M100 10 C100 10 40 50 40 90 C40 130 80 60 100 90 C120 60 160 130 160 90 C160 50 100 10 100 10Z" fill="#B76E8A" opacity="0.5"/>
          <circle cx="100" cy="100" r="18" fill="#B76E8A"/>
          <path d="M100 100 C100 100 60 80 50 100 C40 120 70 110 100 100" fill="#B76E8A" opacity="0.4"/>
          <path d="M100 100 C100 100 140 80 150 100 C160 120 130 110 100 100" fill="#B76E8A" opacity="0.4"/>
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <p className="text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: "#6E4C57" }}>
              Рассылка
            </p>

            {/* Heading — authoritative */}
            <h2
              className="mb-6 leading-[1.1]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(38px,5.5vw,68px)",
                fontWeight: 400,
                color: "#2A1F23",
              }}
            >
              Будьте частью
              <br />
              <em className="italic" style={{ fontFamily: "var(--font-cormorant)", color: "#B76E8A", fontWeight: 400 }}>нашей истории</em>
            </h2>

            {/* Subtext */}
            <p className="text-base leading-relaxed mb-10 max-w-[44ch]" style={{ color: "#2A1F23" }}>
              Подпишитесь — и узнайте первыми о новых принтах, ограниченных коллекциях
              и историях, которые за ними стоят.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B76E8A" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span className="text-base font-medium" style={{ color: "#B76E8A" }}>
                  Добро пожаловать! Скоро напишем.
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email input — refined, strong bottom border */}
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="Ваш email"
                    className="w-full bg-transparent text-sm text-[#2A1F23] placeholder:text-[#6E4C57]/40 focus:outline-none transition-colors duration-300 border-b pb-4"
                    style={{ borderColor: error ? "#E8635A" : "#F1D5DE" }}
                    onFocus={(e) => { e.target.style.borderBottomColor = "#B76E8A"; }}
                    onBlur={(e) => { e.target.style.borderBottomColor = error ? "#E8635A" : "#F1D5DE"; }}
                  />
                  <button
                    type="submit"
                    aria-label="Подписаться"
                    className="absolute right-0 top-0 p-2 transition-all duration-200 cursor-pointer active:scale-95"
                    style={{ color: "#B76E8A" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#9F5C75")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#B76E8A")}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
                {error && (
                  <p className="text-xs" style={{ color: "#E8635A" }}>{error}</p>
                )}
              </form>
            )}

            {/* Privacy note */}
            <p
              className="mt-5 text-[11px] italic"
              style={{ fontFamily: "var(--font-cormorant)", color: "#6E4C57", fontWeight: 300 }}
            >
              Мы не спамим. Только то, что важно.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
