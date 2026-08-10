import { useMemo, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { buildMailtoUrl, buildWhatsAppUrl, siteConfig } from "../lib/config";
import { useLanguage } from "../i18n/LanguageContext";
import "./Contact.css";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  market: string;
  sockType: string;
  quantity: string;
  destination: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  market: "export",
  sockType: "custom",
  quantity: "",
  destination: "",
  message: "",
};

export function Contact() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialForm);
  const [ready, setReady] = useState(false);

  const inquiryText = useMemo(() => {
    const marketLabel =
      t.contact.marketOptions[form.market as keyof typeof t.contact.marketOptions] ||
      form.market;
    const sockLabel =
      t.contact.sockOptions[form.sockType as keyof typeof t.contact.sockOptions] ||
      form.sockType;

    return [
      "New sock inquiry from ZMK website",
      `Name: ${form.name}`,
      `Company: ${form.company || "-"}`,
      `Email: ${form.email}`,
      `Phone/WhatsApp: ${form.phone || "-"}`,
      `Market: ${marketLabel}`,
      `Sock type: ${sockLabel}`,
      `Quantity: ${form.quantity || "-"}`,
      `Destination: ${form.destination || "-"}`,
      `Message: ${form.message}`,
    ].join("\n");
  }, [form, t]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setReady(false);
  }

  function handlePrepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReady(true);
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-layout">
        <div>
          <p className="section-label">{t.contact.label}</p>
          <h2 className="section-title" id="contact-title">
            {t.contact.title}
          </h2>
          <p className="section-lead">{t.contact.lead}</p>

          <div className="contact-details">
            <div>
              <h3>{t.contact.office}</h3>
              <p>{t.contact.officeValue}</p>
            </div>
            <div>
              <h3>{t.contact.sales}</h3>
              <p>
                <a href={`tel:+${siteConfig.whatsappNumber}`}>{siteConfig.phoneDisplay}</a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
              </p>
            </div>
            <div>
              <h3>{t.contact.production}</h3>
              <p>{t.contact.productionValue}</p>
            </div>
          </div>
        </div>

        <motion.form
          className="contact-form"
          onSubmit={handlePrepare}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <label>
            {t.contact.name}
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder={t.contact.placeholders.name}
            />
          </label>
          <label>
            {t.contact.company}
            <input
              name="company"
              type="text"
              value={form.company}
              onChange={(event) => updateField("company", event.target.value)}
              placeholder={t.contact.placeholders.company}
            />
          </label>
          <label>
            {t.contact.email}
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder={t.contact.placeholders.email}
            />
          </label>
          <label>
            {t.contact.phone}
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder={t.contact.placeholders.phone}
            />
          </label>
          <label>
            {t.contact.market}
            <select
              name="market"
              value={form.market}
              onChange={(event) => updateField("market", event.target.value)}
            >
              <option value="export">{t.contact.marketOptions.export}</option>
              <option value="local">{t.contact.marketOptions.local}</option>
              <option value="both">{t.contact.marketOptions.both}</option>
            </select>
          </label>
          <label>
            {t.contact.sockType}
            <select
              name="sockType"
              value={form.sockType}
              onChange={(event) => updateField("sockType", event.target.value)}
            >
              {Object.entries(t.contact.sockOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t.contact.quantity}
            <input
              name="quantity"
              type="text"
              value={form.quantity}
              onChange={(event) => updateField("quantity", event.target.value)}
              placeholder={t.contact.placeholders.quantity}
            />
          </label>
          <label>
            {t.contact.destination}
            <input
              name="destination"
              type="text"
              value={form.destination}
              onChange={(event) => updateField("destination", event.target.value)}
              placeholder={t.contact.placeholders.destination}
            />
          </label>
          <label className="full">
            {t.contact.message}
            <textarea
              name="message"
              rows={4}
              required
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder={t.contact.placeholders.message}
            />
          </label>

          <button className="btn btn-dark full" type="submit">
            {ready ? t.contact.submitted : t.contact.submit}
          </button>

          {ready && (
            <div className="contact-send-actions full">
              <p className="form-note">{t.contact.note}</p>
              <div className="contact-send-buttons">
                <a
                  className="btn btn-primary"
                  href={buildWhatsAppUrl(inquiryText)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.contact.whatsappSend}
                </a>
                <a
                  className="btn btn-outline"
                  href={buildMailtoUrl("ZMK Hosiery sock inquiry", inquiryText)}
                >
                  {t.contact.emailSend}
                </a>
              </div>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
