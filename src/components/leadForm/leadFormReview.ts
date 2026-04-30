import { LeadFormData, LeadFormStep } from "./leadFormTypes";
import { LeadFormTranslationCopy } from "./steps/LeadStepProps";

export interface LeadFormSummaryItem {
  label: string;
  step: LeadFormStep;
  value: string;
}

export const getLeadOptionLabel = (
  options: { value: string; label: string }[],
  value: string,
) => options.find((option) => option.value === value)?.label || value;

export const getLeadSizeSummary = (
  formData: LeadFormData,
  translations: LeadFormTranslationCopy,
) => {
  if (formData.sizeKnowledge === "known-size") {
    return `${formData.width} x ${formData.height} ${getLeadOptionLabel(
      translations.steps.size.unitOptions,
      formData.unit,
    )}`;
  }

  return (
    getLeadOptionLabel(translations.steps.size.roughOptions, formData.roughSize) ||
    getLeadOptionLabel(translations.steps.size.options, formData.sizeKnowledge)
  );
};

export const getNormalizedLeadDetails = (
  formData: LeadFormData,
  translations: LeadFormTranslationCopy,
) => {
  const goal =
    formData.goal === "other"
      ? formData.goalOther
      : getLeadOptionLabel(translations.steps.goal.options, formData.goal);
  const businessType =
    formData.businessType === "other"
      ? formData.businessTypeOther
      : getLeadOptionLabel(
          translations.steps.businessType.options,
          formData.businessType,
        );

  return {
    budget: getLeadOptionLabel(translations.steps.budget.options, formData.budget),
    businessType,
    contactPreference: getLeadOptionLabel(
      translations.steps.contact.contactOptions,
      formData.preferredContact,
    ),
    files: formData.uploads.length
      ? translations.steps.review.fileCount(formData.uploads.length)
      : translations.steps.review.noFiles,
    goal,
    installLocation: getLeadOptionLabel(
      translations.steps.location.options,
      formData.installLocation,
    ),
    size: getLeadSizeSummary(formData, translations),
    timeline: getLeadOptionLabel(
      translations.steps.timeline.options,
      formData.timeline,
    ),
  };
};

export const getLeadFormSummary = (
  formData: LeadFormData,
  translations: LeadFormTranslationCopy,
): LeadFormSummaryItem[] => {
  const labels = translations.steps.review.summaryLabels;
  const details = getNormalizedLeadDetails(formData, translations);

  return [
    { label: labels.goal, step: "goal", value: details.goal },
    {
      label: labels.businessType,
      step: "business-type",
      value: [details.businessType, formData.businessName]
        .filter(Boolean)
        .join(" - "),
    },
    { label: labels.location, step: "location", value: details.installLocation },
    { label: labels.size, step: "size", value: details.size },
    { label: labels.timeline, step: "timeline", value: details.timeline },
    { label: labels.budget, step: "budget", value: details.budget },
    {
      label: labels.contactInfo,
      step: "contact",
      value: [formData.firstName, formData.lastName, formData.email, formData.phone]
        .filter(Boolean)
        .join(" - "),
    },
    {
      label: labels.uploadedFiles,
      step: "files",
      value: details.files,
    },
  ];
};

export type LeadFormSummary = ReturnType<typeof getLeadFormSummary>;
