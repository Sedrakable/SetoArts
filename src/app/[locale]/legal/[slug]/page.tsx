import React from "react";
import { ILegalPage, LocalPaths } from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";
import { legalPageQuery } from "@/app/api/generateSanityQueries";
import { LegalPageComp } from "@/components/pages/LegalPage/LegalPage";
import NavWrapperServer from "@/components/navbar/NavWrapper/NavWrapperServer";
import { redirect } from "next/navigation";

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: LangType; slug: string }>;
}) {
  const { locale, slug } = await params;
  const legalQuery = legalPageQuery(locale, slug);
  const legalPageData: ILegalPage = await fetchPage(legalQuery);

  if (!legalPageData) {
    redirect(`/${locale}${LocalPaths.HOME}`);
  }

  return (
    legalPageData && (
      <NavWrapperServer locale={locale} theme="light">
        <LegalPageComp {...legalPageData} />
      </NavWrapperServer>
    )
  );
}
