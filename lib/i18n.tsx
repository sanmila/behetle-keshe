"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import ru from "./i18n/ru.json";
import en from "./i18n/en.json";

type Lang = "ru" | "en";
type Translations = typeof ru;

const translations: Record<Lang, Translations> = { ru, en };

interface I18nContextType {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextType>({
  lang: "ru",
  t: ru,
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") {
      return "ru";
    }

    const stored = localStorage.getItem("lang");
    return stored === "ru" || stored === "en" ? stored : "ru";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.cookie = `lang=${l}; path=/; max-age=${60 * 60 * 24 * 365}`;
  };

  return (
    <I18nContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
