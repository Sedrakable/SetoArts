import { Metadata } from "next";
import { LeadFormThankYou } from "@/components/leadForm/LeadFormThankYou";
import { LangType } from "@/i18n/request";
import { getTranslations } from "@/helpers/langUtils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getTranslations(locale).leadForm.metadata;

  return {
    title: metadata.completeTitle,
    description: metadata.completeDescription,
  };
}

export default async function LeadRequestCompletePage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  const { locale } = await params;
  return <LeadFormThankYou locale={locale} variant="complete" />;
}
