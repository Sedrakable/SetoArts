import {
  IHero,
  IServices,
  IValues,
  IAbout,
  IWorkBlock,
  LocalPaths,
  ISeo,
} from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { homePageQuery } from "@/app/api/generateSanityQueries";

import { Hero } from "@/components/reuse/Hero/Hero";
import { About } from "@/components/pages/blocks/About/About";
import { Inspired } from "@/components/pages/blocks/Inspired/Inspired";
import { WorkSlider } from "@/components/pages/blocks/WorkSlider/WorkSlider";
import { Services } from "@/components/pages/home/Services/Services";
import { Values } from "@/components/pages/home/Values/Values";

export interface HomePageProps {
  meta: ISeo;
  hero: IHero;
  services: IServices;
  values: IValues;
  about: IAbout;
  work: IWorkBlock;
}

export const getHomePageData = async (locale: LangType) => {
  const type = "homePage";
  const homeQuery = homePageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const homePageData: HomePageProps = await useFetchPage(homeQuery, type);
  return homePageData;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const homePageData = await getHomePageData(locale);
  const { metaTitle, metaDesc, metaKeywords } = homePageData.meta;
  const path = LocalPaths.HOME;
  const crawl = true;

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    metaKeywords,
    path,
    crawl,
  });
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const homePageData = await getHomePageData(locale);
  return (
    <>
      <Hero {...homePageData?.hero} />
      <WorkSlider {...homePageData?.work} />
      <Services {...homePageData.services} />
      <Values {...homePageData.values} />
      <About {...homePageData?.about} cta={true} />
      <Inspired />
    </>
  );
}
