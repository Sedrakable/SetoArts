import { formQuery } from "@/app/api/generateSanityQueries";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n";

export const getFormData = async (slug: string, locale: LangType) => {
  const query = formQuery(slug, locale);
   
  const data = await fetchPage(query);
  return data;
};
