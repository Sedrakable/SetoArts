import { NextResponse } from "next/server";
import { LangType } from "@/i18n/request";
import { LeadFormData } from "@/components/leadForm/leadFormTypes";
import { getTranslations } from "@/helpers/langUtils";
import { sendLeadEmails } from "./leadEmailDelivery";
import { saveLeadToNotion } from "./saveLeadToNotion";

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

    await sendLeadEmails(formData, locale);

    // Awaited (not fire-and-forget) so it actually runs to completion on
    // serverless, where pending background work is killed once the response
    // returns. Wrapped so a Notion failure is logged but never blocks the
    // lead — the emails above are the source of truth.
    try {
      await saveLeadToNotion(formData, locale);
    } catch (err) {
      console.error("Notion save failed:", err);
    }

    return NextResponse.json({
      message: translations.errors.submittedSuccessfully,
    });
  } catch (error) {
    console.error("Lead form server error:", error);
    return NextResponse.json(
      {
        error: getTranslations("en").leadForm.errors.failedToSubmitLead,
      },
      { status: 500 },
    );
  }
}
