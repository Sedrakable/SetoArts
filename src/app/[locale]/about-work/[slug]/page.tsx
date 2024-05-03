import { useFetchPage } from "@/app/api/useFetchPage";
import { Modal } from "@/components/reuse/Modal";
import { IWork } from "@/data.d";

export default async function WorkModal({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const workQuery = `*[_type == 'work' && slug.current == '${slug}'][0]`;
  const workData: IWork = await useFetchPage(workQuery, slug);

  return <Modal {...workData} />;
}
