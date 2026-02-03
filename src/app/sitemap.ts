import { MetadataRoute } from "next";
import { sitemapWoodWorkQuery } from "./api/generateSanityQueries";
import { fetchPage } from "@/app/api/fetchPage";
import { ISlug, LocalPaths } from "@/data.d";
import { ICustomImage } from "@/components/reuse/SanityImage/SanityImage";
import { SanityDocument } from "@sanity/client";
import { urlFor } from "./api/client";

const BASE_URL = process.env.BASE_NAME || "https://www.setoxarts.com";

const staticUrls: Record<string, string[]> = {
  base: [LocalPaths.HOME, LocalPaths.CONTACT],
  projects: [LocalPaths.PROJECTS],
};
const allUrls: string[] = Object.values(staticUrls).flat();

const priorityMap: Record<string, number> = {
  [LocalPaths.HOME]: 1,
  [LocalPaths.PROJECTS]: 0.9,
  [LocalPaths.CONTACT]: 0.8,
};

const changeFrequencyMap: Record<
  string,
  MetadataRoute.Sitemap[number]["changeFrequency"]
> = {
  [LocalPaths.HOME]: "monthly",
  [LocalPaths.CONTACT]: "monthly",
  [LocalPaths.PROJECTS]: "weekly",
};

function makeLocalizedEntries(args: {
  basePath: string; // e.g. "/projects/slug" or "/contact"
  lastModified: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  images?: string[];
}): MetadataRoute.Sitemap {
  const { basePath, lastModified, changeFrequency, priority, images } = args;

  const enUrl = `${BASE_URL}/en${basePath}`;
  const frUrl = `${BASE_URL}/fr${basePath}`;
  const xDefaultUrl = `${BASE_URL}${basePath}`; // root path (redirects based on user)

  const alternates = {
    languages: {
      "en-CA": enUrl,
      "fr-CA": frUrl,
      "x-default": xDefaultUrl,
    },
  } as const;

  const common = {
    lastModified,
    changeFrequency,
    priority,
    alternates,
  };

  const enEntry: MetadataRoute.Sitemap[number] = {
    url: enUrl,
    ...common,
    ...(images?.length ? { images } : {}),
  };

  const frEntry: MetadataRoute.Sitemap[number] = {
    url: frUrl,
    ...common,
    ...(images?.length ? { images } : {}),
  };

  return [enEntry, frEntry];
}

const generateStaticEntries: MetadataRoute.Sitemap = allUrls.flatMap(
  (basePath) => {
    const lastModified = new Date().toISOString();
    return makeLocalizedEntries({
      basePath,
      lastModified,
      changeFrequency: changeFrequencyMap[basePath] || "monthly",
      priority: priorityMap[basePath] || 0.9,
    });
  },
);

export interface SitemapWorkQueryType extends SanityDocument {
  slug: ISlug;
  workType: "wood";
  images: ICustomImage[];
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

const generateDynamicEntries = async (): Promise<MetadataRoute.Sitemap> => {
  const workData: SitemapWorkQueryType[] = await getWoodWorkData();
  const validWork = workData.filter((work) => work.slug && work.slug.current);

  return validWork.flatMap((work) => {
    const slug = work.slug.current.startsWith("/")
      ? work.slug.current
      : `/${work.slug.current}`;

    const basePath = `${LocalPaths.PROJECTS}${slug}`;

    const lastModified =
      work._updatedAt && !isNaN(new Date(work._updatedAt).getTime())
        ? new Date(work._updatedAt).toISOString()
        : new Date().toISOString();

    const images =
      work.images
        ?.filter((img) => img?.image)
        .map((img) => urlFor(img.image).url()) || [];

    return makeLocalizedEntries({
      basePath,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
      images,
    });
  });
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicEntries = await generateDynamicEntries();
  return [...generateStaticEntries, ...dynamicEntries];
}
