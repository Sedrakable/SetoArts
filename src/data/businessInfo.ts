// src/data/businessInfo.ts
//
// Single source of truth for Seto x Arts business identity.
// Used to generate structured data (JSON-LD) for SEO / rich results,
// and safe to reuse anywhere the NAP (name/address/phone) is needed.
//
// IMPORTANT: Values left as empty strings are intentionally OMITTED from the
// emitted JSON-LD (see schemas.ts). Fill in the TODO fields below with the
// exact data from your Google Business Profile so the schema stays consistent
// with what Google already knows about you (NAP consistency matters for local
// SEO). Do NOT invent values — an omitted field is better than a wrong one.

const BASE_URL = process.env.BASE_NAME || "https://www.setoxarts.com";

export const businessInfo = {
  // Matches the Google Business Profile name exactly (NAP consistency + keyword).
  name: "Seto x Arts | Custom LED Wood Signs",
  legalName: "Seto x Arts",
  url: BASE_URL,

  // Date the business opened (from Google Business Profile). Empty = omitted.
  foundingDate: "2024-09-01",

  // Self-hosted logo (1600x1600). Used as Organization/LocalBusiness logo + image.
  logo: `${BASE_URL}/photos/SocialLogo.png`,

  // Public business email (matches EMAIL_BUSINESS).
  email: "contact@setoxarts.com",

  // EN + FR short descriptions (sourced from public/llms.txt).
  description: {
    en:
      "Seto x Arts designs and builds high-end custom LED wood signs for businesses. Each piece is handcrafted using layered real wood and integrated LED lighting to create depth, contrast, and a strong visual identity.",
    fr:
      "Seto x Arts conçoit et fabrique des enseignes en bois avec éclairage LED haut de gamme, entièrement sur mesure. Chaque pièce est fabriquée à la main avec du vrai bois et un éclairage intégré pour créer de la profondeur, du contraste et une forte identité visuelle.",
  },

  // Premium positioning. "$$$" signals high-end to Google. Leave "" to omit.
  priceRange: "$$$",

  // Cities / regions served (service-area business). Matches GBP service area.
  areaServed: ["Montreal", "Laval", "Fabreville", "Greater Montreal", "Quebec"],

  // --- TODO: fill from your Google Business Profile for full local SEO ---
  // Public phone in international format, e.g. "+1-514-555-0123". Empty = omitted.
  telephone: "+1-438-405-8699",

  // Physical address. If you run a service-area business and don't want a
  // public street address, leave streetAddress "" — the schema will fall back
  // to city/region only, which is fine. Empty fields are omitted.
  address: {
    streetAddress: "4886 Bd Sainte-Rose", // TODO e.g. "123 Rue Example"
    addressLocality: "Laval", // city
    addressRegion: "QC",
    postalCode: "H7R 2B7", // TODO
    addressCountry: "CA",
  },

  // Geo coordinates from your GBP map pin. Empty = omitted.
  geo: {
    latitude: "45.55619579260311", // TODO e.g. "45.5917"
    longitude: "-73.86603541349362", // TODO e.g. "-73.7073"
  },

  // Opening hours in schema.org format. Empty array = omitted.
  // Example: ["Mo-Fr 09:00-17:00", "Sa 10:00-15:00"]
  openingHours: ["Mo-Fr 10:00-21:00"] as string[],

  // Social / authority profiles (used for sameAs — helps entity recognition).
  // TODO: confirm/replace the Instagram + Facebook URLs with your real handles.
  sameAs: [
    "https://www.instagram.com/seto.arts", // TODO confirm handle
    "https://www.facebook.com/people/Seto-x-Arts/61557749380017", // TODO confirm handle
  ],
} as const;

export type BusinessInfo = typeof businessInfo;
