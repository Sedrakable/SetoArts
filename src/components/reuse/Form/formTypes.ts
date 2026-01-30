export interface BaseFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string; // honeypot field
}

export interface EncodedFileType {
  name: string;
  type: string;
  data: string;
}

export interface ContactFormData extends BaseFormData {
  details: string;
  budgetMin: number;
  budgetMax: number;
  width?: number; // Optional, only for wood-sign
  height?: number; // Optional, only for wood-sign
  uploads: EncodedFileType[];
}

export interface TradeFormData extends BaseFormData {
  details: string;
}

export interface FormErrorData {
  [key: string]: boolean;
}

export interface StepProps {
  number: number | undefined;
}

// Type guard to check if form data is ContactFormData
const isContactFormData = (
  formData: ContactFormData | TradeFormData,
): formData is ContactFormData => {
  return (
    "budgetMin" in formData && "budgetMax" in formData && "uploads" in formData
  );
};

export const looksLikeBot = (
  formData: ContactFormData | TradeFormData,
): boolean => {
  // 1. HONEYPOT CHECK - Instant reject if filled
  const honeypotFilled =
    typeof formData.company === "string" && formData.company.trim().length > 0;

  if (honeypotFilled) return true;

  // 2. CONTACT FORM SPECIFIC CHECKS
  if (isContactFormData(formData)) {
    const shortDetails =
      !formData.details || formData.details.trim().length < 40;
    const isDefaultBudget =
      formData.budgetMin === 1500 && formData.budgetMax === 5000;
    const noUploads = !formData.uploads || formData.uploads.length === 0;

    // Check if dimensions exist (wood-sign specific)
    const hasDimensions =
      typeof formData.width === "number" && typeof formData.height === "number";

    const isDefaultWoodSize =
      hasDimensions && formData.width === 36 && formData.height === 36;

    // If it has dimensions, check wood defaults; otherwise just check budget
    const suspiciousPattern = hasDimensions
      ? isDefaultBudget && isDefaultWoodSize
      : isDefaultBudget;

    // Bot = ALL suspicious patterns + short details + no uploads
    return suspiciousPattern && noUploads && shortDetails;
  }

  // 3. TRADE FORM SPECIFIC CHECKS
  // For trade forms, we're more lenient
  // Only block if details are REALLY short or empty
  const emptyOrTooShort =
    !formData.details || formData.details.trim().length < 10;

  return emptyOrTooShort;
};
