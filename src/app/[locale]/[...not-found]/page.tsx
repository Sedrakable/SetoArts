import { notFoundPageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { NotFoundComp } from "@/components/pages/NotFound";
import { INotFound } from "@/data.d";

export default async function NotFound() {
  const type = "notFoundPage";
  const notFoundQuery = notFoundPageQuery("en");
  const notFoundPageData: INotFound = await useFetchPage(notFoundQuery, type);
  return <NotFoundComp data={notFoundPageData} locale={"en"} />;
}
