// app/api/sendTradeFormEmail/route.ts
import { looksLikeBot, TradeFormData } from "@/components/reuse/Form/formTypes";
import { LangType } from "@/i18n/request";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { emailTranslations } from "@/langs/emailTranslations";
import { getTransporter } from "@/helpers/getTransporter";

const loadTemplate = (filename: string) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "app",
    "api",
    "sendTradeFormEmail",
    filename,
  );
  try {
    return fs.readFileSync(templatePath, "utf8");
  } catch (error) {
    console.error(`Error loading template ${filename}:`, error);
    throw new Error(`Failed to load email template: ${filename}`);
  }
};

const generateClientEmailTemplate = (
  formData: TradeFormData,
  locale: LangType,
): string => {
  const t = emailTranslations[locale];
  let html = loadTemplate("tradeClientEmail.html");

  html = html
    .replaceAll("${locale}", locale)
    .replaceAll("${t.tradeTitle}", t.tradeTitle)
    .replaceAll(
      "${t.tradeGreeting(formData.firstName)}",
      t.tradeGreeting(formData.firstName),
    )
    .replaceAll("${t.tradeThankYouMessage}", t.tradeThankYouMessage)
    .replaceAll("${t.tradeDetails}", t.tradeDetails)
    .replaceAll("${t.regards}", t.regards)
    .replaceAll("${t.team}", t.team)
    .replaceAll("${formData.details}", formData.details);

  return html;
};

const businessEmailTemplate = (formData: TradeFormData, locale: LangType) => {
  let html = loadTemplate("tradeBusinessEmail.html");

  html = html
    .replaceAll("${locale}", locale.toUpperCase())
    .replaceAll("${formData.firstName}", formData.firstName)
    .replaceAll("${formData.lastName}", formData.lastName)
    .replaceAll("${formData.email}", formData.email)
    .replaceAll("${formData.details}", formData.details);

  return html;
};

export async function POST(request: Request) {
  try {
    const {
      formData,
      locale,
    }: { formData: TradeFormData; locale: LangType } = await request.json();

    if (looksLikeBot(formData)) {
      // pretend all good, but discard
      return NextResponse.json({ ok: true });
    }

    const transporter = getTransporter();

    const clientEmail = generateClientEmailTemplate(formData, locale);
    const businessEmail = businessEmailTemplate(formData, locale);

    await transporter.sendMail({
      from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
      to: formData.email,
      subject: emailTranslations[locale].tradeSubject,
      html: clientEmail,
    });

    await transporter.sendMail({
      from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
      to: process.env.EMAIL_BUSINESS,
      subject: `🤝 New Trade Program Inquiry - ${formData.firstName} ${formData.lastName}`,
      html: businessEmail,
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
