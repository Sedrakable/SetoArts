import { workPageQuery } from "@/app/api/generateSanityQueries";
import { fetchPage } from "@/app/api/fetchPage";
import { WorkModalContent } from "@/components/pages/blocks/WorkBlock/WorkModalContent";
import { Modal } from "@/components/reuse/Modal/Modal";
import { ISeo, IWork, LocalPaths } from "@/data.d";
import { redirect } from "next/navigation";
import { LangType } from "@/i18n";

export interface WorkProps extends IWork {
  meta: ISeo;
}

const getWorkPageData = async (slug: string) => {
  const workQuery = workPageQuery(slug);

  const workData: WorkProps = await fetchPage(workQuery);

  return workData;
};

// export async function generateMetadata({
//   params: { locale, slug },
// }: {
//   params: { locale: LangType; slug: string };
// }): Promise<Metadata> {
//   const workPageData: WorkProps = await getWorkPageData(slug);
//   const path = `${LocalPaths.ABOUT}/${slug}`;
//   const crawl = true;

//   return setMetadata({
//     locale,
//     metaTitle: workPageData.meta.metaTitle,
//     metaDesc: workPageData.meta.metaDesc,
//     metaKeywords: workPageData.meta.metaKeywords,
//     path,
//     crawl,
//   });
// }

export default async function WorkModal({
  params,
}: {
  params: Promise<{ slug: string; locale: LangType }>;
}) {
  const { slug, locale } = await params;
  const workPageData: WorkProps = await getWorkPageData(slug);

  if (!workPageData) {
    redirect(`/${locale}${LocalPaths.ABOUT}`);
  }

  return (
    workPageData && (
      <Modal>
        <WorkModalContent {...workPageData} />
      </Modal>
    )
  );
}
