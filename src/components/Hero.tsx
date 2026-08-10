import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import "./Hero.css";

const heroImage = "/images/hero-machines.png";

export function Hero() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero-media" aria-hidden="true">
        <motion.img
          src={heroImage}
          alt=""
          initial={reduceMotion ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="hero-veil" />
      </div>

      <div className="container hero-content">
        <motion.p
          className="hero-brand"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {t.hero.brand}
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22 }}
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.36 }}
        >
          {t.hero.copy}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48 }}
        >
          <a className="btn btn-primary" href="#contact">
            {t.hero.ctaPrimary}
          </a>
          <a className="btn btn-ghost" href="#products">
            {t.hero.ctaSecondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
