import { useEffect, useState } from "react";
import { buildWhatsAppUrl, siteConfig } from "../lib/config";
import { useLanguage } from "../i18n/LanguageContext";
import "./WhatsAppButton.css";

export function WhatsAppButton() {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="whatsapp-widget">
      {open && (
        <div className="whatsapp-chooser" role="dialog" aria-label={t.whatsapp.chooseTitle}>
          <p>{t.whatsapp.chooseTitle}</p>
          <div className="whatsapp-chooser-list">
            {siteConfig.phones.map((phone) => (
              <a
                key={phone.id}
                href={buildWhatsAppUrl(t.whatsapp.prefill, phone.number)}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                <strong>{locale === "ur" ? phone.labelUr : phone.labelEn}</strong>
                <span>{phone.display}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        className="whatsapp-fab"
        aria-label={t.whatsapp.label}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.01 3C9.39 3 4 8.34 4 14.9c0 2.1.56 4.14 1.63 5.95L4 29l8.36-2.18A12.1 12.1 0 0 0 16 26.8c6.62 0 12-5.34 12-11.9C28 8.34 22.63 3 16.01 3zm6.93 16.86c-.3.84-1.74 1.54-2.4 1.64-.62.1-1.4.14-2.26-.14-.52-.17-1.19-.39-2.05-.76-3.6-1.56-5.95-5.2-6.13-5.44-.18-.24-1.48-1.96-1.48-3.74s.94-2.66 1.27-3.02c.33-.36.72-.45.96-.45h.69c.22 0 .51-.08.8.61.3.72 1.02 2.5 1.11 2.68.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.36.37-.15.72.21.36.94 1.55 2.02 2.51 1.39 1.23 2.56 1.61 2.92 1.79.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.33.12 2.08 1 2.44 1.17.36.18.6.27.69.42.09.15.09.87-.21 1.71z"
          />
        </svg>
      </button>
    </div>
  );
}
