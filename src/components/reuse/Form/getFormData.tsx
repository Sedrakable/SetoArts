import { formQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";

export const getFormData = async (slug: string, locale: LangType) => {
  const query = formQuery(slug, locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = await useFetchPage(query);
  return data;
};
