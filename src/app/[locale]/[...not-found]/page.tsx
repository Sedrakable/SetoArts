import { notFoundPageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { INotFound } from "@/data.d";
import dynamic from "next/dynamic";

const NotFoundComp = dynamic(
  () =>
    import("@/components/pages/NotFound").then((module) => module.NotFoundComp),
  {
    ssr: false,
  }
);

export default async function NotFound() {
  const type = "notFoundPage";
  const notFoundQuery = notFoundPageQuery("en");
  const notFoundPageData: INotFound = await useFetchPage(notFoundQuery, type);
  return <NotFoundComp data={notFoundPageData} locale={"en"} />;
}
