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
export interface WoodFormData extends BaseFormData {
  details: string;
  width: number;
  height: number;
  budgetMin: number;
  budgetMax: number;
  uploads: EncodedFileType[];
}

export interface DigitalFormData extends BaseFormData {
  details: string;
  budgetMin: number;
  budgetMax: number;
  uploads: EncodedFileType[];
}

export type FormServiceType = "wood-sign" | "branding" | "website";

export interface ContactFormData extends BaseFormData {
  details: string;
  service: FormServiceType; // Dropdown options
  budgetMin: number;
  budgetMax: number;
  width?: number; // Optional, only for wood-sign
  height?: number; // Optional, only for wood-sign
  uploads: EncodedFileType[];
}

export interface FormErrorData {
  [key: string]: boolean;
}

export interface StepProps {
  number: number | undefined;
}

export const looksLikeBot = (formData: AnyFormData): boolean => {
  const honeypotFilled =
    typeof formData.company === "string" && formData.company.trim().length > 0;

  if (honeypotFilled) return true;

  const isDefaultBudget =
    formData.budgetMin === 1000 && formData.budgetMax === 3000;

  const noUploads = !formData.uploads || formData.uploads.length === 0;

  const shortDetails = !formData.details || formData.details.trim().length < 40;

  // Wood-like forms: WoodForm or ContactForm when service === "wood-sign"
  const hasDimensions =
    typeof (formData as any).width === "number" &&
    typeof (formData as any).height === "number";

  const isDefaultWoodSize =
    hasDimensions &&
    (formData as any).width === 36 &&
    (formData as any).height === 36;

  const isWoodService =
    "service" in formData && formData.service === "wood-sign";

  const isWoodish = hasDimensions || isWoodService;

  const suspiciousPattern = isWoodish
    ? isDefaultBudget && isDefaultWoodSize
    : isDefaultBudget;

  return suspiciousPattern && noUploads && shortDetails;
};

export type AnyFormData = ContactFormData | DigitalFormData | WoodFormData;
