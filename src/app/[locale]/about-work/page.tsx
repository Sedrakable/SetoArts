import { getAllWorkImages } from "@/helpers/functions";

import { IAbout, IValues, IWorkBlock, IWork, ISeo, LocalPaths } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { aboutPageQuery } from "@/app/api/generateSanityQueries";
import dynamic from "next/dynamic";

export interface AboutPageProps {
  meta: ISeo;
  about: IAbout;
  values: IValues;
  work: IWorkBlock;
}

const ImageGrid = dynamic(
  () =>
    import("@/components/pages/blocks/ImageGrid/ImageGrid").then(
      (module) => module.ImageGrid
    ),
  {
    ssr: false,
  }
);
const WorkBlock = dynamic(
  () =>
    import("@/components/pages/blocks/WorkBlock/WorkBlock").then(
      (module) => module.WorkBlock
    ),
  {
    ssr: false,
  }
);

const About = dynamic(
  () =>
    import("@/components/pages/blocks/About/About").then(
      (module) => module.About
    ),
  {
    ssr: false,
  }
);

const Values = dynamic(
  () =>
    import("@/components/pages/home/Values/Values").then(
      (module) => module.Values
    ),
  {
    ssr: false,
  }
);
const Inspired = dynamic(
  () =>
    import("@/components/pages/blocks/Inspired/Inspired").then(
      (module) => module.Inspired
    ),
  {
    ssr: false,
  }
);

const getAboutPageData = async (locale: LangType) => {
  const type = "aboutPage";
  const aboutQuery = aboutPageQuery(locale);
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
