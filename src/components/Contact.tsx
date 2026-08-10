import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { buildWhatsAppUrl, siteConfig } from "../lib/config";
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

type SubmitState = "idle" | "sending" | "success" | "error";

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
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (status !== "idle" && status !== "sending") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const raw = await response.text();
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = JSON.parse(raw) as { ok?: boolean; error?: string };
      } catch {
        setStatus("error");
        setErrorMessage(t.contact.error);
        return;
      }

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error || t.contact.error);
        return;
      }

      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setErrorMessage(t.contact.error);
    }
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
              {siteConfig.phones.map((phone) => (
                <p key={phone.id}>
                  <a href={`tel:+${phone.number}`}>{phone.display}</a>
                </p>
              ))}
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
          onSubmit={handleSubmit}
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

          <button
            className="btn btn-dark full"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? t.contact.sending : t.contact.submit}
          </button>

          {status === "success" && (
            <div className="contact-send-actions full">
              <p className="form-note">{t.contact.success}</p>
              <p className="form-note">{t.whatsapp.chooseTitle}</p>
              <div className="contact-send-buttons">
                {siteConfig.phones.map((phone) => (
                  <a
                    key={phone.id}
                    className="btn btn-outline"
                    href={buildWhatsAppUrl(t.whatsapp.prefill, phone.number)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.contact.whatsappSend} {phone.display}
                  </a>
                ))}
              </div>
            </div>
          )}

          {status === "error" && (
            <p className="form-error full">{errorMessage || t.contact.error}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
