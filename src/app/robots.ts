import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/en/legal/"],
    },
    sitemap: `${process.env.BASE_NAME}/sitemap.xml`,
  };
}
