import { INotFound } from "@/data.d";
import { fetchPage } from "../api/fetchPage";
import { notFoundPageQuery } from "../api/generateSanityQueries";
import { NotFoundComp } from "@/components/pages/NotFound";

export default async function NotFound() {
  const notFoundQuery = notFoundPageQuery("en");
  const notFoundPageData: INotFound = await fetchPage(notFoundQuery);
  return <NotFoundComp data={notFoundPageData} locale={"en"} />;
}
