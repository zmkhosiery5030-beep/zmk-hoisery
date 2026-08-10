import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import "./Insights.css";

export function Insights() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="section insights" id="insights" aria-labelledby="insights-title">
      <div className="container">
        <div className="insights-head">
          <p className="section-label">{t.insights.label}</p>
          <h2 className="section-title" id="insights-title">
            {t.insights.title}
          </h2>
          <p className="section-lead">{t.insights.lead}</p>
        </div>

        <div className="insights-grid">
          {t.insights.posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
