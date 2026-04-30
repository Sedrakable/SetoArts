import {
  getLeadSizeSummary,
  getNormalizedLeadDetails,
} from "@/components/leadForm/leadFormReview";
import { LeadFormData } from "@/components/leadForm/leadFormTypes";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n/request";

const escapeHtml = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const emailShell = ({
  children,
  copyright,
  locale,
  title,
}: {
  children: string;
  copyright: string;
  locale: LangType;
  title: string;
}) => `
<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Outfit',Arial,sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f5f5f5;padding:20px">
      <tr>
        <td align="center">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:650px">
            <tr>
              <td align="center" style="padding:10px;background-color:#feb201;border-top-left-radius:16px;border-top-right-radius:16px;">
                <h1 style="margin:0;color:#ffffff;font-size:48px;font-weight:700;text-transform:uppercase;">Seto X Arts</h1>
              </td>
            </tr>
            <tr>
              <td style="background-color:#ffffff;padding:40px;box-shadow:0 4px 8px rgba(0,0,0,0.1);">
                ${children}
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:20px;background-color:#feb201;border-bottom-left-radius:16px;border-bottom-right-radius:16px;color:#ffffff;">
                <p style="margin:0;font-size:14px">${escapeHtml(copyright)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const detailBlock = (title: string, value?: string) => {
  if (!value) return "";

  return `
    <tr>
      <td style="padding-bottom:20px">
        <div style="border-left:4px solid #feb201;padding-left:15px;">
          <h3 style="margin:0 0 8px 0;color:#333333;font-size:18px;font-weight:700;">${escapeHtml(
            title,
          )}</h3>
          <p style="margin:0;color:#555555;font-size:16px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(
            value,
          )}</p>
        </div>
      </td>
    </tr>`;
};

const inlineRow = (label: string, value?: string) => {
  if (!value) return "";

  return `<p style="margin:0 0 6px 0;color:#333333;font-size:16px;">${escapeHtml(
    label,
  )}: <strong>${escapeHtml(value)}</strong></p>`;
};

export const getLeadBusinessTemplate = (
  formData: LeadFormData,
  locale: LangType,
) => {
  const translations = getTranslations(locale).leadForm;
  const email = translations.email;
  const details = getNormalizedLeadDetails(formData, translations);
  const uploads = formData.uploads.length
    ? email.filesAttached(formData.uploads.length)
    : email.noFilesUploaded;
  const name = `${formData.firstName} ${formData.lastName}`.trim();

  return emailShell({
    copyright: email.copyright,
    locale,
    title: email.businessTitle,
    children: `
      <h2 style="color:#0f0f0f;font-weight:700;text-transform:uppercase;margin:0 0 25px 0;font-size:24px;border-bottom:2px solid #feb201;padding-bottom:10px;">${escapeHtml(
        email.businessHeading,
      )}</h2>
      <div style="margin-bottom:30px;color:#333333;font-size:16px;line-height:1.6;">
        <h3 style="color:#333333;font-size:18px;font-weight:700;margin:0 0 10px 0;">${escapeHtml(
          email.clientInfoHeading,
        )}</h3>
        ${inlineRow(email.labels.name, name)}
        ${inlineRow(email.labels.email, formData.email)}
        ${inlineRow(email.labels.phone, formData.phone)}
        ${inlineRow(email.labels.preferredContact, details.contactPreference)}
        ${inlineRow(email.labels.locale, locale.toUpperCase())}
      </div>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        ${detailBlock(email.labels.mainGoal, details.goal)}
        ${detailBlock(email.labels.businessType, details.businessType)}
        ${detailBlock(email.labels.businessName, formData.businessName)}
        ${detailBlock(email.labels.installLocation, details.installLocation)}
        ${detailBlock(
          email.labels.approximateSize,
          getLeadSizeSummary(formData, translations),
        )}
        ${detailBlock(email.labels.projectInfo, formData.projectInfo)}
        ${detailBlock(email.labels.timeline, details.timeline)}
        ${detailBlock(email.labels.budget, details.budget)}
        ${detailBlock(email.labels.uploadedFiles, uploads)}
      </table>
    `,
  });
};

export const getLeadClientTemplate = (
  formData: LeadFormData,
  locale: LangType,
) => {
  const translations = getTranslations(locale).leadForm;
  const email = translations.email;
  const details = getNormalizedLeadDetails(formData, translations);

  return emailShell({
    copyright: email.copyright,
    locale,
    title: email.clientTitle,
    children: `
      <h2 style="color:#0f0f0f;font-weight:700;text-transform:uppercase;margin:0 0 25px 0;font-size:24px;border-bottom:2px solid #feb201;padding-bottom:10px;">${escapeHtml(
        email.clientHeading,
      )}</h2>
      <div style="margin-bottom:30px;color:#333333;font-size:16px;line-height:1.6;">
        <p style="margin:0 0 15px 0;font-size:18px;font-weight:600;">${escapeHtml(
          email.clientThanks(formData.firstName),
        )}</p>
        <p style="margin:0;">${escapeHtml(email.clientIntro)}</p>
      </div>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        ${detailBlock(email.labels.mainGoal, details.goal)}
        ${detailBlock(email.labels.businessType, details.businessType)}
        ${detailBlock(email.labels.installLocation, details.installLocation)}
        ${detailBlock(
          email.labels.approximateSize,
          getLeadSizeSummary(formData, translations),
        )}
        ${detailBlock(email.labels.timeline, details.timeline)}
        ${detailBlock(email.labels.budget, details.budget)}
      </table>
      <div style="margin-top:40px;border-top:1px solid #eeeeee;padding-top:20px;">
        <p style="margin:0;color:#555555;font-size:16px">${escapeHtml(
          email.regards,
        )}</p>
        <p style="margin:5px 0 0 0;color:#333333;font-size:18px;font-weight:700;">${escapeHtml(
          email.teamName,
        )}</p>
      </div>
    `,
  });
};

export const getLeadEmailSubjects = (
  formData: LeadFormData,
  locale: LangType,
) => {
  const email = getTranslations(locale).leadForm.email;
  const name = `${formData.firstName} ${formData.lastName}`.trim();

  return {
    business: email.businessSubject(name),
    client: email.clientSubject,
  };
};
