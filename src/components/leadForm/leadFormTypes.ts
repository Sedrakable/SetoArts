import { LangType } from "@/i18n/request";

export const leadFormSteps = [
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
] as const;

export type LeadFormStep = (typeof leadFormSteps)[number];

export interface LeadUpload {
  field: "logo" | "spacePhotos" | "inspiration";
  name: string;
  type: string;
  data: string;
}

export interface LeadFormData {
  goal: string;
  goalOther: string;
  businessType: string;
  businessTypeOther: string;
  businessName: string;
  installLocation: string;
  sizeKnowledge: string;
  width: string;
  height: string;
  unit: "inches" | "cm";
  roughSize: string;
  projectInfo: string;
  timeline: string;
  budget: string;
  filesReady: string;
  uploads: LeadUpload[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;
  company: string;
}

export interface LeadFormPayload {
  formData: LeadFormData;
  locale: LangType;
}

export const initialLeadFormData: LeadFormData = {
  goal: "",
  goalOther: "",
  businessType: "",
  businessTypeOther: "",
  businessName: "",
  installLocation: "",
  sizeKnowledge: "",
  width: "",
  height: "",
  unit: "inches",
  roughSize: "",
  projectInfo: "",
  timeline: "",
  budget: "",
  filesReady: "",
  uploads: [],
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContact: "",
  company: "",
};

export const isLeadFormStep = (step: string): step is LeadFormStep => {
  return leadFormSteps.includes(step as LeadFormStep);
};

export const getStepIndex = (step: LeadFormStep) => leadFormSteps.indexOf(step);

export const getStepPath = (locale: LangType, step: LeadFormStep) =>
  `/${locale}/custom-sign/${step}`;
