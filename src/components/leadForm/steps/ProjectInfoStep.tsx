import { TextArea } from "@/components/reuse/Form/Input/Input";
import { LeadStepProps } from "./LeadStepProps";

export const ProjectInfoStep = ({
  formData,
  onChange,
  translations,
}: LeadStepProps) => (
  <TextArea
    label={translations.steps.projectInfo.fieldLabel}
    onChange={(value) => onChange("projectInfo", value)}
    placeholder={translations.steps.projectInfo.placeholder}
    required
    fit="shrink"
    value={formData.projectInfo}
  />
);
