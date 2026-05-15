import { UploadedLeadFiles } from "./leadFormUploads";
import { LeadFormData, LeadFormStep, LeadUpload } from "./leadFormTypes";
import { BudgetStep } from "./steps/BudgetStep";
import { BusinessTypeStep } from "./steps/BusinessTypeStep";
import { ContactStep } from "./steps/ContactStep";
import { FilesStep } from "./steps/FilesStep";
import { GoalStep } from "./steps/GoalStep";
import { LocationStep } from "./steps/LocationStep";
import { ProjectInfoStep } from "./steps/ProjectInfoStep";
import { ReviewStep } from "./steps/ReviewStep";
import { SizeStep } from "./steps/SizeStep";
import { TimelineStep } from "./steps/TimelineStep";
import { LeadFormTranslationCopy } from "./steps/LeadStepProps";

interface LeadFormFieldsProps {
  formData: LeadFormData;
  onChange: <Key extends keyof LeadFormData>(
    key: Key,
    value: LeadFormData[Key],
  ) => void;
  onAutoAdvance: <Key extends keyof LeadFormData>(
    key: Key,
    value: LeadFormData[Key],
  ) => void;
  onUploadChange: (field: LeadUpload["field"], files: File[]) => void;
  onEditStep: (step: LeadFormStep) => void;
  step: LeadFormStep;
  translations: LeadFormTranslationCopy;
  uploadedFiles: UploadedLeadFiles;
}

export const LeadFormFields = ({
  formData,
  onAutoAdvance,
  onChange,
  onEditStep,
  onUploadChange,
  step,
  translations,
  uploadedFiles,
}: LeadFormFieldsProps) => {
  const props = { formData, onAutoAdvance, onChange, translations };

  switch (step) {
    case "goal":
      return <GoalStep {...props} />;
    case "business-type":
      return <BusinessTypeStep {...props} />;
    case "location":
      return <LocationStep {...props} />;
    case "size":
      return <SizeStep {...props} />;
    case "project-info":
      return <ProjectInfoStep {...props} />;
    case "timeline":
      return <TimelineStep {...props} />;
    case "budget":
      return <BudgetStep {...props} />;
    case "files":
      return (
        <FilesStep
          {...props}
          onUploadChange={onUploadChange}
          uploadedFiles={uploadedFiles}
        />
      );
    case "contact":
      return <ContactStep {...props} />;
    case "review":
      return (
        <ReviewStep
          formData={formData}
          onEditStep={onEditStep}
          translations={translations}
        />
      );
  }
};
