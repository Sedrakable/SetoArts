// SetoArts - /src/app/api/sendTradeFormEmail/route.ts
import { looksLikeBot, TradeFormData } from "@/components/reuse/Form/formTypes";
import { LangType } from "@/i18n/request";
import { NextResponse } from "next/server";
import { emailTranslations } from "@/langs/emailTranslations";
import { getTransporter } from "@/helpers/getTransporter";
import { getTradeClientTemplate, getTradeBusinessTemplate } from "./templates";

export async function POST(request: Request) {
  try {
    const {
      formData,
      locale,
    }: { formData: TradeFormData; locale: LangType } = await request.json();

    if (looksLikeBot(formData)) return NextResponse.json({ ok: true });

    const transporter = getTransporter();
    const clientHtml = getTradeClientTemplate(formData, locale);
    const businessHtml = getTradeBusinessTemplate(formData, locale);

    await Promise.all([
      transporter.sendMail({
        from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
        to: formData.email,
        subject: emailTranslations[locale].tradeSubject,
        html: clientHtml,
      }),
      transporter.sendMail({
        from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
        to: process.env.EMAIL_BUSINESS,
        subject: `🤝 New Trade Program Inquiry - ${formData.firstName} ${formData.lastName}`,
        html: businessHtml,
      }),
    ]);

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to send emails", details: (error as Error).message },
      { status: 500 },
    );
  }
}
