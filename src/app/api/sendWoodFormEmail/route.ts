import {
  EncodedFileType,
  WoodFormData,
} from "@/components/reuse/Form/formTypes";
import { LangType } from "@/i18n";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Prepare images as attachments and link them via CID
const prepareAttachments = (attachments: EncodedFileType[]) => {
  return attachments.map((attach) => ({
    filename: attach.name,
    content: Buffer.from(attach.data, "base64"),
    contentType: attach.type, // Use the file name as the CID for each image
  }));
};

// Fixed template loading function
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

const emailTranslations = {
  en: {
    subject: "Seto x Arts | Your Custom LED Wood Sign Inquiry 💡",
    title: "Your Custom LED Wood Sign Inquiry",
    greeting: (name: string) => `Hey ${name},`,
    thankYouMessage: (name: string) =>
      `Appreciate you reaching out! I’m Seto, the guy behind Seto x Arts. I’ll be checking out your request and hitting you up soon to go over the details, pricing, and what’s possible. Keep an eye on your inbox (and maybe your spam folder, just in case).`,
    signDetails: "Project Breakdown:",
    dimensions: "Size:",
    budget: "Your Budget Range:",
    additionalInfo: "Extra Details:",
    regards: "Catch you soon,",
    team: "Seto – Seto x Arts",
  },
};

// 2. Adjust the client email template to match your WoodFormData
const generateClientEmailTemplate = (
  formData: WoodFormData,
  locale: LangType
): string => {
  const t = emailTranslations[locale]; // e.g. 'en'
  let html = loadTemplate("woodClientEmail.html");

  // Replace placeholders dynamically
  html = html
    // Replace locale
    .replaceAll("${locale}", locale)

    // Replace translation placeholders
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

    // Replace form data placeholders
    .replaceAll("${formData.details}", formData.details)
    .replaceAll("${formData.width}", formData.width.toString())
    .replaceAll("${formData.height}", formData.height.toString())
    .replaceAll("${formData.budgetMin}", formData.budgetMin.toString())
    .replaceAll("${formData.budgetMax}", formData.budgetMax.toString());

  return html;
};

const businessEmailTemplate = (formData: WoodFormData, locale: LangType) => {
  let html = loadTemplate("woodBusinessEmail.html");

  // Replace placeholders dynamically
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

// 4. Final POST function changes
export async function POST(request: Request) {
  try {
    const {
      formData,
      locale,
    }: { formData: WoodFormData; locale: LangType } = await request.json();

    const attachments = prepareAttachments(formData.uploads);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_BUSINESS,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Client email
    const clientEmail = generateClientEmailTemplate(formData, locale);

    // Business email
    const businessEmail = businessEmailTemplate(formData, locale);

    // Send to client
    await transporter.sendMail({
      from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
      to: formData.email,
      subject: emailTranslations[locale].subject,
      html: clientEmail,
      attachments,
    });

    // Send to business
    await transporter.sendMail({
      from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
      to: process.env.EMAIL_BUSINESS,
      subject: `💡💡New Wood Sign Inquiry - ${formData.firstName} ${formData.lastName}💡💡`,
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
