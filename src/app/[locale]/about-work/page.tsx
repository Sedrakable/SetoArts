import { getAllWorkImages } from "@/helpers/functions";
import { SEO } from "@/components/SEO";
import { About } from "@/components/pages/blocks/About/About";
import { ImageGrid } from "@/components/pages/blocks/ImageGrid/ImageGrid";
import { Inspired } from "@/components/pages/blocks/Inspired/Inspired";
import { WorkBlock } from "@/components/pages/blocks/WorkBlock/WorkBlock";
import { Values } from "@/components/pages/home/Values/Values";
import { IAbout, IValues, IWorkBlock, IWork } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";

export interface AboutPageProps {
  title: string;
  metaDesc: string;
  about: IAbout;
  values: IValues;
  work: IWorkBlock;
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const aboutQuery = `*[_type == 'aboutPage' && lang == '${locale}'][0] {
    ...,
    title,
    metaDesc,
    about->,
    values->,
    work->{
      works[]->,
    },
  }`;
  const aboutPageData: AboutPageProps = await useFetchPage(
    aboutQuery,
    "aboutPage"
  );
  const workImages = getAllWorkImages(aboutPageData?.work?.works as IWork[]);

  return (
    aboutPageData && (
      <>
        <SEO
          title={aboutPageData.title}
          description={aboutPageData.metaDesc}
          imgUrl="https://i.imgur.com/u9EH6vH.png"
          url="https://www.setoxarts.com/en/about-work"
        />
        <About {...aboutPageData.about} />
        <WorkBlock {...aboutPageData.work} />
        <Values {...aboutPageData.values} />
        <ImageGrid customImages={workImages} maxImages={24} randomize />
        <Inspired />
      </>
    )
  );
}
