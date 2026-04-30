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
    title: metadata.callBookedTitle,
    description: metadata.callBookedDescription,
  };
}

export default async function LeadCallBookedPage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  const { locale } = await params;
  return <LeadFormThankYou locale={locale} variant="booked" />;
}
