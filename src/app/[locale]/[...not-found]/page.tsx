import { useFetchPage } from "@/app/api/useFetchPage";
import { INotFound } from "@/data.d";
import { LangType } from "@/i18n";
import { NotFoundComp } from "../not-found";

export default async function NotFound({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const type = "notFoundPage";
  const notFoundQuery = `*[_type == '${type}' && lang == '${locale}'][0]`;
  const notFoundPageData: INotFound = await useFetchPage(notFoundQuery, type);
  return <NotFoundComp data={notFoundPageData} locale={locale} />;
}
