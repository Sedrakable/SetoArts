import { LeadStepProps } from "./LeadStepProps";
import { LeadChoiceGroup } from "./LeadStepHelpers";

export const TimelineStep = ({
  formData,
  onAutoAdvance,
  onChange,
  translations,
}: LeadStepProps) => (
  <LeadChoiceGroup
    field="timeline"
    onAutoAdvance={onAutoAdvance}
    onChange={onChange}
    options={translations.steps.timeline.options}
    shouldAutoAdvance={() => true}
    value={formData.timeline}
  />
);
