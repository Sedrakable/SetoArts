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
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { woodPageQuery } from "@/app/api/generateSanityQueries";
import { Hero } from "@/components/reuse/Hero/Hero";
import { getCarouselImages } from "@/components/reuse/Carousel/getCarouselData";
import { Carousel } from "@/components/reuse/Carousel/Carousel";
import { ICustomImage } from "@/components/reuse/SanityImage/SanityImage";
import { Features } from "@/components/services/Features/Features";
import { Questions } from "@/components/services/Questions/Questions";
import {
  SolutionBlock,
  SolutionBlockProps,
} from "@/components/pages/blocks/SolutionBlock/SolutionBlock";
import { Testimonials } from "@/components/services/Testimonials/Testimonials";

import { FormTitleProps } from "@/components/reuse/Form/Form";
import { getFormData } from "@/components/reuse/Form/getFormData";
import { Collapsible } from "@/components/reuse/Collapsible/Collapsible";
import { ProcessAndQuote } from "@/components/pages/Woodpage/ProcessAndQuote";
import { getTranslations } from "@/helpers/langUtils";
import NavWrapperServer from "@/components/pages/NavWrapper/NavWrapperServer";

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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data: WoodPageProps = await useFetchPage(woodQuery);

  return data;
};

// export async function generateMetadata({
//   params: { locale },
// }: {
//   params: { locale: LangType };
// }): Promise<Metadata> {
//   const path = `${LocalPaths.WOOD}`;
//   const crawl = true;
//   const data: WoodPageProps = await getWoodPageData(locale);
//   const { metaTitle, metaDesc, metaKeywords } = data.meta;

//   return setMetadata({
//     locale,
//     metaTitle,
//     metaDesc,
//     metaKeywords,
//     path,
//     crawl,
//   });
// }

export default async function WoodPage({
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
    <NavWrapperServer locale={locale} theme="light">
      {data && (
        <>
          <Hero
            {...data.hero}
            cta={{
              text: translations.buttons.buildSign,
              path: `/${locale}${LocalPaths.WOOD}`,
              scrollTarget: LocalTargets.WOODFORM,
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
            <ProcessAndQuote
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
