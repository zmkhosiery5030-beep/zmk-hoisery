import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import "./Products.css";

const images = [
  { src: "/images/samples/branded-ankle-jordan-text.png", sample: true },
  { src: "/images/samples/athletic-ankle-swoosh.png", sample: true },
  { src: "/images/diabetic-comfort.jpg", sample: false },
  { src: "/images/samples/kids-ankle-pack.png", sample: true },
  { src: "/images/samples/athletic-ankle-jumpman.png", sample: true },
  { src: "/images/samples/custom-graphic-crew.png", sample: true },
];

export function Products() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="section products" id="products" aria-labelledby="products-title">
      <div className="container">
        <div className="products-head">
          <div>
            <p className="section-label">{t.products.label}</p>
            <h2 className="section-title" id="products-title">
              {t.products.title}
            </h2>
          </div>
          <p className="section-lead">{t.products.lead}</p>
        </div>

        <div className="products-grid">
          {t.products.items.map((product, index) => {
            const image = images[index];
            return (
              <motion.a
                key={product.name}
                href="#contact"
                className={`product ${image.sample ? "is-sample" : ""}`}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <img
                  src={image.src}
                  alt={product.alt}
                  width={700}
                  height={500}
                  loading="lazy"
                />
                <div className="product-meta">
                  <h3>{product.name}</h3>
                  <p>{product.note}</p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
