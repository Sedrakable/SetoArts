import { ISeo, LocalPaths, LocalTargets } from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { worksPageQuery } from "@/app/api/generateSanityQueries";
import {
  WorkBlock,
  WorkBlockProps,
} from "@/components/pages/blocks/WorkBlock/WorkBlock";
import NavWrapperServer from "@/components/navbar/NavWrapper/NavWrapperServer";
import { WorkTypeNav } from "@/components/pages/blocks/WorkBlock/WorkTypeNav";
import { Hero, HeroProps } from "@/components/pages/blocks/Hero/Hero";

export interface WorkPageProps {
  meta: ISeo;
  hero: HeroProps;
  workBlocks: WorkBlockProps[];
}

const getWorkPageData = async (locale: LangType) => {
  const worksQuery = worksPageQuery(locale);

  const aboutPageData: WorkPageProps = await fetchPage(worksQuery);
  return aboutPageData;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = LocalPaths.WORK;
  const crawl = true;
  const aboutPageData = await getWorkPageData(locale);
  const { metaTitle, metaDesc } = aboutPageData.meta;

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    path,
    crawl,
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  const { locale } = await params;
  const data = await getWorkPageData(locale);
  // const workImages = getAllWorkImages(aboutPageData?.work?.works as IWork[]);

  return (
    <NavWrapperServer locale={locale} theme="light">
      {data && (
        <>
          <Hero {...data.hero} version={2} />
          {/* <WorkTypeNav /> */}
          {data.workBlocks?.map((workBlock: WorkBlockProps, key) => {
            return (
              <WorkBlock
                {...workBlock}
                id={
                  `#${workBlock.works[0].workType}-work-block` as LocalTargets
                }
                theme={key % 2 === 0 ? "light" : "off-white"}
                key={key}
              />
            );
          })}
        </>
      )}
    </NavWrapperServer>
  );
}
