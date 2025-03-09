import {
  IHero,
  IWorkBlock,
  ISeo,
  LocalPaths,
  IHeroV2,
  IFeature,
  IQuestion,
  ITestimonial,
  ICollapsible,
  IProcessStep,
} from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { woodPageQuery } from "@/app/api/generateSanityQueries";
import { HeroV3 } from "@/components/reuse/Hero/Hero";
import { getCarouselImages } from "@/components/reuse/Carousel/getCarouselData";
import { Carousel } from "@/components/reuse/Carousel/Carousel";
import { ICustomImage } from "@/components/reuse/SanityImage/SanityImage";
import {
  Features,
  FeaturesProps,
} from "@/components/services/Features/Features";
import { ClientLogger } from "@/helpers/clientLogger";
import { Questions } from "@/components/services/Questions/Questions";
import {
  WoodBlock,
  WoodBlockProps,
} from "@/components/pages/blocks/WoodBlock/WoodBlock";
import { Testimonials } from "@/components/services/Testimonials/Testimonials";
import { WoodQuote } from "@/components/pages/woodpage/WoodQuote";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import { getFormData } from "@/components/reuse/Form/getFormData";
import { Collapsible } from "@/components/reuse/Collapsible/Collapsible";
import { Process, ProcessProps } from "@/components/services/Process/Process";

export interface WoodPageProps {
  meta: ISeo;
  hero: IHeroV2;
  features: IFeature[];
  questions: IQuestion[];
  woodBlock: WoodBlockProps;
  processBlock: { processes: IProcessStep[] };
  testimonials: ITestimonial[];
  collapsible: ICollapsible;
}

const getWoodPageData = async (locale: LangType) => {
  const type = "woodPage";
  const woodQuery = woodPageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const woodPageData: WoodPageProps = await useFetchPage(woodQuery, `${type}`);

  return woodPageData;
};

// export async function generateMetadata({
//   params: { locale },
// }: {
//   params: { locale: LangType };
// }): Promise<Metadata> {
//   const path = `${LocalPaths.WOOD}`;
//   const crawl = true;
//   const woodPageData: WoodPageProps = await getWoodPageData(locale);
//   const { metaTitle, metaDesc, metaKeywords } = woodPageData.meta;

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
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const woodPageData = await getWoodPageData(locale);
  const carouselImages: ICustomImage[] = await getCarouselImages();
  const formData: FormTitleProps = await getFormData("wood", locale);
  const {
    hero,
    features,
    questions,
    woodBlock,
    testimonials,
    processBlock,
    collapsible,
  } = woodPageData;

  return (
    woodPageData && (
      <>
        <HeroV3 {...hero} />
        {carouselImages && (
          <Carousel
            images={carouselImages}
            cta={{
              text: "View my Insta",
              link: "https://www.instagram.com/seto.arts",
            }}
          />
        )}
        {features && <Features features={features} variant="light" />}
        {questions && <Questions questions={questions} variant="light" />}
        {woodBlock && <WoodBlock {...woodBlock} />}
        {testimonials && (
          <Testimonials testimonials={testimonials} variant="light" />
        )}
        {processBlock && (
          <Process
            processSteps={processBlock.processes}
            side="right"
            media="video-3D"
          />
        )}
        {formData && <WoodQuote {...formData} />}
        {collapsible && <Collapsible {...collapsible} />}
      </>
    )
  );
}
