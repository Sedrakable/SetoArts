import { getTranslations } from "@/helpers/langUtils";
import {
  getStepIndex,
  getStepPath,
  initialLeadFormData,
  isLeadFormStep,
  LeadFormData,
  leadFormSteps,
} from "@/components/leadForm/leadFormTypes";
import { validateLeadFormStep } from "@/components/leadForm/leadFormValidation";
import {
  getLeadFormSummary,
  getLeadOptionLabel,
  getLeadSizeSummary,
  getNormalizedLeadDetails,
} from "@/components/leadForm/leadFormReview";
import {
  getLeadBusinessTemplate,
  getLeadClientTemplate,
  getLeadEmailSubjects,
} from "@/app/api/sendLeadFormEmail/templates";
import {
  prepareLeadAttachments,
  sendLeadEmails,
} from "@/app/api/sendLeadFormEmail/leadEmailDelivery";
import { LangType } from "@/i18n/request";

const makeLeadFormData = (
  overrides: Partial<LeadFormData> = {},
): LeadFormData => ({
  ...initialLeadFormData,
  goal: "premium-space",
  businessType: "restaurant-cafe",
  businessName: "Cafe Lumiere",
  installLocation: "interior",
  sizeKnowledge: "known-size",
  width: "48",
  height: "24",
  unit: "inches",
  projectInfo:
    "I want a clean LED wood sign for my reception wall that matches my logo.",
  timeline: "2-4-weeks",
  budget: "1500-2500",
  filesReady: "upload-now",
  uploads: [
    {
      field: "inspiration",
      name: "logo.png",
      type: "image/png",
      data: Buffer.from("fake image").toString("base64"),
    },
  ],
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah@example.com",
  phone: "514-555-1212",
  preferredContact: "email",
  ...overrides,
});

describe("LeadForm step routing and locale content", () => {
  test("has the expected V1 step order", () => {
    expect(leadFormSteps).toEqual([
      "goal",
      "business-type",
      "location",
      "size",
      "project-info",
      "timeline",
      "budget",
      "files",
      "contact",
      "review",
    ]);
  });

  test.each(leadFormSteps)("recognizes %s as a valid lead step", (step) => {
    expect(isLeadFormStep(step)).toBe(true);
    expect(getStepIndex(step)).toBeGreaterThanOrEqual(0);
  });

  test.each(["en", "fr"] as LangType[])(
    "builds localized paths for every step in %s",
    (locale) => {
      leadFormSteps.forEach((step) => {
        expect(getStepPath(locale, step)).toBe(`/${locale}/custom-sign/${step}`);
      });
    },
  );

  test.each(["en", "fr"] as LangType[])(
    "has translated labels, questions, and actions for every step in %s",
    (locale) => {
      const translations = getTranslations(locale).leadForm;

      expect(translations.actions.back).toBeTruthy();
      expect(translations.actions.continue).toBeTruthy();
      expect(translations.actions.submit).toBeTruthy();

      expect(translations.steps.goal.question).toBeTruthy();
      expect(translations.steps.businessType.question).toBeTruthy();
      expect(translations.steps.location.question).toBeTruthy();
      expect(translations.steps.size.question).toBeTruthy();
      expect(translations.steps.projectInfo.question).toBeTruthy();
      expect(translations.steps.timeline.question).toBeTruthy();
      expect(translations.steps.budget.question).toBeTruthy();
      expect(translations.steps.files.question).toBeTruthy();
      expect(translations.steps.contact.question).toBeTruthy();
      expect(translations.steps.review.question).toBeTruthy();
    },
  );

  test("uses stable option values across English and French labels", () => {
    const en = getTranslations("en").leadForm;
    const fr = getTranslations("fr").leadForm;

    expect(en.steps.goal.options.map((option) => option.value)).toEqual(
      fr.steps.goal.options.map((option) => option.value),
    );
    expect(en.steps.budget.options.map((option) => option.value)).toEqual(
      fr.steps.budget.options.map((option) => option.value),
    );
    expect(en.steps.contact.contactOptions.map((option) => option.value)).toEqual(
      fr.steps.contact.contactOptions.map((option) => option.value),
    );
  });
});

