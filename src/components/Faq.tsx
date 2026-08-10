import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import "./Faq.css";

export function Faq() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div>
          <p className="section-label">{t.faq.label}</p>
          <h2 className="section-title" id="faq-title">
            {t.faq.title}
          </h2>
          <p className="section-lead">{t.faq.lead}</p>
        </div>

        <div className="faq-list">
          {t.faq.items.map((item, index) => {
            const open = openIndex === index;
            return (
              <motion.div
                key={item.q}
                className={`faq-item ${open ? "is-open" : ""}`}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && <p>{item.a}</p>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
