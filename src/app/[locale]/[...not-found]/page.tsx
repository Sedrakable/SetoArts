import { notFoundPageQuery } from "@/app/api/generateSanityQueries";
import { fetchPage } from "@/app/api/fetchPage";
import { NotFoundComp } from "@/components/pages/NotFound";
import { INotFound } from "@/data.d";
import { LangType } from "@/i18n/request";
import NavWrapperServer from "@/components/navbar/NavWrapper/NavWrapperServer";

export default async function NotFound({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  const { locale } = await params;
  const notFoundQuery = notFoundPageQuery("en");
  const notFoundPageData: INotFound = await fetchPage(notFoundQuery);
  return (
    <NavWrapperServer locale={locale} theme="light">
      <NotFoundComp data={notFoundPageData} locale={"en"} />
    </NavWrapperServer>
  );
}
