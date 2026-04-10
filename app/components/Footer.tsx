"use client";

import { useI18n } from "@/lib/i18n";

const footerColumns = [
  {
    headingEn: "Shop",
    headingRu: "Магазин",
    linksRu: ["Новинки", "Женщинам", "Верхняя одежда", "Аксессуары"],
    linksEn: ["New Arrivals", "Women", "Outerwear", "Accessories"],
    hrefs: ["/#new-arrivals", "/#shop", "/#shop", "/#shop"],
  },
  {
    headingEn: "About",
    headingRu: "О бренде",
    linksRu: ["Наша история", "Дилара", "Сообщество", "Пресса"],
    linksEn: ["Our Story", "Dilara", "Community", "Press"],
    hrefs: ["/#about", "/#about", "/#about", "/#about"],
  },
  {
    headingEn: "Help",
    headingRu: "Помощь",
    linksRu: ["Доставка", "Возврат", "Размеры", "Контакты"],
    linksEn: ["Shipping", "Returns", "Sizing", "Contact"],
    hrefs: ["#", "#", "#", "#"],
  },
];

export default function Footer() {
  const { lang } = useI18n();

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#8C4F65" }}>
      {/* Large watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <p
          className="font-display font-light leading-none whitespace-nowrap opacity-[0.06]"
          style={{ fontSize: "clamp(80px, 14vw, 240px)", letterSpacing: "0.1em", color: "#FFFBFC", fontFamily: "var(--font-cormorant)" }}
        >
          БӘХЕТЛЕ КЕШЕ
        </p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Logo & tagline column */}
          <div className="md:col-span-1" style={{ borderRight: "1px solid rgba(255,251,252,0.1)", paddingRight: "2rem" }}>
            {/* Logo — white inverted */}
            <img
              src="/logo.png"
              alt="Бәхетле кеше"
              className="h-10 object-contain mb-5"
              style={{ filter: "brightness(0) invert(1)" }}
            />

            {/* Tagline */}
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontStyle: "italic", fontSize: "15px", color: "rgba(255,251,252,0.5)" }}
            >
              Бәхетле кеше — одежда счастливого человека.
              <br />
              Из Уфы — с любовью к татарской культуре.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/bahetle__keshe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-all duration-200 cursor-pointer"
                style={{ color: "rgba(255,251,252,0.35)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,251,252,0.75)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,251,252,0.35)"; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://t.me/bahetlekeshe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="transition-all duration-200 cursor-pointer"
                style={{ color: "rgba(255,251,252,0.35)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,251,252,0.75)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,251,252,0.35)"; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerColumns.map((col) => (
              <div key={col.headingEn}>
                {/* Column heading — brighter */}
                <p className="text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: "rgba(255,251,252,0.5)", fontWeight: 500 }}>
                  {lang === "ru" ? col.headingRu : col.headingEn}
                </p>
                <ul className="space-y-3">
                  {(lang === "ru" ? col.linksRu : col.linksEn).map((link, i) => (
                    <li key={link}>
                      <a
                        href={col.hrefs ? col.hrefs[i] : "#"}
                        className="text-sm transition-all duration-200 cursor-pointer"
                        style={{ color: "rgba(255,251,252,0.65)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,251,252,0.95)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,251,252,0.65)"; }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Emotional tagline */}
        <p
          className="text-center text-[12px] mb-8 italic"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, color: "rgba(255,251,252,0.3)" }}
        >
          Создано с памятью о бабушке. С любовью к татарскому народу.
        </p>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(255,251,252,0.08)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,251,252,0.3)" }}>
            © 2026 Бәхетле кеше. Все права защищены.
          </p>
          <div className="flex items-center gap-6 text-xs" style={{ color: "rgba(255,251,252,0.3)" }}>
            <a
              href="#"
              className="transition-all cursor-pointer"
              style={{ color: "rgba(255,251,252,0.3)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,251,252,0.6)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,251,252,0.3)"; }}
            >
              Политика конфиденциальности
            </a>
            <a
              href="#"
              className="transition-all cursor-pointer"
              style={{ color: "rgba(255,251,252,0.3)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,251,252,0.6)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,251,252,0.3)"; }}
            >
              Условия
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
