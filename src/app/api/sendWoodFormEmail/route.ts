// app/api/sendWoodFormEmail/route.ts
import {
  EncodedFileType,
  looksLikeBot,
  WoodFormData,
} from "@/components/reuse/Form/formTypes";
import { LangType } from "@/i18n/request";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { emailTranslations } from "@/langs/emailTranslations";
import { getTransporter } from "@/helpers/getTransporter";

const prepareAttachments = (attachments: EncodedFileType[]) => {
  return attachments.map((attach) => ({
    filename: attach.name,
    content: Buffer.from(attach.data, "base64"),
    contentType: attach.type,
  }));
};

const loadTemplate = (filename: string) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "app",
    "api",
    "sendWoodFormEmail",
    filename
  );
  try {
    return fs.readFileSync(templatePath, "utf8");
  } catch (error) {
    console.error(`Error loading template ${filename}:`, error);
    throw new Error(`Failed to load email template: ${filename}`);
  }
};

const generateClientEmailTemplate = (
  formData: WoodFormData,
  locale: LangType
): string => {
  const t = emailTranslations[locale]["wood-sign"];
  let html = loadTemplate("woodClientEmail.html");

  html = html
    .replaceAll("${locale}", locale)
    .replaceAll("${t.title}", t.title)
    .replaceAll(
      "${t.greeting(formData.firstName)}",
      t.greeting(formData.firstName)
    )
    .replaceAll(
      "${t.thankYouMessage(formData.firstName)}",
      t.thankYouMessage(formData.firstName)
    )
    .replaceAll("${t.signDetails}", t.signDetails)
    .replaceAll("${t.dimensions}", t.dimensions)
    .replaceAll("${t.budget}", t.budget)
    .replaceAll("${t.additionalInfo}", t.additionalInfo)
    .replaceAll("${t.regards}", t.regards)
    .replaceAll("${t.team}", t.team)
    .replaceAll("${formData.details}", formData.details)
    .replaceAll("${formData.width}", formData.width.toString())
    .replaceAll("${formData.height}", formData.height.toString())
    .replaceAll("${formData.budgetMin}", formData.budgetMin.toString())
    .replaceAll("${formData.budgetMax}", formData.budgetMax.toString());

  return html;
};

const businessEmailTemplate = (formData: WoodFormData, locale: LangType) => {
  let html = loadTemplate("woodBusinessEmail.html");

  html = html
    .replaceAll("${locale}", locale.toUpperCase())
    .replaceAll("${formData.firstName}", formData.firstName)
    .replaceAll("${formData.lastName}", formData.lastName)
    .replaceAll("${formData.email}", formData.email)
    .replaceAll("${formData.details}", formData.details)
    .replaceAll("${formData.width}", formData.width.toString())
    .replaceAll("${formData.height}", formData.height.toString())
    .replaceAll("${formData.budgetMin}", formData.budgetMin.toString())
    .replaceAll("${formData.budgetMax}", formData.budgetMax.toString());

  return html;
};

export async function POST(request: Request) {
  try {
    const {
      formData,
      locale,
    }: { formData: WoodFormData; locale: LangType } = await request.json();
    if (looksLikeBot(formData)) {
      // pretend all good, but discard
      return NextResponse.json({ ok: true });
    }
    const attachments = prepareAttachments(formData.uploads);

    const transporter = getTransporter();

    const clientEmail = generateClientEmailTemplate(formData, locale);
    const businessEmail = businessEmailTemplate(formData, locale);

    await transporter.sendMail({
      from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
      to: formData.email,
      subject: emailTranslations[locale]["wood-sign"].subject,
      html: clientEmail,
      attachments,
    });

    await transporter.sendMail({
      from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
      to: process.env.EMAIL_BUSINESS,
      subject: `💡 New Wood Sign Inquiry - ${formData.firstName} ${formData.lastName}`,
      html: businessEmail,
      attachments,
    });

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to send emails", details: (error as Error).message },
      { status: 500 }
    );
  }
}
