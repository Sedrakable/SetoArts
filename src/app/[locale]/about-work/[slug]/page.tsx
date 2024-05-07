import { workPageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { setMetadata } from "@/components/SEO";
import { ISeo, IWork, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export interface WorkProps extends IWork {
  meta: ISeo;
}

const Modal = dynamic(
  () => import("@/components/reuse/Modal").then((module) => module.Modal),
  {
    ssr: false,
  }
);

const getWorkPageData = async (slug: string) => {
  const type = "work";
  const workQuery = workPageQuery(slug);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const workData: WorkProps = await useFetchPage(workQuery, `${type}-${slug}`);

  return workData;
};

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}): Promise<Metadata> {
  const workPageData: WorkProps = await getWorkPageData(slug);
  const path = `${LocalPaths.ABOUT}/${slug}`;
  const crawl = true;

  return setMetadata({
    locale,
    metaTitle: workPageData.meta.metaTitle,
    metaDesc: workPageData.meta.metaDesc,
    metaKeywords: workPageData.meta.metaKeywords,
    path,
    crawl,
  });
}

export default async function WorkModal({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const workPageData: WorkProps = await getWorkPageData(slug);

  return workPageData && <Modal {...workPageData} />;
}
