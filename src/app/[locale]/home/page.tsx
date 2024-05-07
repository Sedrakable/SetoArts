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
import dynamic from "next/dynamic";
import { homePageQuery } from "@/app/api/generateSanityQueries";

const Hero = dynamic(
  () => import("@/components/reuse/Hero/Hero").then((module) => module.Hero),
  {
    ssr: false,
  }
);
const WorkSlider = dynamic(
  () =>
    import("@/components/pages/blocks/WorkSlider/WorkSlider").then(
      (module) => module.WorkSlider
    ),
  {
    ssr: false,
  }
);
const Services = dynamic(
  () =>
    import("@/components/pages/home/Services/Services").then(
      (module) => module.Services
    ),
  {
    ssr: false,
  }
);
const Values = dynamic(
  () =>
    import("@/components/pages/home/Values/Values").then(
      (module) => module.Values
    ),
  {
    ssr: false,
  }
);
const Inspired = dynamic(
  () =>
    import("@/components/pages/blocks/Inspired/Inspired").then(
      (module) => module.Inspired
    ),
  {
    ssr: false,
  }
);
const About = dynamic(
  () =>
    import("@/components/pages/blocks/About/About").then(
      (module) => module.About
    ),
  {
    ssr: false,
  }
);

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
      <About content={{ ...homePageData?.about?.content, cta: true }} />
      <Inspired />
    </>
  );
}
