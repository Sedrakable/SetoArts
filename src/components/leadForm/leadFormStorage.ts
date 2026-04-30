import { initialLeadFormData, LeadFormData } from "./leadFormTypes";

export const leadFormStorageKey = "setoxarts-led-lead-form-v1";

export const readStoredLeadFormData = (): LeadFormData => {
  if (typeof window === "undefined") return initialLeadFormData;

  try {
    const stored = window.localStorage.getItem(leadFormStorageKey);
    return stored ? sanitizeStoredData(JSON.parse(stored)) : initialLeadFormData;
  } catch {
    return initialLeadFormData;
  }
};

export const writeStoredLeadFormData = (formData: LeadFormData) => {
  const { company: _company, uploads: _uploads, ...persistableData } = formData;

  try {
    window.localStorage.setItem(
      leadFormStorageKey,
      JSON.stringify({ ...persistableData, company: "", uploads: [] }),
    );
  } catch (error) {
    console.error("Unable to save lead form progress:", error);
  }
};

export const clearStoredLeadFormData = () => {
  window.localStorage.removeItem(leadFormStorageKey);
};

const legacyValueMap: Partial<Record<keyof LeadFormData, Record<string, string>>> = {
  budget: {
    "$1,500-$2,500": "1500-2500",
    "$2,500-$4,000": "2500-4000",
    "$4,000+": "4000-plus",
    "$750-$1,500": "750-1500",
    "Not sure yet": "not-sure",
    "Under $750": "under-750",
  },
  businessType: {
    "Auto / Garage": "auto-garage",
    "Beauty / Salon / Nails": "beauty-salon-nails",
    "Clinic / Wellness": "clinic-wellness",
    "Gym / Fitness": "gym-fitness",
    "Office / Reception": "office-reception",
    Other: "other",
    "Restaurant / Cafe": "restaurant-cafe",
    "Tattoo / Creative Studio": "tattoo-creative-studio",
  },
  filesReady: {
    "I don't have a logo yet": "no-logo-yet",
    "Not right now": "not-right-now",
    "Yes, I can upload them now": "upload-now",
  },
  goal: {
    "Create a stronger brand presence": "brand-presence",
    "Improve my background for social media / content": "content-background",
    "Make my space look more premium": "premium-space",
    Other: "other",
    "Stand out from the street / increase walk-ins": "street-visibility",
  },
  installLocation: {
    Exterior: "exterior",
    Interior: "interior",
    "Not sure yet": "not-sure",
  },
  preferredContact: {
    Email: "email",
    "No preference": "no-preference",
    "Phone call": "phone-call",
    "Text message": "text-message",
  },
  roughSize: {
    "Large: around 4-6 feet": "large",
    "Medium: around 30-36 inches": "medium",
    "Not sure": "not-sure",
    "Small: around 18-24 inches": "small",
  },
  sizeKnowledge: {
    "I have a rough idea": "rough-size",
    "I need help choosing": "need-help",
    "Yes, I know the size": "known-size",
  },
  timeline: {
    "As soon as possible": "asap",
    "No rush": "no-rush",
    "Not sure yet": "not-sure",
    "Within 1-2 months": "1-2-months",
    "Within 2-4 weeks": "2-4-weeks",
  },
};

const normalizeStoredValue = <Key extends keyof LeadFormData>(
  field: Key,
  value: LeadFormData[Key],
) => {
  if (typeof value !== "string") return value;

  return (legacyValueMap[field]?.[value] || value) as LeadFormData[Key];
};

const sanitizeStoredData = (storedData: Partial<LeadFormData>): LeadFormData => {
  const mergedData = {
    ...initialLeadFormData,
    ...storedData,
    company: "",
    uploads: [],
  };

  return {
    ...mergedData,
    budget: normalizeStoredValue("budget", mergedData.budget),
    businessType: normalizeStoredValue("businessType", mergedData.businessType),
    filesReady: normalizeStoredValue("filesReady", mergedData.filesReady),
    goal: normalizeStoredValue("goal", mergedData.goal),
    installLocation: normalizeStoredValue(
      "installLocation",
      mergedData.installLocation,
    ),
    preferredContact: normalizeStoredValue(
      "preferredContact",
      mergedData.preferredContact,
    ),
    roughSize: normalizeStoredValue("roughSize", mergedData.roughSize),
    sizeKnowledge: normalizeStoredValue(
      "sizeKnowledge",
      mergedData.sizeKnowledge,
    ),
    timeline: normalizeStoredValue("timeline", mergedData.timeline),
  };
};
