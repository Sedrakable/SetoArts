import { workPageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { WorkModalContent } from "@/components/pages/blocks/WorkBlock/WorkModalContent";
import { Modal } from "@/components/reuse/Modal/Modal";
import { ISeo, IWork } from "@/data.d";

export interface WorkProps extends IWork {
  meta: ISeo;
}

const getWorkPageData = async (slug: string) => {
  const type = "work";
  const workQuery = workPageQuery(slug);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const workData: WorkProps = await useFetchPage(workQuery, `${type}-${slug}`);

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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workPageData: WorkProps = await getWorkPageData(slug);

  return (
    workPageData && (
      <Modal>
        <WorkModalContent {...workPageData} />
      </Modal>
    )
  );
}
