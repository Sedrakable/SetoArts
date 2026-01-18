import {
  ISeo,
  IHero,
  IFeature,
  IQuestion,
  ITestimonial,
  ICollapsible,
  IProcessStep,
  LocalPaths,
  LocalTargets,
  ServiceType,
} from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";
import { woodPageQuery } from "@/app/api/generateSanityQueries";

import { ICustomImage } from "@/components/reuse/SanityImage/SanityImage";
import { Features } from "@/components/pages/blocks/Features/Features";
import { Questions } from "@/components/pages/blocks/QuestionsBlock/QuestionsBlock";
import {
  SolutionBlock,
  SolutionBlockProps,
} from "@/components/pages/blocks/SolutionBlock/SolutionBlock";
import { Testimonials } from "@/components/pages/blocks/Testimonials/Testimonials";

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

export interface WoodPageProps {
  meta: ISeo;
  hero: IHero;
  featureBlock: { features: IFeature[] };
  questions: IQuestion[];
  solutionBlock: SolutionBlockProps;
  processBlock: { processes: IProcessStep[] };
  testimonials: ITestimonial[];
  collapsible: ICollapsible;
}

const getWoodPageData = async (locale: LangType) => {
  const woodQuery = woodPageQuery(locale);

  const data: WoodPageProps = await fetchPage(woodQuery);

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
  const data: WoodPageProps = await getWoodPageData(locale);
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

export default async function SignsPage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  // const translations = getTranslations(locale);
  const { locale } = await params;
  const translations = getTranslations(locale);
  const data = await getWoodPageData(locale);
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
          {data.questions && (
            <Questions questions={data.questions} theme="light" />
          )}

          {data.solutionBlock && (
            <SolutionBlock {...data.solutionBlock} theme="wood" />
          )}
          {data.testimonials && (
            <Testimonials testimonials={data.testimonials} theme="light" />
          )}
          {data.processBlock && (
            <ProcessAndForm
              processes={data.processBlock.processes}
              {...formData}
              form={form}
              video={{
                firstIndex: 0,
                lastIndex: 400,
                folder: "wood",
                format: "webp",
              }}
            />
          )}
          {data.featureBlock && (
            <Features features={data.featureBlock.features} />
          )}
          {data.collapsible && <Collapsible {...data.collapsible} />}
        </>
      )}
    </NavWrapperServer>
  );
}
