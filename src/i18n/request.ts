// src/i18n/request.ts
export const langs = ["en", "fr"] as const;
export type LangType = typeof langs[number];

import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {}, // Provide empty messages object to satisfy next-intl
  };
});
