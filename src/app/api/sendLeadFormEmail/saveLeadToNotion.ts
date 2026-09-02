import { Client } from "@notionhq/client";
import { LangType } from "@/i18n/request";
import { LeadFormData } from "@/components/leadForm/leadFormTypes";
import { getTranslations } from "@/helpers/langUtils";
import {
  getLeadSizeSummary,
  getNormalizedLeadDetails,
} from "@/components/leadForm/leadFormReview";

// Overridable via env so the target database isn't hard-coded to one workspace.
const DATABASE_ID =
  process.env.NOTION_LEADS_DATABASE_ID ||
  "c3750471-fe52-4a92-b919-6ea53a66daff";

// Days out to set the initial "Follow-up Date" for a fresh lead. This is the
// "they haven't booked a call yet" default; when call booking is automated
// later, a booked lead's follow-up gets overwritten with the actual call date.
const FOLLOW_UP_DAYS = Number(process.env.NOTION_LEAD_FOLLOWUP_DAYS) || 1;

// The form's contact-preference slugs -> the exact "Preferred Contact" select
// options that exist in the Lead Tracker. "no-preference" has no matching
// option, so it's left blank rather than creating a junk option.
const PREFERRED_CONTACT_TO_NOTION: Record<string, string> = {
  "phone-call": "Phone",
  "text-message": "Text",
  email: "Email",
};

const addDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

const buildPageBody = (formData: LeadFormData, locale: LangType): string => {
  const translations = getTranslations(locale).leadForm;
  const details = getNormalizedLeadDetails(formData, translations);

  return [
    "## Project Brief",
    "",
    `Main goal: ${details.goal}`,
    `Business type: ${details.businessType}`,
    `Install location: ${details.installLocation}`,
    `Size: ${getLeadSizeSummary(formData, translations)}`,
    `Project info: ${formData.projectInfo}`,
    `Timeline: ${details.timeline}`,
    `Budget: ${details.budget}`,
    "",
    "---",
    "",
    "## Notes",
  ].join("\n");
};

export async function saveLeadToNotion(
  formData: LeadFormData,
  locale: LangType,
): Promise<void> {
  if (!process.env.NOTION_API_KEY) {
    throw new Error(
      "NOTION_API_KEY is not set — lead was emailed but not saved to Notion.",
    );
  }

  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const today = addDays(0);
  const fullName = `${formData.firstName} ${formData.lastName}`.trim();
  const preferredContact =
    PREFERRED_CONTACT_TO_NOTION[formData.preferredContact];

  try {
    await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Name: {
          title: [{ text: { content: fullName || formData.email } }],
        },
        // "Status" is a status-type property (NOT select) — this shape is
        // required or Notion rejects the whole page with a validation_error.
        Status: {
          status: { name: "New" },
        },
        Source: {
          select: { name: "Ad Lead Form" },
        },
        "Date Received": {
          date: { start: today },
        },
        "Follow-up Date": {
          date: { start: addDays(FOLLOW_UP_DAYS) },
        },
        Phone: {
          phone_number: formData.phone || null,
        },
        Email: {
          email: formData.email || null,
        },
        "Business Name": {
          rich_text: [{ text: { content: formData.businessName || "" } }],
        },
        // Only set when it maps to a real option, so Notion never gets an
        // empty or invented select value.
        ...(preferredContact
          ? {
              "Preferred Contact": {
                select: { name: preferredContact },
              },
            }
          : {}),
        Language: {
          select: { name: locale.toUpperCase() },
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: { content: buildPageBody(formData, locale) },
              },
            ],
          },
        },
      ],
    });
  } catch (error) {
    // Surface Notion's own code/message so failures are diagnosable in logs
    // (e.g. "unauthorized", "object_not_found", "validation_error").
    const code =
      error && typeof error === "object" && "code" in error
        ? (error as { code?: string }).code
        : undefined;
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Notion pages.create failed (db ${DATABASE_ID}${
        code ? `, code ${code}` : ""
      }): ${message}`,
    );
  }
}
