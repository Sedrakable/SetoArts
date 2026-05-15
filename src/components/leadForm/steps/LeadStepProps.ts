import { UploadedLeadFiles } from "../leadFormUploads";
import { LeadFormData, LeadUpload } from "../leadFormTypes";
import { Translations } from "@/langs/langTypes";

export type LeadFormTranslationCopy = Translations["leadForm"];

export interface LeadStepProps {
  formData: LeadFormData;
  onChange: <Key extends keyof LeadFormData>(
    key: Key,
    value: LeadFormData[Key],
  ) => void;
  onAutoAdvance: <Key extends keyof LeadFormData>(
    key: Key,
    value: LeadFormData[Key],
  ) => void;
  translations: LeadFormTranslationCopy;
}

export interface LeadUploadStepProps extends LeadStepProps {
  onUploadChange: (field: LeadUpload["field"], files: File[]) => void;
  uploadedFiles: UploadedLeadFiles;
}
