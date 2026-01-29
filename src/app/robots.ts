// src/app/robots.ts
import { MetadataRoute } from "next";

const BASE_URL = process.env.BASE_NAME ?? "https://www.setoxarts.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/en/legal/", "/fr/legal/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
