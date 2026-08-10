import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Dictionary, type Locale } from "./translations";

type LanguageContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "zmk-locale";

function readInitialLocale(): Locale {
  const params = new URLSearchParams(window.location.search);
  if (params.get("lang") === "ur") return "ur";
  if (params.get("lang") === "en") return "en";
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "ur" ? "ur" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "ur" ? "ur" : "en";
    document.documentElement.dir = locale === "ur" ? "rtl" : "ltr";
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      t: translations[locale],
      setLocale: (next) => {
        setLocaleState(next);
        const url = new URL(window.location.href);
        url.searchParams.set("lang", next);
        window.history.replaceState({}, "", url);
      },
      toggleLocale: () => {
        setLocaleState((current) => {
          const next = current === "en" ? "ur" : "en";
          const url = new URL(window.location.href);
          url.searchParams.set("lang", next);
          window.history.replaceState({}, "", url);
          return next;
        });
      },
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
