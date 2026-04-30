import { LeadFormData, LeadFormStep } from "./leadFormTypes";
import { LeadFormTranslationCopy } from "./steps/LeadStepProps";

export const validateLeadFormStep = (
  step: LeadFormStep,
  formData: LeadFormData,
  translations: LeadFormTranslationCopy,
): string => {
  const errors = translations.errors;

  if (step === "goal" && !formData.goal) return errors.chooseOne;
  if (
    step === "goal" &&
    formData.goal === "other" &&
    !formData.goalOther.trim()
  ) {
    return errors.addShortGoal;
  }

  if (step === "business-type" && !formData.businessType) {
    return errors.chooseOne;
  }
  if (
    step === "business-type" &&
    formData.businessType === "other" &&
    !formData.businessTypeOther.trim()
  ) {
    return errors.addBusinessType;
  }

  if (step === "location" && !formData.installLocation) {
    return errors.chooseOne;
  }

  if (step === "size" && !formData.sizeKnowledge) {
    return errors.chooseOne;
  }
  if (
    step === "size" &&
    formData.sizeKnowledge === "known-size" &&
    (!formData.width.trim() || !formData.height.trim())
  ) {
    return errors.addWidthHeight;
  }
  if (
    step === "size" &&
    formData.sizeKnowledge === "rough-size" &&
    !formData.roughSize
  ) {
    return errors.chooseRoughSize;
  }

  if (step === "project-info" && !formData.projectInfo.trim()) {
    return errors.addProjectNote;
  }
  if (step === "timeline" && !formData.timeline) return errors.chooseOne;
  if (step === "budget" && !formData.budget) return errors.chooseOne;
  if (step === "files" && !formData.filesReady) return errors.chooseOne;

  if (step === "contact") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.firstName.trim()) return errors.addFirstName;
    if (!emailRegex.test(formData.email)) return errors.addValidEmail;
    if (!formData.phone.trim()) return errors.addPhone;
    if (!formData.preferredContact) return errors.chooseContactPreference;
  }

  return "";
};
