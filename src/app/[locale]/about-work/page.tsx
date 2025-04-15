import { getAllWorkImages } from "@/helpers/functions";

import { IAbout, IWorkBlock, ISeo, LocalPaths, LocalTargets } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { aboutPageQuery } from "@/app/api/generateSanityQueries";
import { About } from "@/components/pages/blocks/About/About";
import { WorkBlock } from "@/components/pages/blocks/WorkBlock/WorkBlock";
import NavWrapperServer from "@/components/pages/NavWrapper/NavWrapperServer";
import { WorkTypeNav } from "@/components/pages/blocks/WorkBlock/WorkTypeNav";

export interface AboutPageProps {
  meta: ISeo;
  about: IAbout;
  workBlocks: IWorkBlock[];
}

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
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  const { locale } = await params;
  const data = await getAboutPageData(locale);
  // const workImages = getAllWorkImages(aboutPageData?.work?.works as IWork[]);

  return (
    <NavWrapperServer locale={locale} theme="light">
      {data && (
        <>
          {data.about && <About {...data.about} />}
          <WorkTypeNav />
          {data.workBlocks?.map((workBlock: IWorkBlock, key) => {
            return (
              <WorkBlock
                {...workBlock}
                id={
                  `#${workBlock.works[0].workType}-work-block` as LocalTargets
                }
                theme={key % 2 === 1 ? "light" : "yellow"}
                key={key}
              />
            );
          })}

          {/* <Values {...aboutPageData.values} />
          <ImageGrid customImages={workImages} maxImages={24} randomize />
          <Inspired /> */}
        </>
      )}
    </NavWrapperServer>
  );
}
