function formatPakistanPhone(whatsappNumber: string) {
  if (whatsappNumber.length === 12 && whatsappNumber.startsWith("92")) {
    return `+${whatsappNumber.slice(0, 2)} ${whatsappNumber.slice(2, 5)} ${whatsappNumber.slice(5)}`;
  }
  return `+${whatsappNumber}`;
}

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "923236605030";

export const siteConfig = {
  whatsappNumber,
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || "sales@zmkhosiery.com",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://zmkhosiery.com",
  phoneDisplay: formatPakistanPhone(whatsappNumber),
};

export function buildWhatsAppUrl(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}

export function buildMailtoUrl(subject: string, body: string) {
  return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
