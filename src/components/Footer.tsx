import { useLanguage } from "../i18n/LanguageContext";
import "./Footer.css";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <img
            className="footer-logo"
            src="/logo-light.svg"
            alt="ZMK Hosiery"
            width={160}
            height={62}
          />
          <p className="footer-wordmark">Hosiery</p>
          <p className="footer-tag">{t.footer.tag}</p>
        </div>

        <div className="footer-links">
          <a href="#about">{t.nav.about}</a>
          <a href="#products">{t.nav.socks}</a>
          <a href="#gallery">{t.nav.gallery}</a>
          <a href="#capabilities">{t.nav.capabilities}</a>
          <a href="#insights">{t.nav.insights}</a>
          <a href="#faq">{t.nav.faq}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} ZMK Hosiery. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
