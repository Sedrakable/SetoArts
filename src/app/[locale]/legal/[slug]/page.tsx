import React from "react";
import { ILegalPage } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { legalPageQuery } from "@/app/api/generateSanityQueries";
import { LegalPageComp } from "@/components/pages/LegalPage/LegalPage";

export default async function LegalPage({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}) {
  const legalQuery = legalPageQuery(locale, slug);
  const legalPageData: ILegalPage = await useFetchPage(legalQuery, slug);
  return legalPageData && <LegalPageComp {...legalPageData} />;
}
