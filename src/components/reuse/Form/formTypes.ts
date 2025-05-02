export interface BaseFormData {
  firstName: string;
  lastName: string;
  email: string;
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
