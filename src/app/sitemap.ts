import { MetadataRoute } from "next";
import { sitemapWoodWorkQuery } from "./api/generateSanityQueries";
import { fetchPage } from "@/app/api/fetchPage";
import { ISlug, LocalPaths } from "@/data.d";
import { ICustomImage } from "@/components/reuse/SanityImage/SanityImage";
import { SanityDocument } from "@sanity/client";
import { urlFor } from "./api/client";

const BASE_URL = process.env.BASE_NAME || "https://www.setoxarts.com";

const staticUrls: Record<string, string[]> = {
  base: [LocalPaths.HOME, LocalPaths.SIGNS, LocalPaths.CONTACT],
  service: [
    LocalPaths.DIGITAL,
    `${LocalPaths.DIGITAL}${LocalPaths.BRANDING}`,
    `${LocalPaths.DIGITAL}${LocalPaths.WEB}`,
  ],
  work: [LocalPaths.WORK],
};
const allUrls: string[] = Object.values(staticUrls).flat();

const priorityMap: Record<string, number> = {
  [LocalPaths.HOME]: 0.9,
  [LocalPaths.SIGNS]: 1.0,
  [LocalPaths.CONTACT]: 0.9,
  [LocalPaths.DIGITAL]: 0.9,
  [`${LocalPaths.DIGITAL}${LocalPaths.BRANDING}`]: 1.0,
  [`${LocalPaths.DIGITAL}${LocalPaths.WEB}`]: 1.0,
  [LocalPaths.WORK]: 0.8,
};

const changeFrequencyMap: Record<
  string,
  MetadataRoute.Sitemap[number]["changeFrequency"]
> = {
  [LocalPaths.HOME]: "monthly",
  [LocalPaths.SIGNS]: "monthly",
  [LocalPaths.CONTACT]: "monthly",
  [LocalPaths.DIGITAL]: "monthly",
  [`${LocalPaths.DIGITAL}${LocalPaths.BRANDING}`]: "monthly",
  [`${LocalPaths.DIGITAL}${LocalPaths.WEB}`]: "monthly",
  [LocalPaths.WORK]: "weekly",
};

const generateStaticEntries: MetadataRoute.Sitemap = allUrls.map((baseUrl) => {
  const enUrl = `${BASE_URL}/en${baseUrl}`;
  const frUrl = `${BASE_URL}/fr${baseUrl}`;

  return {
    url: enUrl,
    lastModified: new Date().toISOString(),
    changeFrequency: changeFrequencyMap[baseUrl] || "monthly",
    priority: priorityMap[baseUrl] || 0.9,
    alternates: {
      languages: {
        en: enUrl,
        fr: frUrl,
      },
    },
  };
});

export interface SitemapWorkQueryType extends SanityDocument {
  slug: ISlug; // Optional for internal links
  workType: "wood"; // From Sanity// External URL (e.g., Behance, Kickstarter)
  images: ICustomImage[]; // For modal slider (Wood Signs)
}

async function getWoodWorkData() {
  try {
    const query = sitemapWoodWorkQuery;
    const data: SitemapWorkQueryType[] = await fetchPage(query);
    return data;
  } catch (error) {
    console.error("Failed to fetch woodwork data:", error);
    return [];
  }
}

//NED english and French
const generateDynamicEntries = async (): Promise<MetadataRoute.Sitemap> => {
  const workData: SitemapWorkQueryType[] = await getWoodWorkData();

  const validWork = workData.filter((work) => work.slug && work.slug.current);

  const productEntries: MetadataRoute.Sitemap = validWork.map((work) => {
    const slug = work.slug.current.startsWith("/")
      ? work.slug.current
      : `/${work.slug.current}`;

    const basePath = `${LocalPaths.WORK}${slug}`;

    const enUrl = `${BASE_URL}/en${basePath}`;
    const frUrl = `${BASE_URL}/fr${basePath}`;

    return {
      url: enUrl,
      lastModified:
        work._updatedAt && !isNaN(new Date(work._updatedAt).getTime())
          ? new Date(work._updatedAt).toISOString()
          : new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
      images:
        work.images
          ?.filter((image) => image?.image)
          .map((image) => urlFor(image.image).url()) || [],
      alternates: {
        languages: {
          en: enUrl,
          fr: frUrl,
        },
      },
    };
  });

  return productEntries;
};

// Adapt the output to match the Next.js expected structure
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicEntries = await generateDynamicEntries();
  return [...generateStaticEntries, ...dynamicEntries];
}
