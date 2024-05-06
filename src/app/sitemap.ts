import { MetadataRoute } from "next";

interface SiteMapEntry {
  url: string;
  lastModified: Date;
  alternates: {
    languages: {
      en: string;
      fr: string;
    };
  };
}

const baseUrls = [
  "/",
  "/service/branding",
  "/service/web-design",
  "/service/total-package",
  "/service/custom-work",
  "/about-work",
  "/blog",
  "/contact",
];

const generateSiteMapEntry = (baseUrl: string): SiteMapEntry => {
  const url = `https://setoxarts.com/en${baseUrl}`;
  const enUrl = url;
  const frUrl = `https://setoxarts.com/fr${baseUrl}`;

  return {
    url,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: enUrl,
        fr: frUrl,
      },
    },
  };
};

const siteMapEntries: SiteMapEntry[] = baseUrls.map(generateSiteMapEntry);

export default function sitemap(): MetadataRoute.Sitemap {
  return siteMapEntries;
}
