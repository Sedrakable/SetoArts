import { LeadStepProps } from "./LeadStepProps";
import { LeadChoiceGroup } from "./LeadStepHelpers";

export const TimelineStep = ({
  formData,
  onChange,
  translations,
}: LeadStepProps) => (
  <LeadChoiceGroup
    field="timeline"
    onChange={onChange}
    options={translations.steps.timeline.options}
    value={formData.timeline}
  />
);
