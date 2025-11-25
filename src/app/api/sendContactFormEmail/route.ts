// app/api/sendContactFormEmail/route.ts
import {
  EncodedFileType,
  ContactFormData,
  FormServiceType,
  looksLikeBot,
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

const loadTemplate = (
  service: ContactFormData["service"],
  filename: string
) => {
  const basePath =
    service === "wood-sign" ? "sendWoodFormEmail" : "sendDigitalFormEmail";
  const templatePath = path.join(
    process.cwd(),
    "src",
    "app",
    "api",
    basePath,
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
  formData: ContactFormData,
  locale: LangType
): string => {
  const serviceKey: FormServiceType =
    formData.service === "wood-sign" ? "wood-sign" : formData.service;
  const t = emailTranslations[locale][serviceKey];
  const templateFile =
    formData.service === "wood-sign"
      ? "woodClientEmail.html"
      : "digitalClientEmail.html";
  let html = loadTemplate(formData.service, templateFile);

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
    .replaceAll(
      formData.service === "wood-sign"
        ? "${t.signDetails}"
        : "${t.projectDetails}",
      formData.service === "wood-sign" ? t.signDetails : t.projectDetails
    )
    .replaceAll(
      formData.service === "wood-sign" ? "${t.dimensions}" : "${t.budget}",
      formData.service === "wood-sign" ? t.dimensions : t.budget
    )
    .replaceAll("${t.budget}", t.budget)
    .replaceAll("${t.additionalInfo}", t.additionalInfo)
    .replaceAll("${t.regards}", t.regards)
    .replaceAll("${t.team}", t.team)
    .replaceAll("${formData.details}", formData.details)
    .replaceAll("${formData.budgetMin}", formData.budgetMin.toString())
    .replaceAll("${formData.budgetMax}", formData.budgetMax.toString());

  if (formData.service === "wood-sign") {
    html = html
      .replaceAll("${formData.width}", formData.width?.toString() || "")
      .replaceAll("${formData.height}", formData.height?.toString() || "");
  }

  return html;
};

const businessEmailTemplate = (formData: ContactFormData, locale: LangType) => {
  const templateFile =
    formData.service === "wood-sign"
      ? "woodBusinessEmail.html"
      : "digitalBusinessEmail.html";
  let html = loadTemplate(formData.service, templateFile);

  html = html
    .replaceAll("${locale}", locale.toUpperCase())
    .replaceAll("${formData.firstName}", formData.firstName)
    .replaceAll("${formData.lastName}", formData.lastName)
    .replaceAll("${formData.email}", formData.email)
    .replaceAll("${formData.service}", formData.service)
    .replaceAll("${formData.details}", formData.details)
    .replaceAll("${formData.budgetMin}", formData.budgetMin.toString())
    .replaceAll("${formData.budgetMax}", formData.budgetMax.toString());

  if (formData.service === "wood-sign") {
    html = html
      .replaceAll("${formData.width}", formData.width?.toString() || "")
      .replaceAll("${formData.height}", formData.height?.toString() || "");
  }

  return html;
};

export async function POST(request: Request) {
  try {
    const {
      formData,
      locale,
    }: { formData: ContactFormData; locale: LangType } = await request.json();
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
      subject: emailTranslations[locale][formData.service].subject,
      html: clientEmail,
      attachments,
    });

    await transporter.sendMail({
      from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
      to: process.env.EMAIL_BUSINESS,
      subject: `${formData.service === "wood-sign" ? "💡" : "🚀"} New ${
        formData.service
      } Inquiry - ${formData.firstName} ${
        formData.lastName
      } [${locale.toUpperCase()}]`,
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
