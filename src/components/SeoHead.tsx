import { useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { siteConfig } from "../lib/config";

const PRODUCT_IMAGES = [
  `${siteConfig.siteUrl}/images/samples/branded-ankle-jordan-text.png`,
  `${siteConfig.siteUrl}/images/samples/athletic-ankle-swoosh.png`,
  `${siteConfig.siteUrl}/images/diabetic-comfort.jpg`,
  `${siteConfig.siteUrl}/images/samples/kids-ankle-pack.png`,
  `${siteConfig.siteUrl}/images/samples/athletic-ankle-jumpman.png`,
  `${siteConfig.siteUrl}/images/samples/custom-graphic-crew.png`,
];

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertJsonLd(id: string, data: unknown) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function SeoHead() {
  const { locale, t } = useLanguage();

  useEffect(() => {
    const title =
      locale === "ur"
        ? "فیصل آباد پاکستان میں جراب مینوفیکچرر | ZMK Hosiery"
        : "Socks Manufacturer in Faisalabad, Pakistan | ZMK Hosiery Export & Private Label";

    const description =
      locale === "ur"
        ? "ZMK Hosiery فیصل آباد میں جراب مینوفیکچرر اور ایکسپورٹر ہے۔ کسٹم، پرائیویٹ لیبل، اسپورٹس، ذیابیطس، بچوں اور ہول سیل جرابیں۔ رابطہ +92 323 6605030 یا +92 300 8072074۔"
        : "ZMK Hosiery is a socks manufacturer and exporter in Faisalabad, Pakistan. Custom, private label, sports, diabetic, kids, and wholesale socks for global buyers and local markets. Call +92 323 6605030 or +92 300 8072074.";

    document.title = title;
    document.documentElement.lang = locale === "ur" ? "ur" : "en";
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:locale", locale === "ur" ? "ur_PK" : "en_PK");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    upsertJsonLd("faq-schema", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    });

    upsertJsonLd("product-schema", {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "ZMK Hosiery sock range",
      numberOfItems: t.products.items.length,
      itemListElement: t.products.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: item.name,
          description: item.note,
          image: PRODUCT_IMAGES[index],
          brand: {
            "@type": "Brand",
            name: "ZMK Hosiery",
          },
          manufacturer: {
            "@type": "Organization",
            name: "ZMK Hosiery",
            url: siteConfig.siteUrl,
          },
          category: "Socks",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            url: `${siteConfig.siteUrl}/#contact`,
            priceCurrency: "USD",
            seller: {
              "@type": "Organization",
              name: "ZMK Hosiery",
            },
          },
        },
      })),
    });
  }, [locale, t]);

  return null;
}
