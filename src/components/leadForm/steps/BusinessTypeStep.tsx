import { Input } from "@/components/reuse/Form/Input/Input";
import { LeadStepProps } from "./LeadStepProps";
import { LeadChoiceGroup } from "./LeadStepHelpers";

export const BusinessTypeStep = ({
  formData,
  onChange,
  translations,
}: LeadStepProps) => (
  <>
    <LeadChoiceGroup
      field="businessType"
      onChange={onChange}
      options={translations.steps.businessType.options}
      value={formData.businessType}
    />
    {formData.businessType === "other" && (
      <Input
        label={translations.steps.businessType.otherLabel}
        onChange={(value) => onChange("businessTypeOther", value.toString())}
        type="text"
        value={formData.businessTypeOther}
        required
      />
    )}
    <Input
      label={translations.steps.businessType.businessNameLabel}
      onChange={(value) => onChange("businessName", value.toString())}
      type="text"
      value={formData.businessName}
    />
  </>
);
