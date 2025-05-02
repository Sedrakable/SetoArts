import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/fr", "/en", "/sitemap.xml", "/robots.txt"],
      disallow: ["/en/legal/", "/fr/legal/"],
    },
    sitemap: `${process.env.BASE_NAME || "https://setoxarts.com"}/sitemap.xml`,
  };
}
