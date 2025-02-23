import {
  IHero,
  IWorkBlock,
  ISeo,
  LocalPaths,
  IHeroV2,
  IFeature,
  IQuestion,
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

export interface WoodPageProps {
  meta: ISeo;
  hero: IHeroV2;
  features: IFeature[];
  questions: IQuestion[];
  woodBlock: WoodBlockProps;
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
  const { hero, features, questions, woodBlock } = woodPageData;

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
        {/* {woodPageData?.price && (
          <PriceBlock price={woodPageData?.price} />
        )}
        {woodPageData?.processes && (
          <Processes {...woodPageData?.processes} />
        )}
        {woodPageData?.work && <WorkSlider {...woodPageData?.work} />}
        <Inspired /> */}
      </>
    )
  );
}
