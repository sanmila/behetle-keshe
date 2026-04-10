"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { useCartStore, selectCount } from "@/lib/cart-store";
import CartDrawer from "./CartDrawer";

const navLinks = [
  { key: "newArrivals", href: "#new-arrivals" },
  { key: "women", href: "#shop" },
  { key: "shop", href: "#shop" },
  { key: "about", href: "#about" },
];

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartCount = useCartStore(selectCount);
  const { refresh } = useCartStore();

  useEffect(() => {
    // Clear legacy localStorage cart from previous implementation
    localStorage.removeItem("bahetle-cart");
    refresh();
  }, [refresh]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Colors — authoritative in scrolled state
  const textColor = isHome ? (isScrolled ? "#2A1F23" : "#fff") : "#2A1F23";
  const mutedColor = isHome ? (isScrolled ? "#6E4C57" : "rgba(255,255,255,0.55)") : "#6E4C57";
  const saleColor = "#E8635A";
  const underlineColor = isHome ? (isScrolled ? "#B76E8A" : "#fff") : "#B76E8A";
  const bgClass = isHome
    ? (isScrolled ? "bg-[#FFFBFC]/98 backdrop-blur-md shadow-sm" : "bg-transparent")
    : "bg-[#FFFBFC] shadow-sm";
  const navBgStyle = isScrolled
    ? { boxShadow: "0 1px 20px rgba(42,31,35,0.06)" }
    : {};

  return (
    <>
      <motion.header
        className={`fixed top-[38px] left-0 right-0 z-[60] transition-all duration-300 ${bgClass}`}
        initial={false}
        style={navBgStyle}
      >
        <motion.nav
          className="relative z-10 h-full flex items-center max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-[1fr_auto_1fr] gap-4"
          style={{
            minHeight: isScrolled ? "60px" : "72px",
          }}
        >
          {/* Language Toggle */}
          <div className="flex items-center gap-2 justify-self-start min-w-0">
            <motion.button
              onClick={() => setLang("ru")}
              className="text-[12px] tracking-widest font-medium transition-all duration-300 cursor-pointer"
              style={{ color: textColor, opacity: lang === "ru" ? 1 : 0.4 }}
              whileHover={{ opacity: 0.75 }}
            >
              RU
            </motion.button>
            <span className="text-[11px]" style={{ color: mutedColor }}>
              │
            </span>
            <motion.button
              onClick={() => setLang("en")}
              className="text-[12px] tracking-widest font-medium transition-all duration-300 cursor-pointer"
              style={{ color: textColor, opacity: lang === "en" ? 1 : 0.4 }}
              whileHover={{ opacity: 0.75 }}
            >
              EN
            </motion.button>
          </div>

          {/* Logo */}
          <Link href="/" className="justify-self-center group inline-flex items-center gap-1.5 px-2">
            <span className="navbar-logo-heart text-[#B76E8A] text-sm">
              ♥
            </span>
            <Image
              loading="eager"
              priority
              src="/logo.png"
              alt="Бәхетле кеше"
              width={199}
              height={48}
              className="block object-contain transition-transform duration-300 group-hover:scale-105"
              style={{
                width: "clamp(150px,38vw,200px)",
                height: "auto",
                filter: isHome && !isScrolled
                  ? "brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
                  : "none",
              }}
            />
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-5 justify-self-end">
            <Link
              href="/account"
              aria-label="Account"
              className="hidden md:block cursor-pointer active:scale-95 transition-all duration-200"
              style={{ color: textColor }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
            <button
              aria-label="Cart"
              className="relative cursor-pointer active:scale-95 transition-all duration-200"
              onClick={() => setCartOpen(true)}
              style={{ color: textColor }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E8635A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: textColor }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                {menuOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <><path d="M4 6h16M4 12h16M4 18h16"/></>}
              </svg>
            </button>
          </div>
        </motion.nav>

        {/* Bottom nav links */}
        <div className="hidden md:flex justify-center">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="text-[11px] tracking-[0.22em] uppercase transition-colors relative group cursor-pointer font-medium"
                  style={{ color: textColor, textShadow: isHome && !isScrolled ? "0 1px 4px rgba(0,0,0,0.3)" : "" }}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: underlineColor }}
                  />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#shop"
                className="text-[11px] tracking-[0.22em] uppercase transition-colors font-medium cursor-pointer"
                style={{ color: saleColor, textShadow: isHome && !isScrolled ? "0 1px 3px rgba(0,0,0,0.2)" : "" }}
              >
                {t.nav.sale}
              </Link>
            </li>
          </ul>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center px-12"
            style={{ backgroundColor: "#FFFBFC" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-5 right-6 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A1F23" strokeWidth="1.5">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
            <nav className="flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  className="font-display text-5xl font-normal"
                  style={{ color: "#2A1F23" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </motion.a>
              ))}
              <motion.a
                href="#shop"
                className="font-display text-5xl font-normal"
                style={{ color: "#B76E8A" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.sale}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
