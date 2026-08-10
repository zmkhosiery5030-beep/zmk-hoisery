import { useLanguage } from "../i18n/LanguageContext";
import "./SeoPillar.css";

export function SeoPillar() {
  const { t } = useLanguage();

  return (
    <section className="section seo-pillar" id="manufacturing" aria-labelledby="seo-pillar-title">
      <div className="container seo-pillar-layout">
        <div>
          <p className="section-label">{t.seo.label}</p>
          <h2 className="section-title" id="seo-pillar-title">
            {t.seo.title}
          </h2>
          <p className="section-lead">{t.seo.lead}</p>
        </div>

        <div className="seo-pillar-copy">
          {t.seo.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul>
            {t.seo.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p>
            <a href="#contact">{t.seo.cta}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
