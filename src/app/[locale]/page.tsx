import {
  ISeo,
  IHero,
  ICollapsible,
  IProcessStep,
  LocalPaths,
  LocalTargets,
  ServiceType,
} from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";
import { homePageQuery } from "@/app/api/generateSanityQueries";

import { ICustomImage } from "@/components/reuse/SanityImage/SanityImage";
import {
  QuestionsBlock,
  QuestionsBlockProps,
} from "@/components/pages/blocks/QuestionsBlock/QuestionsBlock";

import { FormTitleProps } from "@/components/reuse/Form/Form";
import { getFormData } from "@/components/reuse/Form/getFormData";
import { Collapsible } from "@/components/pages/blocks/Collapsible/Collapsible";

import { getTranslations } from "@/helpers/langUtils";
import NavWrapperServer from "@/components/navbar/NavWrapper/NavWrapperServer";
import { getCarouselImages } from "@/components/pages/blocks/Carousel/getCarouselData";
import { Hero } from "@/components/pages/blocks/Hero/Hero";

import { ProcessAndForm } from "@/components/pages/blocks/ProcessAndForm/ProcessAndForm";
import { Carousel } from "@/components/pages/blocks/Carousel/Carousel";
import { setMetadata } from "@/components/SEO";
import { Metadata } from "next";
import {
  ServicesBlock,
  ServicesBlockProps,
} from "@/components/pages/blocks/ServicesBlock/ServicesBlock";
import {
  TestimonialsBlock,
  TestimonialsBlockProps,
} from "@/components/pages/blocks/TestimonialsBlock/TestimonialsBlock";
import {
  AboutBlock,
  AboutBlockProps,
} from "@/components/pages/blocks/AboutBlock/AboutBlock";

export interface HomePageProps {
  meta: ISeo;
  hero: IHero;
  questionsBlock: QuestionsBlockProps;
  servicesBlock: ServicesBlockProps;
  aboutBlock: AboutBlockProps;
  // featureBlock: { features: IFeature[] };
  // solutionBlock: SolutionBlockProps;
  processBlock: { processes: IProcessStep[] };
  testimonialsBlock: TestimonialsBlockProps;
  collapsible: ICollapsible;
}

const getHomePageData = async (locale: LangType) => {
  const homeQuery = homePageQuery(locale);

  const data: HomePageProps = await fetchPage(homeQuery);

  return data;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}): Promise<Metadata | null> {
  const { locale } = await params;
  const path = LocalPaths.SIGNS;
  const crawl = true;
  const data: HomePageProps = await getHomePageData(locale);
  if (!data?.meta) return null;
  const { metaTitle, metaDesc } = data.meta;

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    path,
    crawl,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  // const translations = getTranslations(locale);
  const { locale } = await params;
  const translations = getTranslations(locale);
  const data = await getHomePageData(locale);
  const carouselImages: ICustomImage[] = await getCarouselImages();
  const form: ServiceType = "wood";
  const formData: FormTitleProps = await getFormData(form, locale);

  return (
    <NavWrapperServer locale={locale} theme="light" hideLogo={true}>
      {data && (
        <>
          <Hero
            {...data.hero}
            cta1={{
              text: translations.buttons.buildSign,
              path: `/${locale}${LocalPaths.SIGNS}`,
              scrollTarget: LocalTargets.SIGNSFORM,
            }}
          />
          {carouselImages && <Carousel images={carouselImages} />}
          {data.questionsBlock && <QuestionsBlock {...data.questionsBlock} />}
          {data.servicesBlock && <ServicesBlock {...data.servicesBlock} />}
          {/* 
          {data.solutionBlock && (
            <SolutionBlock {...data.solutionBlock} theme="wood" />
          )} */}
          {data.testimonialsBlock && (
            <TestimonialsBlock {...data.testimonialsBlock} />
          )}
          {data.processBlock && (
            <ProcessAndForm
              processes={data.processBlock.processes}
              {...formData}
              video={{
                firstIndex: 0,
                lastIndex: 400,
                folder: "wood",
                format: "webp",
              }}
            />
          )}
          {/* {data.featureBlock && (
            <Features features={data.featureBlock.features} />
          )} */}
          {data && (
            <>{data.aboutBlock && <AboutBlock {...data.aboutBlock} />}</>
          )}
          {data.collapsible && <Collapsible {...data.collapsible} />}
        </>
      )}
    </NavWrapperServer>
  );
}
