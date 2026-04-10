"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      {/* Hero — unified editorial surface */}
      <section
        className="relative min-h-screen pt-[38px] overflow-hidden"
        style={{
          background: "linear-gradient(100deg, #FFFBFC 0%, #FFFBFC 50%, rgba(255,244,247,0.85) 100%)",
        }}
      >
        {/* Atmospheric tamga watermark */}
        <div
          className="absolute pointer-events-none select-none z-0"
          style={{ top: "5%", right: "4%", opacity: 0.045 }}
        >
          <svg width="240" height="240" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="31" stroke="#B76E8A" strokeWidth="0.5"/>
            <path d="M32 8 L38 22 L32 18 L26 22 Z" fill="#B76E8A"/>
            <path d="M32 56 L26 42 L32 46 L38 42 Z" fill="#B76E8A"/>
            <path d="M8 32 L22 26 L18 32 L22 38 Z" fill="#B76E8A"/>
            <path d="M56 32 L42 38 L46 32 L42 26 Z" fill="#B76E8A"/>
            <circle cx="32" cy="32" r="4" fill="#B76E8A"/>
          </svg>
        </div>

        {/* Main editorial layout */}
        <div className="relative z-10 flex min-h-[calc(100vh-38px)]">
          {/* LEFT — Typography */}
          <div className="flex flex-col justify-center w-1/2 px-8 md:px-16 lg:px-20 py-20 md:py-24">
            <div className="max-w-md">
              {/* Eyebrow */}
              <motion.p
                className="text-[10px] tracking-[0.3em] uppercase mb-8"
                style={{ color: "#6E4C57" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Уфа, Россия · Основана в 2024
              </motion.p>

              {/* Headline */}
              <motion.h1
                className="font-display font-normal leading-[0.87]"
                style={{ fontSize: "clamp(48px, 6.5vw, 100px)", color: "#2A1F23", fontWeight: 400 }}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9 }}
              >
                <div>ТАТАРСКИЕ</div>
                <div className="italic" style={{ color: "#B76E8A" }}>традиции</div>
                <div>В КАЖДОЙ НИТИ</div>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                className="font-display text-xl md:text-2xl font-light max-w-[360px] leading-relaxed mt-10"
                style={{ color: "#6E4C57" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.7 }}
              >
                Одежда, сотканная из памяти.
                <br />
                Создано после потери. Создано с любовью.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="mt-14 flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <Link
                  href="#shop"
                  className="inline-flex items-center gap-4 px-10 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300"
                  style={{ backgroundColor: "#B76E8A", color: "#fff" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#9F5C75";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(183,110,138,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#B76E8A";
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  Смотреть коллекцию
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>

                <a
                  href="#about"
                  className="text-[11px] tracking-[0.15em] uppercase transition-all duration-200"
                  style={{ color: "#6E4C57", borderBottom: "1px solid #F1D5DE", paddingBottom: "2px" }}
                >
                  О бренде
                </a>
              </motion.div>
            </div>
          </div>

          {/* RIGHT — Illustration composition */}
          <div className="relative w-1/2 flex items-center justify-center overflow-hidden">
            {/* Large ambient glow — soft radial depth behind the card */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "90%",
                height: "85%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(ellipse, rgba(251,231,239,0.7) 0%, rgba(251,231,239,0.3) 50%, transparent 75%)",
                borderRadius: "40px",
              }}
            />

            {/* Illustration card — large, centered, prominent */}
            <div
              className="relative z-10"
              style={{
                width: "min(520px, 50vw)",
                borderRadius: "24px",
                backgroundColor: "#FBE7EF",
                boxShadow: "0 24px 64px -24px rgba(183,110,138,0.2), 0 8px 24px -8px rgba(183,110,138,0.1)",
                aspectRatio: "3 / 4",
              }}
            >
              <Image
                src="/hero-illustration.webp"
                alt="Бәхетле кеше — иллюстрация"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 hidden md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, transparent, #F1D5DE, transparent)" }}/>
          <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "#F1D5DE" }}>
            Scroll
          </span>
        </motion.div>
      </section>
    </>
  );
}
