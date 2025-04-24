import { ILandingSide, ISeo } from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";
import { landingPageQuery } from "@/app/api/generateSanityQueries";
import { Landing } from "@/components/pages/Landing/Landing";
import { setMetadata } from "@/components/SEO";
import { Metadata } from "next";

export interface LandingPageProps {
  meta: ISeo;
  leftSide: ILandingSide;
  rightSide: ILandingSide;
}

const getLandingPageData = async (locale: LangType) => {
  try {
    const landingQuery = landingPageQuery(locale);
    const landingPageData: LandingPageProps = await fetchPage(landingQuery);
    return landingPageData;
  } catch (error) {
    console.error("Failed to fetch landing page data:", error);
    return null;
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "";
  const crawl = true;
  const landingPageData = await getLandingPageData(locale);

  // Add fallback values in case landingPageData is null
  const metaTitle = landingPageData?.meta?.metaTitle || "Seto X Arts";
  const metaDesc =
    landingPageData?.meta?.metaDesc || "Explore creative work by Seto X Arts";

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    path,
    crawl,
  });
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  const { locale } = await params;
  const landingPageData = await getLandingPageData(locale);

  return (
    landingPageData && (
      <Landing
        left={landingPageData.leftSide}
        right={landingPageData.rightSide}
        locale={locale}
      />
    )
  );
}
