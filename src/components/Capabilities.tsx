import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import "./Capabilities.css";

export function Capabilities() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="section capabilities"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="container">
        <div className="capabilities-head">
          <p className="section-label">{t.capabilities.label}</p>
          <h2 className="section-title" id="capabilities-title">
            {t.capabilities.title}
          </h2>
          <p className="section-lead">{t.capabilities.lead}</p>
          <a className="btn btn-outline capabilities-download" href="/capability-sheet.html" target="_blank" rel="noreferrer">
            {t.capabilities.download}
          </a>
        </div>

        <div className="capabilities-list">
          {t.capabilities.items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
