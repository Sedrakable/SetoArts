import { INotFound } from "@/data.d";
import { useFetchPage } from "../api/useFetchPage";
import { notFoundPageQuery } from "../api/generateSanityQueries";
import { NotFoundComp } from "@/components/pages/NotFound";

export default async function NotFound() {
  const type = "notFoundPage";
  const notFoundQuery = notFoundPageQuery("en");
  const notFoundPageData: INotFound = await useFetchPage(notFoundQuery, type);
  return <NotFoundComp data={notFoundPageData} locale={"en"} />;
}
