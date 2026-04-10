import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import { Toaster } from "sonner";
import "./globals.css";
import ScrollProgress from "./components/ScrollProgress";
import AnnouncementBar from "./components/AnnouncementBar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bahetle.ru"),
  title: "Бәхетле кеше — Одежда счастливого человека | Уфа",
  description:
    "Татарский бренд одежды из Уфы. Авторские принты от Дилары — футболки, свитшоты, платки с татарскими орнаментами. История, вытканная из памяти.",
  openGraph: {
    title: "Бәхетле кеше — Татарская одежда",
    description:
      "Одежда, сотканная из памяти. Авторский дизайн. Ограниченные партии. Уфа.",
    images: ["/og-image.jpg"],
    locale: "ru_RU",
  },
  keywords: [
    "татарская одежда",
    "бэхетле кеше",
    "уфа",
    "татарские принты",
    "авторская одежда",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${dmSans.variable} ${cormorant.variable}`}>
        <I18nProvider>
          <ScrollProgress />
          <AnnouncementBar />
          {children}
        </I18nProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#2A1F23",
              color: "#fff",
              border: "1px solid #B76E8A",
              borderRadius: "12px",
              fontFamily: "var(--font-dm-sans, sans-serif)",
              fontSize: "13px",
            },
          }}
        />
      </body>
    </html>
  );
}