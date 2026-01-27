import {
  workPageQuery,
  workPageListQuery,
} from "@/app/api/generateSanityQueries";
import { fetchPage } from "@/app/api/fetchPage";
import { WorkModalContent } from "@/components/pages/blocks/WorkBlock/WorkModalContent";
import { Modal } from "@/components/reuse/Modal/Modal";
import { ISeo, IWork, LocalPaths } from "@/data.d";
import { redirect } from "next/navigation";
import { LangType } from "@/i18n/request";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";

export interface WorkProps extends IWork {
  meta: ISeo;
}

const getWorkPageData = async (slug: string): Promise<WorkProps | null> => {
  try {
    const workQuery = workPageQuery(slug);
    return await fetchPage(workQuery);
  } catch {
    return null;
  }
};

const getAllWorks = async (locale: LangType): Promise<IWork[]> => {
  try {
    const worksQuery = workPageListQuery(locale);
    return await fetchPage(worksQuery);
  } catch {
    return [];
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const path = `${LocalPaths.WORK}/${slug}`;
  const workPageData = await getWorkPageData(slug);

  return setMetadata({
    locale,
    metaTitle: workPageData?.meta.metaTitle || "Work | Seto X Arts",
    metaDesc: workPageData?.meta.metaDesc || "Explore our creative work.",
    path,
    crawl: true,
  });
}

export default async function WorkModal({
  params,
}: {
  params: Promise<{ slug: string; locale: LangType }>;
}) {
  const { slug, locale } = await params;
  const workPageData = await getWorkPageData(slug);
  const allWorks = await getAllWorks(locale); // Pass locale here

  if (!workPageData) {
    redirect(`/${locale}${LocalPaths.WORK}`);
  }

  return (
    workPageData && (
      <Modal currentSlug={slug} allWorks={allWorks}>
        <WorkModalContent {...workPageData} />
      </Modal>
    )
  );
}
