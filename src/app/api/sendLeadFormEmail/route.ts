import { after, NextResponse } from "next/server";
import { LangType } from "@/i18n/request";
import { LeadFormData } from "@/components/leadForm/leadFormTypes";
import { getTranslations } from "@/helpers/langUtils";
import { sendLeadEmails } from "./leadEmailDelivery";

const looksLikeLeadBot = (formData: LeadFormData) => {
  return Boolean(formData.company?.trim());
};

const getMissingRequiredFields = (formData: LeadFormData) => {
  const requiredFields: (keyof LeadFormData)[] = [
    "firstName",
    "email",
    "phone",
    "projectInfo",
  ];

  return requiredFields.filter((field) => !formData[field]?.toString().trim());
};

export async function POST(request: Request) {
  try {
    const {
      formData,
      locale,
    }: { formData: LeadFormData; locale: LangType } = await request.json();
    const translations = getTranslations(locale).leadForm;

    if (looksLikeLeadBot(formData)) return NextResponse.json({ ok: true });

    const missingFields = getMissingRequiredFields(formData);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: translations.errors.missingRequiredLeadFields,
          fields: missingFields,
        },
        { status: 400 },
      );
    }

    after(async () => {
      try {
        await sendLeadEmails(formData, locale);
      } catch (error) {
        console.error("Lead email background send failed:", error);
      }
    });

    return NextResponse.json({
      message: translations.errors.submittedSuccessfully,
    });
  } catch (error) {
    console.error("Lead form server error:", error);
    return NextResponse.json(
      {
        error: getTranslations("en").leadForm.errors.failedToSubmitLead,
        details: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
