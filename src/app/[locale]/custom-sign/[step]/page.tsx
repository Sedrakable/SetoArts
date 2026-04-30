import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LeadForm } from "@/components/leadForm/LeadForm";
import { getTranslations } from "@/helpers/langUtils";
import {
  isLeadFormStep,
  leadFormSteps,
  LeadFormStep,
} from "@/components/leadForm/leadFormTypes";
import { LangType } from "@/i18n/request";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getTranslations(locale).leadForm.metadata;

  return {
    title: metadata.formTitle,
    description: metadata.formDescription,
  };
}

export function generateStaticParams() {
  return leadFormSteps.flatMap((step) =>
    ["en", "fr"].map((locale) => ({ locale, step })),
  );
}

export default async function CustomSignStepPage({
  params,
}: {
  params: Promise<{ locale: LangType; step: string }>;
}) {
  const { locale, step } = await params;

  if (step === "index") redirect(`/${locale}/custom-sign/goal`);
  if (!isLeadFormStep(step)) notFound();

  return <LeadForm locale={locale} step={step as LeadFormStep} />;
}
