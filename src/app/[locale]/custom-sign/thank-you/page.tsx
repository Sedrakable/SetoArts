import { Metadata } from "next";
import { LeadFormThankYou } from "@/components/leadForm/LeadFormThankYou";
import { MetaPixelEvent } from "@/components/MetaPixelEvent";
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
    title: metadata.thankYouTitle,
    description: metadata.thankYouDescription,
  };
}

export default async function LeadThankYouPage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  const { locale } = await params;
  return (
    <>
      <MetaPixelEvent eventName="Lead" />
      <LeadFormThankYou locale={locale} variant="book" />
    </>
  );
}
