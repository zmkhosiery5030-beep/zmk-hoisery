import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import "./StickyCta.css";

export function StickyCta() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-cta ${visible ? "is-visible" : ""}`}>
      <span>{t.sticky.label}</span>
      <a className="btn btn-primary" href="#contact">
        {t.sticky.cta}
      </a>
    </div>
  );
}
