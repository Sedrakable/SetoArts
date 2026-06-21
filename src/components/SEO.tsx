import { Metadata } from "next";
import { LangType } from "@/i18n/request";
import { ISeo } from "@/data.d";

interface SEOProps extends ISeo {
  locale: LangType;
  path: string;
  crawl?: boolean;
}

export const setMetadata = ({
  locale,
  metaTitle,
  metaDesc,
  metaImage = "https://i.imgur.com/u9EH6vH.png",
  path,
  crawl = true,
}: SEOProps): Metadata => {
  const baseUrl = process.env.BASE_NAME;
  // The home path is "/", which would produce ".../en/" (trailing slash).
  // Pages are served without a trailing slash, so the homepage's canonical must
  // self-reference as ".../en" — otherwise Google treats /en as a non-canonical
  // "alternate" of /en/ (which redirects), and may not index it directly.
  const normalizedPath = path === "/" ? "" : path;
  const canonicalUrl = `${baseUrl}/${locale}${normalizedPath}`;
  return {
    title: metaTitle || "Seto X Arts",
    description: metaDesc || "Explore creative work by Seto X Arts.",
    authors: [
      {
        name: "Sedrak Nadzharyan",
        url: "https://www.linkedin.com/in/sedrak-n/",
      },
    ],
    robots: { index: crawl, follow: crawl },
    openGraph: {
      url: canonicalUrl,
      type: "website",
      title: metaTitle || "Seto X Arts",
      description: metaDesc || "Explore creative work by Seto X Arts.",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      images: [
        { url: metaImage, width: 1200, height: 630, alt: "Seto X Arts" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle || "Seto X Arts",
      description: metaDesc || "Explore creative work by Seto X Arts.",
      site: "@SetoXArts",
      images: [
        { url: metaImage, width: 1200, height: 630, alt: "Seto X Arts" },
      ],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-CA": `https://www.setoxarts.com/en${normalizedPath}`,
        "fr-CA": `https://www.setoxarts.com/fr${normalizedPath}`,
        "x-default": `https://www.setoxarts.com${normalizedPath || "/"}`,
      },
    },
  };
};
