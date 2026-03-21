import { createContext, useContext, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "sova:lang";
const DEFAULT_LANGUAGE = "uk";
const SUPPORTED_LANGUAGES = new Set(["uk", "en"]);

const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
});

const getInitialLanguage = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  if (storedLanguage && SUPPORTED_LANGUAGES.has(storedLanguage)) {
    return storedLanguage;
  }

  return DEFAULT_LANGUAGE;
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);
  const animationTimeoutRef = useRef(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => () => {
    if (animationTimeoutRef.current) {
      window.clearTimeout(animationTimeoutRef.current);
    }
    document.body.classList.remove("language-switching");
  }, []);

  const setLanguage = (nextLanguage) => {
    if (!SUPPORTED_LANGUAGES.has(nextLanguage) || nextLanguage === language) return;

    if (animationTimeoutRef.current) {
      window.clearTimeout(animationTimeoutRef.current);
    }

    const applyLanguage = () => {
      setLanguageState(nextLanguage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (typeof document !== "undefined" && typeof document.startViewTransition === "function") {
      document.startViewTransition(() => {
        applyLanguage();
      });
      return;
    }

    document.body.classList.remove("language-switching");
    void document.body.offsetWidth;
    document.body.classList.add("language-switching");
    applyLanguage();

    animationTimeoutRef.current = window.setTimeout(() => {
      document.body.classList.remove("language-switching");
      animationTimeoutRef.current = null;
    }, 320);
  };

  const value = {
    language,
    setLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