describe("LeadForm validation", () => {
  test.each(["en", "fr"] as LangType[])(
    "passes a complete known-size lead in %s",
    (locale) => {
      const error = validateLeadFormStep(
        "review",
        makeLeadFormData(),
        getTranslations(locale).leadForm,
      );

      expect(error).toBe("");
    },
  );

  test("requires one answer on choice steps", () => {
    const translations = getTranslations("en").leadForm;

    expect(
      validateLeadFormStep(
        "goal",
        makeLeadFormData({ goal: "" }),
        translations,
      ),
    ).toBe(translations.errors.chooseOne);
    expect(
      validateLeadFormStep(
        "timeline",
        makeLeadFormData({ timeline: "" }),
        translations,
      ),
    ).toBe(translations.errors.chooseOne);
    expect(
      validateLeadFormStep(
        "files",
        makeLeadFormData({ filesReady: "" }),
        translations,
      ),
    ).toBe(translations.errors.chooseOne);
  });

  test("requires Other text only when Other is selected", () => {
    const translations = getTranslations("en").leadForm;

    expect(
      validateLeadFormStep(
        "goal",
        makeLeadFormData({ goal: "other", goalOther: "" }),
        translations,
      ),
    ).toBe(translations.errors.addShortGoal);
    expect(
      validateLeadFormStep(
        "goal",
        makeLeadFormData({ goal: "other", goalOther: "Create a luxury feel" }),
        translations,
      ),
    ).toBe("");
    expect(
      validateLeadFormStep(
        "business-type",
        makeLeadFormData({ businessType: "other", businessTypeOther: "" }),
        translations,
      ),
    ).toBe(translations.errors.addBusinessType);
  });

  test("validates all size branches", () => {
    const translations = getTranslations("en").leadForm;

    expect(
      validateLeadFormStep(
        "size",
        makeLeadFormData({
          sizeKnowledge: "known-size",
          width: "",
          height: "24",
        }),
        translations,
      ),
    ).toBe(translations.errors.addWidthHeight);
    expect(
      validateLeadFormStep(
        "size",
        makeLeadFormData({ sizeKnowledge: "rough-size", roughSize: "" }),
        translations,
      ),
    ).toBe(translations.errors.chooseRoughSize);
    expect(
      validateLeadFormStep(
        "size",
        makeLeadFormData({ sizeKnowledge: "need-help", roughSize: "" }),
        translations,
      ),
    ).toBe("");
  });

  test("requires project info and valid contact info", () => {
    const translations = getTranslations("en").leadForm;

    expect(
      validateLeadFormStep(
        "project-info",
        makeLeadFormData({ projectInfo: "" }),
        translations,
      ),
    ).toBe(translations.errors.addProjectNote);
    expect(
      validateLeadFormStep(
        "contact",
        makeLeadFormData({ firstName: "" }),
        translations,
      ),
    ).toBe(translations.errors.addFirstName);
    expect(
      validateLeadFormStep(
        "contact",
        makeLeadFormData({ email: "not-an-email" }),
        translations,
      ),
    ).toBe(translations.errors.addValidEmail);
    expect(
      validateLeadFormStep(
        "contact",
        makeLeadFormData({ phone: "" }),
        translations,
      ),
    ).toBe(translations.errors.addPhone);
    expect(
      validateLeadFormStep(
        "contact",
        makeLeadFormData({ preferredContact: "" }),
        translations,
      ),
    ).toBe(translations.errors.chooseContactPreference);
  });

  test("does not require uploads when user skips files", () => {
    const translations = getTranslations("en").leadForm;

    expect(
      validateLeadFormStep(
        "files",
        makeLeadFormData({ filesReady: "not-right-now", uploads: [] }),
        translations,
      ),
    ).toBe("");
    expect(
      validateLeadFormStep(
        "files",
        makeLeadFormData({ filesReady: "no-logo-yet", uploads: [] }),
        translations,
      ),
    ).toBe("");
  });
});

