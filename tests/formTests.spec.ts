import { getTranslations } from "@/helpers/langUtils";
import { test, expect } from "@playwright/test";

const baseUrl = "http://localhost:3000";
const locales: ("en" | "fr")[] = ["en", "fr"];
const services = ["wood-sign", "branding", "website"];
const LocalTargets = {
  WOODFORM: "woodForm",
  DIGITALFORM: "digitalForm",
};

const testData = {
  firstName: "Test",
  lastName: "User",
  email: `test-${Date.now()}@example.com`,
  details: "This is a test submission.",
  budgetMin: 1500,
  budgetMax: 2500,
  width: 24,
  height: 24,
};

async function fillCommonFields(
  page: any,
  formId: string,
  locale: "en" | "fr"
) {
  const translations = getTranslations(locale);

  await page.waitForSelector(`${formId}`, { timeout: 10000 }); // Wait for form
  console.log(`Filling form: ${formId} in ${locale}`);
  try {
    await page.fill(
      `${formId} input[id="${translations.form.general.firstName}"]`,
      testData.firstName
    );
    await page.fill(
      `${formId} input[id="${translations.form.general.lastName}"]`,
      testData.lastName
    );
    await page.fill(
      `${formId} input[id="${translations.form.general.email}"]`,
      testData.email
    );
    await page.fill(
      `${formId} textarea[id="${translations.form.general.details}"]`,
      testData.details
    );
    // Budget sliders
    await page
      .locator(`${formId} [role="slider"]`)
      .nth(0)
      .evaluate((el: HTMLElement, value: number) => {
        const inputEvent = new Event("input", { bubbles: true });
        el.setAttribute("aria-valuenow", value.toString());
        el.dispatchEvent(inputEvent);
      }, testData.budgetMin);
    await page
      .locator(`${formId} [role="slider"]`)
      .nth(1)
      .evaluate((el: HTMLElement, value: number) => {
        const inputEvent = new Event("input", { bubbles: true });
        el.setAttribute("aria-valuenow", value.toString());
        el.dispatchEvent(inputEvent);
      }, testData.budgetMax);
  } catch (error) {
    console.error(`Error filling form ${formId} in ${locale}:`, error);
    throw error;
  }
}

async function uploadFile(page: any, formId: string) {
  const fileInput = page.locator(`${formId} input[id="file-upload"]`);
  await fileInput.setInputFiles("tests/fixtures/test-image.png");
}

async function selectService(
  page: any,
  formId: string,
  service: string,
  locale: "en" | "fr"
) {
  // const translations = getTranslations(locale);
  // Map service to translated option text
  const optionText = {
    en: {
      "wood-sign": "Wood Sign",
      branding: "Branding",
      website: "Web Design",
    },
    fr: {
      "wood-sign": "Panneau de bois",
      branding: "Image de marque",
      website: "Conception web",
    },
  }[locale][service];
  // Click dropdown to open
  await page.locator(`${formId} .select`).click();
  // Wait for dropdown
  await page.waitForSelector(`${formId} .dropdown`, { timeout: 5000 });
  // Select option by text
  await page
    .locator(`${formId} [role="option"]:has(p:text-is("${optionText}"))`)
    .click();
}

test.describe("Form Submission Tests", () => {
  for (const locale of locales) {
    const translations = getTranslations(locale);
    test(`WoodForm submission in ${locale}`, async ({ page }) => {
      await page.goto(`${baseUrl}/${locale}/wood`);
      const formId = `#${LocalTargets.WOODFORM}`;

      await fillCommonFields(page, formId, locale);
      // Width and height sliders
      await page
        .locator(`${formId} [role="slider"]`)
        .nth(2)
        .evaluate((el: HTMLElement, value: number) => {
          const inputEvent = new Event("input", { bubbles: true });
          el.setAttribute("aria-valuenow", value.toString());
          el.dispatchEvent(inputEvent);
        }, testData.width);
      await page
        .locator(`${formId} [role="slider"]`)
        .nth(3)
        .evaluate((el: HTMLElement, value: number) => {
          const inputEvent = new Event("input", { bubbles: true });
          el.setAttribute("aria-valuenow", value.toString());
          el.dispatchEvent(inputEvent);
        }, testData.height);
      await uploadFile(page, formId);

      await page.locator(`${formId} button[type="submit"]`).click();
      await expect(
        page.locator(`${formId} .form-message`)
      ).toHaveText(translations.form.general.emailSent, { timeout: 10000 });
    });
  }

  for (const locale of locales) {
    const translations = getTranslations(locale);
    for (const pagePath of ["branding", "web"]) {
      test(`DigitalForm submission in ${locale} on ${pagePath}`, async ({
        page,
      }) => {
        await page.goto(`${baseUrl}/${locale}/${pagePath}`);
        const formId = `#${LocalTargets.DIGITALFORM}`;

        await fillCommonFields(page, formId, locale);
        await uploadFile(page, formId);

        await page.locator(`${formId} button[type="submit"]`).click();
        await expect(
          page.locator(`${formId} .form-message`)
        ).toHaveText(translations.form.general.emailSent, { timeout: 10000 });
      });
    }
  }

  for (const locale of locales) {
    const translations = getTranslations(locale);
    for (const service of services) {
      test(`ContactForm submission in ${locale} with service ${service}`, async ({
        page,
      }) => {
        await page.goto(`${baseUrl}/${locale}/contact`);
        const formId = `#${LocalTargets.DIGITALFORM}`;

        await fillCommonFields(page, formId, locale);
        await selectService(page, formId, service, locale);
        if (service === "wood-sign") {
          await page
            .locator(`${formId} [role="slider"]`)
            .nth(2)
            .evaluate((el: HTMLElement, value: number) => {
              const inputEvent = new Event("input", { bubbles: true });
              el.setAttribute("aria-valuenow", value.toString());
              el.dispatchEvent(inputEvent);
            }, testData.width);
          await page
            .locator(`${formId} [role="slider"]`)
            .nth(3)
            .evaluate((el: HTMLElement, value: number) => {
              const inputEvent = new Event("input", { bubbles: true });
              el.setAttribute("aria-valuenow", value.toString());
              el.dispatchEvent(inputEvent);
            }, testData.height);
        }
        await uploadFile(page, formId);

        await page.locator(`${formId} button[type="submit"]`).click();
        await expect(
          page.locator(`${formId} .form-message`)
        ).toHaveText(translations.form.general.emailSent, { timeout: 10000 });
      });
    }
  }
});
