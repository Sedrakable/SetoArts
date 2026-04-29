// SetoArts - /src/app/api/sendContactFormEmail/route.ts
import {
  EncodedFileType,
  looksLikeBot,
  ContactFormData,
} from "@/components/reuse/Form/formTypes";
import { LangType } from "@/i18n/request";
import { NextResponse } from "next/server";
import { emailTranslations } from "@/langs/emailTranslations";
import { getTransporter } from "@/helpers/getTransporter";
import {
  getClientContactTemplate,
  getBusinessContactTemplate,
} from "./templates";

const prepareAttachments = (attachments: EncodedFileType[]) => {
  return attachments.map((attach) => ({
    filename: attach.name,
    content: Buffer.from(attach.data, "base64"),
    contentType: attach.type,
  }));
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

    const clientHtml = getClientContactTemplate(formData, locale);
    const businessHtml = getBusinessContactTemplate(formData, locale);

    await Promise.all([
      transporter.sendMail({
        from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
        to: formData.email,
        subject: emailTranslations[locale].subject,
        html: clientHtml,
        attachments,
      }),
      transporter.sendMail({
        from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
        to: process.env.EMAIL_BUSINESS,
        subject: `💬 New Contact Inquiry - ${formData.firstName} ${formData.lastName}`,
        html: businessHtml,
        attachments,
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