describe("LeadForm review and translated summaries", () => {
  test("shows translated English labels for stored values", () => {
    const translations = getTranslations("en").leadForm;
    const formData = makeLeadFormData();

    expect(getLeadOptionLabel(translations.steps.budget.options, "1500-2500")).toBe(
      "$1,500-$2,500",
    );
    expect(getLeadSizeSummary(formData, translations)).toBe("48 x 24 inches");

    const details = getNormalizedLeadDetails(formData, translations);
    expect(details.goal).toBe("Make my space look more premium");
    expect(details.businessType).toBe("Restaurant / Cafe");
    expect(details.timeline).toBe("Within 2-4 weeks");
  });

  test("shows translated French labels for the same stored values", () => {
    const translations = getTranslations("fr").leadForm;
    const formData = makeLeadFormData();

    const details = getNormalizedLeadDetails(formData, translations);
    expect(details.goal).toBe("Rendre mon espace plus haut de gamme");
    expect(details.businessType).toBe("Restaurant / Café");
    expect(details.timeline).toBe("Dans 2 à 4 semaines");
    expect(getLeadSizeSummary(formData, translations)).toBe("48 x 24 pouces");
  });

  test("review summary includes every editable line and target step", () => {
    const translations = getTranslations("en").leadForm;
    const summary = getLeadFormSummary(makeLeadFormData(), translations);

    expect(summary).toHaveLength(8);
    expect(summary.map((item) => item.step)).toEqual([
      "goal",
      "business-type",
      "location",
      "size",
      "timeline",
      "budget",
      "contact",
      "files",
    ]);
    expect(summary.find((item) => item.step === "files")?.value).toBe("1 file");
  });

  test("review summary handles rough size, no uploads, and optional last name", () => {
    const translations = getTranslations("en").leadForm;
    const summary = getLeadFormSummary(
      makeLeadFormData({
        lastName: "",
        sizeKnowledge: "rough-size",
        roughSize: "large",
        filesReady: "not-right-now",
        uploads: [],
      }),
      translations,
    );

    expect(summary.find((item) => item.step === "size")?.value).toBe(
      "Large: around 4-6 feet",
    );
    expect(summary.find((item) => item.step === "files")?.value).toBe("None");
    expect(summary.find((item) => item.step === "contact")?.value).toContain(
      "Sarah",
    );
  });
});

describe("LeadForm email templates and delivery", () => {
  beforeEach(() => {
    process.env.EMAIL_BUSINESS = "studio@setoxarts.com";
  });

  test.each(["en", "fr"] as LangType[])(
    "builds localized client and business email subjects for %s",
    (locale) => {
      const subjects = getLeadEmailSubjects(makeLeadFormData(), locale);

      expect(subjects.client).toBeTruthy();
      expect(subjects.business).toContain("Sarah Johnson");
    },
  );

  test("client email confirms the request without exposing base64 uploads", () => {
    const html = getLeadClientTemplate(makeLeadFormData(), "en");

    expect(html).toContain("Project Request Received");
    expect(html).toContain("Sarah");
    expect(html).not.toContain(Buffer.from("fake image").toString("base64"));
    expect(html).not.toContain("logo.png");
  });

  test("business email includes uploaded file count and translated lead details", () => {
    const html = getLeadBusinessTemplate(makeLeadFormData(), "en");

    expect(html).toContain("New LED Sign Lead");
    expect(html).toContain("1 file attached");
    expect(html).toContain("Restaurant / Cafe");
    expect(html).toContain("Within 2-4 weeks");
  });

  test("prepares upload attachments as buffers", () => {
    const attachments = prepareLeadAttachments(makeLeadFormData().uploads);

    expect(attachments).toHaveLength(1);
    expect(attachments[0].filename).toBe("logo.png");
    expect(attachments[0].contentType).toBe("image/png");
    expect(Buffer.isBuffer(attachments[0].content)).toBe(true);
  });

  test("sends attachments only to the business email, not the client email", async () => {
    const sendMail = jest.fn().mockResolvedValue({ ok: true });

    await sendLeadEmails(makeLeadFormData(), "en", { sendMail });

    expect(sendMail).toHaveBeenCalledTimes(2);
    const clientMail = sendMail.mock.calls[0][0];
    const businessMail = sendMail.mock.calls[1][0];

    expect(clientMail.to).toBe("sarah@example.com");
    expect(clientMail.attachments).toBeUndefined();
    expect(businessMail.to).toBe("studio@setoxarts.com");
    expect(businessMail.attachments).toHaveLength(1);
  });

  test("supports up to the current upload limit in the business email", async () => {
    const uploads = Array.from({ length: 8 }, (_, index) => ({
      field: "inspiration" as const,
      name: `upload-${index + 1}.png`,
      type: "image/png",
      data: Buffer.from(`file-${index + 1}`).toString("base64"),
    }));
    const sendMail = jest.fn().mockResolvedValue({ ok: true });

    await sendLeadEmails(makeLeadFormData({ uploads }), "en", { sendMail });

    expect(sendMail.mock.calls[1][0].attachments).toHaveLength(8);
  });
});
