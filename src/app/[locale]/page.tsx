import { ILandingSide, ISeo } from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n";
import { landingPageQuery } from "@/app/api/generateSanityQueries";
import { Landing } from "@/components/pages/Landing/Landing";
import { ClientLogger } from "@/helpers/clientLogger";

export interface LandingPageProps {
  meta: ISeo;
  leftSide: ILandingSide;
  rightSide: ILandingSide;
}
const getLandingPageData = async (locale: LangType) => {
  const woodQuery = landingPageQuery(locale);
   
  const woodPageData: LandingPageProps = await fetchPage(woodQuery);

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
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  const { locale } = await params;
  const landingPageData = await getLandingPageData(locale);

  return (
    landingPageData && (
      <>
        <ClientLogger slug={landingPageData} />
        <Landing
          left={landingPageData.leftSide}
          right={landingPageData.rightSide}
          locale={locale}
        />
      </>
    )
  );
}
