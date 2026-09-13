// src/app/robots.ts
import { MetadataRoute } from "next";

const BASE_URL = process.env.BASE_NAME ?? "https://www.setoxarts.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /intake/* are private, unlisted client questionnaires. They also carry
      // a noindex meta tag; this keeps compliant crawlers out entirely.
      disallow: ["/en/legal/", "/fr/legal/", "/intake/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
