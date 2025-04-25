# Test info

- Name: Form Submission Tests >> WoodForm submission in fr
- Location: C:\Users\Seto\SetoArts\tests\formTests.spec.ts:110:5

# Error details

```
Error: page.waitForSelector: Target page, context or browser has been closed
Call log:
  - waiting for locator('#woodForm') to be visible

    at fillCommonFields (C:\Users\Seto\SetoArts\tests\formTests.spec.ts:30:14)
    at C:\Users\Seto\SetoArts\tests\formTests.spec.ts:114:13
```

# Test source

```ts
   1 | import { getTranslations } from "@/helpers/langUtils";
   2 | import { test, expect } from "@playwright/test";
   3 |
   4 | const baseUrl = "http://localhost:3000";
   5 | const locales: ("en" | "fr")[] = ["en", "fr"];
   6 | const services = ["wood-sign", "branding", "web-design"];
   7 | const LocalTargets = {
   8 |   SIGNSFORM: "woodForm",
   9 |   DIGITALFORM: "digitalForm",
   10 | };
   11 |
   12 | const testData = {
   13 |   firstName: "Test",
   14 |   lastName: "User",
   15 |   email: `test-${Date.now()}@example.com`,
   16 |   details: "This is a test submission.",
   17 |   budgetMin: 1500,
   18 |   budgetMax: 2500,
   19 |   width: 24,
   20 |   height: 24,
   21 | };
   22 |
   23 | async function fillCommonFields(
   24 |   page: any,
   25 |   formId: string,
   26 |   locale: "en" | "fr"
   27 | ) {
   28 |   const translations = getTranslations(locale);
   29 |
>  30 |   await page.waitForSelector(`${formId}`, { timeout: 10000 }); // Wait for form
      |              ^ Error: page.waitForSelector: Target page, context or browser has been closed
   31 |   console.log(`Filling form: ${formId} in ${locale}`);
   32 |   try {
   33 |     await page.fill(
   34 |       `${formId} input[id="${translations.form.general.firstName}"]`,
   35 |       testData.firstName
   36 |     );
   37 |     await page.fill(
   38 |       `${formId} input[id="${translations.form.general.lastName}"]`,
   39 |       testData.lastName
   40 |     );
   41 |     await page.fill(
   42 |       `${formId} input[id="${translations.form.general.email}"]`,
   43 |       testData.email
   44 |     );
   45 |     await page.fill(
   46 |       `${formId} textarea[id="${translations.form.general.details}"]`,
   47 |       testData.details
   48 |     );
   49 |     // Budget sliders
   50 |     await page
   51 |       .locator(`${formId} [role="slider"]`)
   52 |       .nth(0)
   53 |       .evaluate((el: HTMLElement, value: number) => {
   54 |         const inputEvent = new Event("input", { bubbles: true });
   55 |         el.setAttribute("aria-valuenow", value.toString());
   56 |         el.dispatchEvent(inputEvent);
   57 |       }, testData.budgetMin);
   58 |     await page
   59 |       .locator(`${formId} [role="slider"]`)
   60 |       .nth(1)
   61 |       .evaluate((el: HTMLElement, value: number) => {
   62 |         const inputEvent = new Event("input", { bubbles: true });
   63 |         el.setAttribute("aria-valuenow", value.toString());
   64 |         el.dispatchEvent(inputEvent);
   65 |       }, testData.budgetMax);
   66 |   } catch (error) {
   67 |     console.error(`Error filling form ${formId} in ${locale}:`, error);
   68 |     throw error;
   69 |   }
   70 | }
   71 |
   72 | async function uploadFile(page: any, formId: string) {
   73 |   const fileInput = page.locator(`${formId} input[id="file-upload"]`);
   74 |   await fileInput.setInputFiles("tests/fixtures/test-image.png");
   75 | }
   76 |
   77 | async function selectService(
   78 |   page: any,
   79 |   formId: string,
   80 |   service: string,
   81 |   locale: "en" | "fr"
   82 | ) {
   83 |   // const translations = getTranslations(locale);
   84 |   // Map service to translated option text
   85 |   const optionText = {
   86 |     en: {
   87 |       "wood-sign": "Wood Sign",
   88 |       branding: "Branding",
   89 |       "web-design": "Web Design",
   90 |     },
   91 |     fr: {
   92 |       "wood-sign": "Panneau de bois",
   93 |       branding: "Image de marque",
   94 |       "web-design": "Conception web",
   95 |     },
   96 |   }[locale][service];
   97 |   // Click dropdown to open
   98 |   await page.locator(`${formId} .select`).click();
   99 |   // Wait for dropdown
  100 |   await page.waitForSelector(`${formId} .dropdown`, { timeout: 5000 });
  101 |   // Select option by text
  102 |   await page
  103 |     .locator(`${formId} [role="option"]:has(p:text-is("${optionText}"))`)
  104 |     .click();
  105 | }
  106 |
  107 | test.describe("Form Submission Tests", () => {
  108 |   for (const locale of locales) {
  109 |     const translations = getTranslations(locale);
  110 |     test(`WoodForm submission in ${locale}`, async ({ page }) => {
  111 |       await page.goto(`${baseUrl}/${locale}/wood`);
  112 |       const formId = `#${LocalTargets.SIGNSFORM}`;
  113 |
  114 |       await fillCommonFields(page, formId, locale);
  115 |       // Width and height sliders
  116 |       await page
  117 |         .locator(`${formId} [role="slider"]`)
  118 |         .nth(2)
  119 |         .evaluate((el: HTMLElement, value: number) => {
  120 |           const inputEvent = new Event("input", { bubbles: true });
  121 |           el.setAttribute("aria-valuenow", value.toString());
  122 |           el.dispatchEvent(inputEvent);
  123 |         }, testData.width);
  124 |       await page
  125 |         .locator(`${formId} [role="slider"]`)
  126 |         .nth(3)
  127 |         .evaluate((el: HTMLElement, value: number) => {
  128 |           const inputEvent = new Event("input", { bubbles: true });
  129 |           el.setAttribute("aria-valuenow", value.toString());
  130 |           el.dispatchEvent(inputEvent);
```
