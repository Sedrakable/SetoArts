import { Metadata } from "next";
import { LangType } from "@/i18n";
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
      url: `https://www.setoxarts.com/${locale}${path}`,
      type: "website",
      title: metaTitle || "Seto X Arts",
      description: metaDesc || "Explore creative work by Seto X Arts.",
      locale,
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
      canonical: `https://www.setoxarts.com/${locale}${path}`,
      languages: {
        en: `https://www.setoxarts.com/en${path}`,
        fr: `https://www.setoxarts.com/fr${path}`,
      },
    },
  };
};
