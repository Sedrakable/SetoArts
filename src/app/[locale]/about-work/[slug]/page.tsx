import { useFetchPage } from "@/app/api/useFetchPage";
import { setMetadata } from "@/components/SEO";
import { Modal } from "@/components/reuse/Modal";
import { ISeo, IWork, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n";
import { Metadata } from "next";

export interface WorkProps extends IWork {
  meta: ISeo;
}

const getWorkPageData = async (slug: string) => {
  const type = "work";
  const workQuery = `*[_type == '${type}' && slug.current == '${slug}'][0]{
    ...,
    meta,
  }`;
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

  return <Modal {...workPageData} />;
}
