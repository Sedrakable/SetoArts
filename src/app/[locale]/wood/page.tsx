import {
  ISeo,
  IHeroV2,
  IFeature,
  IQuestion,
  ITestimonial,
  ICollapsible,
  IProcessStep,
} from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { woodPageQuery } from "@/app/api/generateSanityQueries";
import { HeroV3 } from "@/components/reuse/Hero/Hero";
import { getCarouselImages } from "@/components/reuse/Carousel/getCarouselData";
import { Carousel } from "@/components/reuse/Carousel/Carousel";
import { ICustomImage } from "@/components/reuse/SanityImage/SanityImage";
import { Features } from "@/components/services/Features/Features";
import { Questions } from "@/components/services/Questions/Questions";
import {
  WoodBlock,
  WoodBlockProps,
} from "@/components/pages/blocks/WoodBlock/WoodBlock";
import { Testimonials } from "@/components/services/Testimonials/Testimonials";

import { FormTitleProps } from "@/components/reuse/Form/Form";
import { getFormData } from "@/components/reuse/Form/getFormData";
import { Collapsible } from "@/components/reuse/Collapsible/Collapsible";
import { ProcessAndQuote } from "@/components/pages/woodpage/ProcessAndQuote";
import { getTranslations } from "@/helpers/langUtils";

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
  const formData: FormTitleProps = await getFormData("wood", locale);

  return (
    data && (
      <>
        <HeroV3 {...data.hero} cta={{ text: translations.buttons.buildSign }} />
        {carouselImages && (
          <Carousel
            images={carouselImages}
            cta={{
              text: "View my Insta",
              link: "https://www.instagram.com/seto.arts",
            }}
          />
        )}
        {data.features && <Features features={data.features} variant="light" />}
        {data.questions && (
          <Questions questions={data.questions} variant="light" />
        )}
        {data.woodBlock && <WoodBlock {...data.woodBlock} />}
        {data.testimonials && (
          <Testimonials testimonials={data.testimonials} variant="light" />
        )}
        {data.processBlock && (
          <ProcessAndQuote
            processes={data.processBlock.processes}
            {...formData}
          />
        )}
        {data.collapsible && <Collapsible {...data.collapsible} />}
      </>
    )
  );
}
