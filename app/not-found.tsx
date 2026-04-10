"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1C1814] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]">
        <p className="font-display font-light text-[#2D2620]" style={{ fontSize: "clamp(100px,20vw,280px)", letterSpacing: "0.1em" }}>
          БӘХЕТЛЕ
        </p>
      </div>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Flower logo */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mx-auto">
            <path d="M32 4 C32 4 20 24 32 40 C44 24 32 4 32 4Z" fill="#F8C8DC" opacity="0.3"/>
            <path d="M32 4 C32 4 10 24 10 40 C10 56 24 24 32 40 C40 24 54 56 54 40 C54 24 32 4 32 4Z" fill="#F8C8DC" opacity="0.15"/>
            <circle cx="32" cy="40" r="8" fill="#F8C8DC" opacity="0.2"/>
            <circle cx="32" cy="40" r="4" fill="#F8C8DC" opacity="0.35"/>
          </svg>
        </motion.div>

        {/* 404 */}
        <motion.h1
          className="mb-6"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(80px,18vw,200px)", fontWeight: 300, color: "rgba(248,200,220,0.12)", lineHeight: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 1 }}
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mb-4"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 300, color: "white", fontStyle: "italic", lineHeight: 1.5 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Эта страница, как некоторые вещи из коллекции — ушла навсегда.
        </motion.p>

        <motion.p
          className="text-white/30 text-sm mb-10"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Но у нас есть много других, которые ждут вас.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-[#F8C8DC] text-[#1C1814] px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-[#D4A0B8] transition-colors duration-300 cursor-pointer active:scale-95"
          >
            Вернуться в магазин
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Flower bottom decoration */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none" opacity="0.05">
          <path d="M60 5 C60 5 40 25 60 40 C80 25 60 5 60 5Z" fill="#F8C8DC"/>
          <path d="M60 5 C60 5 20 30 20 50 C50 25 60 40 80 25 C100 50 80 30 60 5Z" fill="#F8C8DC"/>
        </svg>
      </div>
    </div>
  );
}