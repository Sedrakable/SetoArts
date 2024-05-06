import { getAllWorkImages } from "@/helpers/functions";
import { About } from "@/components/pages/blocks/About/About";
import { ImageGrid } from "@/components/pages/blocks/ImageGrid/ImageGrid";
import { Inspired } from "@/components/pages/blocks/Inspired/Inspired";
import { WorkBlock } from "@/components/pages/blocks/WorkBlock/WorkBlock";
import { Values } from "@/components/pages/home/Values/Values";
import { IAbout, IValues, IWorkBlock, IWork, ISeo, LocalPaths } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";

export interface AboutPageProps {
  meta: ISeo;
  about: IAbout;
  values: IValues;
  work: IWorkBlock;
}

const getAboutPageData = async (locale: LangType) => {
  const type = "aboutPage";
  const aboutQuery = `*[_type == '${type}' && lang == '${locale}'][0] {
    meta,
    about->,
    values->,
    work->{
      works[]->,
    },
  }`;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const aboutPageData: AboutPageProps = await useFetchPage(aboutQuery, type);
  return aboutPageData;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const aboutPageData = await getAboutPageData(locale);
  const { metaTitle, metaDesc, metaKeywords } = aboutPageData.meta;
  const path = LocalPaths.ABOUT;
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

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const aboutPageData = await getAboutPageData(locale);
  const workImages = getAllWorkImages(aboutPageData?.work?.works as IWork[]);

  return (
    aboutPageData && (
      <>
        <About {...aboutPageData.about} />
        <WorkBlock {...aboutPageData.work} />
        <Values {...aboutPageData.values} />
        <ImageGrid customImages={workImages} maxImages={24} randomize />
        <Inspired />
      </>
    )
  );
}
