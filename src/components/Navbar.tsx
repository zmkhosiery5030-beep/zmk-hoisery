import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import "./Navbar.css";

export function Navbar() {
  const { t, locale, toggleLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#products", label: t.nav.socks },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#capabilities", label: t.nav.capabilities },
    { href: "#insights", label: t.nav.insights },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-brand" aria-label="ZMK Hosiery home">
          <img
            className="nav-logo"
            src={scrolled ? "/logo.svg" : "/logo-light.svg"}
            alt=""
            width={120}
            height={46}
          />
          <span className="nav-wordmark">Hosiery</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="lang-toggle"
            onClick={toggleLocale}
            aria-label="Switch language"
          >
            {locale === "en" ? "اردو" : "EN"}
          </button>
          <a className="btn btn-primary nav-cta" href="#contact">
            {t.nav.quote}
          </a>
        </div>

        <button
          className={`nav-toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-drawer ${open ? "is-open" : ""}`}>
        <nav aria-label="Mobile">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <button type="button" className="lang-toggle drawer-lang" onClick={toggleLocale}>
            {locale === "en" ? "اردو" : "English"}
          </button>
          <a className="btn btn-primary" href="#contact" onClick={() => setOpen(false)}>
            {t.nav.quote}
          </a>
        </nav>
      </div>
    </header>
  );
}
