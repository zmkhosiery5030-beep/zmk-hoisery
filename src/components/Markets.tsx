import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import "./Markets.css";

export function Markets() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const markets = [
    { title: t.markets.exportTitle, copy: t.markets.exportCopy },
    { title: t.markets.localTitle, copy: t.markets.localCopy },
  ];

  return (
    <section className="section markets" aria-labelledby="markets-title">
      <div className="container markets-grid">
        <div>
          <p className="section-label">{t.markets.label}</p>
          <h2 className="section-title" id="markets-title">
            {t.markets.title}
          </h2>
          <p className="section-lead">{t.markets.lead}</p>
        </div>

        <div className="markets-list">
          {markets.map((item, index) => (
            <motion.article
              key={item.title}
              className="market-item"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="container markets-map">
        <p className="markets-map-label">{t.markets.mapLabel}</p>
        <ul>
          {t.markets.regions.map((region, index) => (
            <motion.li
              key={region}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {region}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
