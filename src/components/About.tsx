import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import "./About.css";

const aboutImage = "/images/about-yarn.jpg";

export function About() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about-layout">
        <motion.div
          className="about-visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={aboutImage}
            alt="Yarn cones prepared for sock knitting at ZMK Hosiery"
            width={1600}
            height={1067}
            loading="lazy"
          />
        </motion.div>

        <div className="about-copy">
          <p className="section-label">{t.about.label}</p>
          <h2 className="section-title" id="about-title">
            {t.about.title}
          </h2>
          <p className="section-lead">{t.about.lead}</p>
          <p className="about-body">{t.about.body}</p>

          <dl className="about-stats">
            {t.about.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
