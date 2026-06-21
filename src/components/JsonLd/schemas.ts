// src/components/JsonLd/schemas.ts
//
// Builders for schema.org JSON-LD. Every builder omits empty/unknown fields so
// that incomplete businessInfo never produces invalid or misleading markup.

import { businessInfo } from "@/data/businessInfo";
import { LangType } from "@/i18n/request";
import { LocalPaths } from "@/data.d";

const BASE_URL = process.env.BASE_NAME || "https://www.setoxarts.com";

// Stable @id for the business entity so other nodes can reference it.
const ORG_ID = `${BASE_URL}/#business`;

/** Remove keys whose value is empty ("", [], {}, null, undefined). */
function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    if (typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0)
      continue;
    out[k] = v;
  }
  return out as Partial<T>;
}

/** Flatten Sanity Portable Text (or plain string) into a single plain string. */
export function portableTextToPlain(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  if (!Array.isArray(value)) return "";
  return value
    .map((block: any) => {
      if (typeof block === "string") return block;
      if (block?._type === "block" && Array.isArray(block.children)) {
        return block.children.map((c: any) => c?.text ?? "").join("");
      }
      return "";
    })
    .join("\n")
    .replace(/\s+\n/g, "\n")
    .trim();
}

/**
 * LocalBusiness — the core local-SEO entity. Emitted site-wide.
 * Omits address/geo/phone/hours until they are filled in businessInfo.
 */
export function localBusinessSchema(locale: LangType) {
  const b = businessInfo;

  const address = compact({
    "@type": "PostalAddress",
    streetAddress: b.address.streetAddress,
    addressLocality: b.address.addressLocality,
    addressRegion: b.address.addressRegion,
    postalCode: b.address.postalCode,
    addressCountry: b.address.addressCountry,
  });

  const geo =
    b.geo.latitude && b.geo.longitude
      ? {
          "@type": "GeoCoordinates",
          latitude: b.geo.latitude,
          longitude: b.geo.longitude,
        }
      : "";

  return compact({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: b.name,
    legalName: b.legalName,
    url: b.url,
    logo: b.logo,
    image: b.logo,
    email: b.email,
    description: b.description[locale] ?? b.description.en,
    priceRange: b.priceRange,
    foundingDate: b.foundingDate,
    telephone: b.telephone,
    address: Object.keys(address).length > 1 ? address : "",
    geo,
    areaServed: b.areaServed.map((name) => ({ "@type": "City", name })),
    openingHours: b.openingHours,
    sameAs: b.sameAs,
    knowsLanguage: ["en-CA", "fr-CA"],
  });
}

/** WebSite node — enables sitelinks / search box eligibility. */
export function webSiteSchema(locale: LangType) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: businessInfo.name,
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * Service node describing the custom LED wood sign offering, linked to the
 * business as provider. Helps Google understand what you sell + where.
 */
export function serviceSchema(locale: LangType) {
  const isFr = locale === "fr";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: isFr
      ? "Enseignes en bois avec LED sur mesure"
      : "Custom LED Wood Signs",
    provider: { "@id": ORG_ID },
    areaServed: businessInfo.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
    description: businessInfo.description[locale] ?? businessInfo.description.en,
    url: `${BASE_URL}/${locale}${LocalPaths.HOME}`,
  };
}

/** BreadcrumbList from an ordered list of { name, path } items. */
export function breadcrumbSchema(
  locale: LangType,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}/${locale}${item.path}`,
    })),
  };
}

/**
 * FAQPage from a Collapsible block's questions. Answers may be Portable Text.
 * Returns null when there are no usable Q&A pairs (so callers can skip render).
 */
export function faqPageSchema(
  questions: { question: string; answer: unknown }[] | undefined,
) {
  const entities = (questions ?? [])
    .map((q) => {
      const answer = portableTextToPlain(q.answer);
      if (!q.question || !answer) return null;
      return {
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      };
    })
    .filter(Boolean);

  if (entities.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entities,
  };
}
