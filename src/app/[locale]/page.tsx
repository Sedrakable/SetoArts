import { ILandingSide, ISeo } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { landingPageQuery } from "@/app/api/generateSanityQueries";
import { Landing, LandingProps } from "@/components/pages/Landing/Landing";

export interface LandingPageProps {
  meta: ISeo;
  leftSide: ILandingSide;
  rightSide: ILandingSide;
}
const getLandingPageData = async (locale: LangType) => {
  const type = "woodPage";
  const woodQuery = landingPageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const woodPageData: LandingPageProps = await useFetchPage(
    woodQuery,
    `${type}`
  );

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

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const landingPageData = await getLandingPageData(locale);

  return (
    landingPageData && (
      <>
        <Landing
          left={landingPageData.leftSide}
          right={landingPageData.rightSide}
          locale={locale}
        />
      </>
    )
  );
}
