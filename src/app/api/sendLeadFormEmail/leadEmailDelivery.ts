import { getTransporter } from "@/helpers/getTransporter";
import { LangType } from "@/i18n/request";
import { LeadFormData, LeadUpload } from "@/components/leadForm/leadFormTypes";
import {
  getLeadBusinessTemplate,
  getLeadClientTemplate,
  getLeadEmailSubjects,
} from "./templates";

interface LeadEmailTransporter {
  sendMail: (options: Record<string, unknown>) => Promise<unknown>;
}

export const prepareLeadAttachments = (attachments: LeadUpload[]) => {
  return attachments.map((attach) => ({
    filename: attach.name,
    content: Buffer.from(attach.data, "base64"),
    contentType: attach.type,
  }));
};

export const sendLeadEmails = async (
  formData: LeadFormData,
  locale: LangType,
  transporter: LeadEmailTransporter = getTransporter(),
) => {
  const attachments = prepareLeadAttachments(formData.uploads || []);
  const clientHtml = getLeadClientTemplate(formData, locale);
  const businessHtml = getLeadBusinessTemplate(formData, locale);
  const subjects = getLeadEmailSubjects(formData, locale);

  await Promise.all([
    transporter.sendMail({
      from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
      to: formData.email,
      subject: subjects.client,
      html: clientHtml,
    }),
    transporter.sendMail({
      from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
      to: process.env.EMAIL_BUSINESS,
      subject: subjects.business,
      html: businessHtml,
      attachments,
    }),
  ]);
};
