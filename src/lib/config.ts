function formatPakistanPhone(whatsappNumber: string) {
  const digits = whatsappNumber.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("92")) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }
  return `+${digits}`;
}

function normalizeWhatsAppNumber(value: string) {
  return value.replace(/\D/g, "");
}

const primaryNumber = normalizeWhatsAppNumber(
  import.meta.env.VITE_WHATSAPP_NUMBER || "923236605030",
);
const secondaryNumber = normalizeWhatsAppNumber(
  import.meta.env.VITE_WHATSAPP_NUMBER_2 || "923008072074",
);

export const siteConfig = {
  whatsappNumber: primaryNumber,
  whatsappNumberSecondary: secondaryNumber,
  phones: [
    {
      id: "sales-1",
      number: primaryNumber,
      display: formatPakistanPhone(primaryNumber),
      labelEn: "Sales line 1",
      labelUr: "سیلز لائن 1",
    },
    {
      id: "sales-2",
      number: secondaryNumber,
      display: formatPakistanPhone(secondaryNumber),
      labelEn: "Sales line 2",
      labelUr: "سیلز لائن 2",
    },
  ],
  contactEmail:
    import.meta.env.VITE_CONTACT_EMAIL || "zmkhosiery5030@gmail.com",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://zmkhosiery.com",
  phoneDisplay: formatPakistanPhone(primaryNumber),
};

export function buildWhatsAppUrl(message: string, number = siteConfig.whatsappNumber) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${normalizeWhatsAppNumber(number)}?text=${text}`;
}

export function buildMailtoUrl(subject: string, body: string) {
  return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
