import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import "./Gallery.css";

const images = [
  {
    src: "/images/samples/custom-graphic-crew.png",
    altEn: "ZMK custom graphic crew sock sample",
  },
  {
    src: "/images/samples/kids-ankle-pack.png",
    altEn: "ZMK kids ankle socks pack sample",
  },
  {
    src: "/images/samples/branded-ankle-jordan-text.png",
    altEn: "ZMK branded ankle socks sample",
  },
  {
    src: "/images/samples/athletic-ankle-swoosh.png",
    altEn: "ZMK athletic ankle socks sample",
  },
  {
    src: "/images/samples/athletic-ankle-jumpman.png",
    altEn: "ZMK sports ankle socks sample",
  },
  {
    src: "/images/gallery-3.jpg",
    altEn: "Yarn cones prepared for sock knitting",
  },
];

export function Gallery() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="section gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="gallery-head">
          <p className="section-label">{t.gallery.label}</p>
          <h2 className="section-title" id="gallery-title">
            {t.gallery.title}
          </h2>
          <p className="section-lead">{t.gallery.lead}</p>
        </div>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <motion.figure
              key={image.src}
              className={index < 5 ? "is-sample" : undefined}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <img
                src={image.src}
                alt={image.altEn}
                loading="lazy"
                width={700}
                height={500}
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
