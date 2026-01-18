import { IAbout, IWorkBlock, ISeo, LocalPaths } from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { aboutPageQuery } from "@/app/api/generateSanityQueries";
import { About } from "@/components/pages/blocks/About/About";
import NavWrapperServer from "@/components/navbar/NavWrapper/NavWrapperServer";

export interface AboutPageProps {
  meta: ISeo;
  about: IAbout;
  workBlocks: IWorkBlock[];
}

const getAboutPageData = async (locale: LangType) => {
  const aboutQuery = aboutPageQuery(locale);

  const aboutPageData: AboutPageProps = await fetchPage(aboutQuery);
  return aboutPageData;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = LocalPaths.ABOUT;
  const crawl = true;
  const aboutPageData = await getAboutPageData(locale);
  const { metaTitle, metaDesc } = aboutPageData.meta;

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
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
      {data && <>{data.about && <About {...data.about} />}</>}
    </NavWrapperServer>
  );
}
