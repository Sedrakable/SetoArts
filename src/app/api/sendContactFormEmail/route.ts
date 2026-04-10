// /src/app/api/sendContactFormEmail/route.ts

import {
  EncodedFileType,
  looksLikeBot,
  ContactFormData,
} from "@/components/reuse/Form/formTypes";
import { LangType } from "@/i18n/request";
import { NextResponse } from "next/server";
import { emailTranslations } from "@/langs/emailTranslations";
import { getTransporter } from "@/helpers/getTransporter";
// IMPORT YOUR TEMPLATES HERE
import { businessTemplate, clientTemplate } from "./templates";

const prepareAttachments = (attachments: EncodedFileType[]) => {
  return attachments.map((attach) => ({
    filename: attach.name,
    content: Buffer.from(attach.data, "base64"),
    contentType: attach.type,
  }));
};

const generateClientEmailTemplate = (
  formData: ContactFormData,
  locale: LangType,
): string => {
  const t = emailTranslations[locale];
  // USE THE IMPORTED STRING DIRECTLY
  let html = clientTemplate;

  html = html
    .replaceAll("${locale}", locale)
    .replaceAll("${t.title}", t.title)
    .replaceAll("${t.signDetails}", t.signDetails) // Added this for you
    .replaceAll(
      "${t.greeting(formData.firstName)}",
      t.greeting(formData.firstName),
    )
    .replaceAll(
      "${t.thankYouMessage(formData.firstName)}",
      t.thankYouMessage(formData.firstName),
    )
    .replaceAll("${t.dimensions}", t.dimensions)
    .replaceAll("${t.budget}", t.budget)
    .replaceAll("${t.regards}", t.regards)
    .replaceAll("${t.team}", t.team)
    .replaceAll("${formData.details}", formData.details)
    .replaceAll("${formData.budgetMin}", formData.budgetMin.toString())
    .replaceAll("${formData.budgetMax}", formData.budgetMax.toString());

  if (formData.width && formData.height) {
    html = html
      .replaceAll("${formData.width}", formData.width.toString())
      .replaceAll("${formData.height}", formData.height.toString());
  } else {
    html = html
      .replaceAll("${formData.width}", "N/A")
      .replaceAll("${formData.height}", "N/A");
  }

  return html;
};

const businessEmailTemplate = (formData: ContactFormData, locale: LangType) => {
  // USE THE IMPORTED STRING DIRECTLY
  let html = businessTemplate;

  html = html
    .replaceAll("${locale}", locale.toUpperCase())
    .replaceAll("${formData.firstName}", formData.firstName)
    .replaceAll("${formData.lastName}", formData.lastName)
    .replaceAll("${formData.email}", formData.email)
    .replaceAll("${formData.details}", formData.details)
    .replaceAll("${formData.budgetMin}", formData.budgetMin.toString())
    .replaceAll("${formData.budgetMax}", formData.budgetMax.toString());

  if (formData.width && formData.height) {
    html = html
      .replaceAll("${formData.width}", formData.width.toString())
      .replaceAll("${formData.height}", formData.height.toString());
  } else {
    html = html
      .replaceAll("${formData.width}", "N/A")
      .replaceAll("${formData.height}", "N/A");
  }

  return html;
};

export async function POST(request: Request) {
  try {
    const {
      formData,
      locale,
    }: { formData: ContactFormData; locale: LangType } = await request.json();

    if (looksLikeBot(formData)) return NextResponse.json({ ok: true });

    const attachments = prepareAttachments(formData.uploads);
    const transporter = getTransporter();

    const clientEmail = generateClientEmailTemplate(formData, locale);
    const businessEmail = businessEmailTemplate(formData, locale);

    await transporter.sendMail({
      from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
      to: formData.email,
      subject: emailTranslations[locale].subject,
      html: clientEmail,
      attachments,
    });

    await transporter.sendMail({
      from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
      to: process.env.EMAIL_BUSINESS,
      subject: `💬 New Contact Inquiry - ${formData.firstName} ${formData.lastName}`,
      html: businessEmail,
      attachments,
    });

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to send emails", details: (error as Error).message },
      { status: 500 },
    );
  }
}
