// SetoArts - /src/app/api/sendContactFormEmail/templates.ts
import { ContactFormData } from "@/components/reuse/Form/formTypes";
import { LangType } from "@/i18n/request";
import { emailTranslations } from "@/langs/emailTranslations";

export const getClientContactTemplate = (
  formData: ContactFormData,
  locale: LangType,
) => {
  const t = emailTranslations[locale];
  const dimensions =
    formData.width && formData.height
      ? `${formData.width}" × ${formData.height}"`
      : "N/A";

  return `
<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${t.title}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Outfit', Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 20px">
      <tr>
        <td align="center">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 650px">
            <tr>
              <td align="center" style="padding: 8px; background-color: #feb201; border-top-left-radius: 16px; border-top-right-radius: 16px;">
                <h1 style="margin: 0; color: #ffffff; font-size: 48px; font-weight: 700; text-transform: uppercase;">Seto X Arts</h1>
              </td>
            </tr>
            <tr>
              <td style="background-color: #ffffff; padding: 40px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #0f0f0f; font-weight: 700; text-transform: uppercase; margin: 0 0 25px 0; font-size: 24px; border-bottom: 2px solid #feb201; padding-bottom: 10px;">${
                  t.title
                }</h2>
                <div style="margin-bottom: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                  <p style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">${t.greeting(
                    formData.firstName,
                  )}</p>
                  <p style="margin: 0">${t.thankYouMessage(
                    formData.firstName,
                  )}</p>
                </div>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding-bottom: 25px">
                      <div style="border-left: 4px solid #feb201; padding-left: 15px;">
                        <h3 style="margin: 0 0 10px 0; color: #333333; font-size: 18px; font-weight: 700;">${
                          t.signDetails
                        }</h3>
                        <p style="margin: 0; color: #555555; font-size: 16px;">${
                          formData.details
                        }</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 25px">
                      <div style="border-left: 4px solid #feb201; padding-left: 15px;">
                        <h3 style="margin: 0 0 10px 0; color: #333333; font-size: 18px; font-weight: 700;">${
                          t.dimensions
                        }</h3>
                        <p style="margin: 0; color: #555555; font-size: 16px;">${dimensions}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 25px">
                      <div style="border-left: 4px solid #feb201; padding-left: 15px;">
                        <h3 style="margin: 0 0 10px 0; color: #333333; font-size: 18px; font-weight: 700;">${
                          t.budget
                        }</h3>
                        <p style="margin: 0; color: #555555; font-size: 16px;">$${
                          formData.budgetMin
                        } – $${formData.budgetMax}</p>
                      </div>
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 40px; border-top: 1px solid #eeeeee; padding-top: 20px;">
                  <p style="margin: 0; color: #555555; font-size: 16px">${
                    t.regards
                  }</p>
                  <p style="margin: 5px 0 0 0; color: #333333; font-size: 18px; font-weight: 700;">${
                    t.team
                  }</p>
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px; background-color: #feb201; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; color: #ffffff;">
                <p style="margin: 0; font-size: 14px">© 2026 Seto X Arts. All Rights Reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

export const getBusinessContactTemplate = (
  formData: ContactFormData,
  locale: LangType,
) => {
  const dimensions =
    formData.width && formData.height
      ? `${formData.width}" × ${formData.height}"`
      : "N/A";
  return `
<!DOCTYPE html>
<html lang="${locale}">
  <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Outfit', Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 20px">
      <tr>
        <td align="center">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 650px">
            <tr>
              <td align="center" style="padding: 10px; background-color: #feb201; border-top-left-radius: 16px; border-top-right-radius: 16px;">
                <h1 style="margin: 0; color: #ffffff; font-size: 48px; font-weight: 700; text-transform: uppercase;">Seto X Arts</h1>
              </td>
            </tr>
            <tr>
              <td style="background-color: #ffffff; padding: 40px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #0f0f0f; font-weight: 700; text-transform: uppercase; margin: 0 0 25px 0; font-size: 24px; border-bottom: 2px solid #feb201; padding-bottom: 10px;">💬 New Contact Inquiry</h2>
                <div style="margin-bottom: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                  <h3 style="color: #333333; font-size: 18px; font-weight: 700">Client Info:</h3>
                  <p style="margin: 0">Name: <strong>${formData.firstName} ${
    formData.lastName
  }</strong></p>
                  <p style="margin: 0">Email: <strong>${
                    formData.email
                  }</strong></p>
                  <p style="margin: 0">Locale: <strong>${locale.toUpperCase()}</strong></p>
                </div>
                <div style="color: #333333; font-size: 16px; line-height: 1.6;">
                  <h3 style="color: #333333; font-size: 18px; font-weight: 700">Project Details:</h3>
                  <p style="margin: 0">Details: <strong>${
                    formData.details
                  }</strong></p>
                  <p style="margin: 0">Dimensions: <strong>${dimensions}</strong></p>
                  <p style="margin: 0">Budget Range: <strong>$${
                    formData.budgetMin
                  } – $${formData.budgetMax}</strong></p>
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px; background-color: #feb201; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; color: #ffffff;">
                <p style="margin: 0; font-size: 14px">© 2026 Seto X Arts. All Rights Reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
