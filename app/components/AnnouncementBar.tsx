"use client";

const phrases = [
  "Бесплатная доставка по России от ₽5 000",
  "Авторские татарские принты · Дизайн от Дилары",
  "Бәхетле кеше — одежда счастливого человека",
  "Ручной труд · Маленькие партии · Большая душа",
];

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] text-[#2A1F23] h-[38px] overflow-hidden" style={{ backgroundColor: "#FBE7EF", borderBottom: "1px solid #F1D5DE" }}>
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-[#FBE7EF] z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-transparent to-[#FBE7EF] z-10 pointer-events-none" />
      <div
        className="flex items-center h-full marquee-track"
        style={{ animation: "marquee 60s linear infinite" }}
      >
        {[...phrases, ...phrases, ...phrases].map((msg, i) => (
          <span key={i} className="text-[11px] tracking-[0.18em] uppercase font-light whitespace-nowrap px-12" style={{ color: "rgba(42,31,35,0.45)" }}>
            {msg}
            <span className="mx-10 text-[#B76E8A]/30">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}