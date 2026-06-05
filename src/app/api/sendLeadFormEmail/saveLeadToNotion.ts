import { Client } from "@notionhq/client";
import { LangType } from "@/i18n/request";
import { LeadFormData } from "@/components/leadForm/leadFormTypes";

const DATABASE_ID = "c3750471-fe52-4a92-b919-6ea53a66daff";

const buildPageBody = (formData: LeadFormData): string => {
  const goal = formData.goal === "other" ? formData.goalOther : formData.goal;
  const businessType =
    formData.businessType === "other"
      ? formData.businessTypeOther
      : formData.businessType;
  const size =
    formData.sizeKnowledge === "known-size"
      ? `${formData.width} x ${formData.height} ${formData.unit}`
      : formData.roughSize;

  return [
    "## Project Brief",
    "",
    `Main goal: ${goal}`,
    `Business type: ${businessType}`,
    `Install location: ${formData.installLocation}`,
    `Size: ${size}`,
    `Project info: ${formData.projectInfo}`,
    `Timeline: ${formData.timeline}`,
    `Budget: ${formData.budget}`,
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
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const today = new Date().toISOString().split("T")[0];

  await notion.pages.create({
    parent: { database_id: DATABASE_ID },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: `${formData.firstName} ${formData.lastName}`,
            },
          },
        ],
      },
      Status: {
        select: { name: "New" },
      },
      Source: {
        select: { name: "Ad Lead Form" },
      },
      "Date Received": {
        date: { start: today },
      },
      Phone: {
        phone_number: formData.phone,
      },
      Email: {
        email: formData.email,
      },
      "Business Name": {
        rich_text: [{ text: { content: formData.businessName } }],
      },
      "Preferred Contact": {
        select: { name: formData.preferredContact },
      },
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
              text: { content: buildPageBody(formData) },
            },
          ],
        },
      },
    ],
  });
}
