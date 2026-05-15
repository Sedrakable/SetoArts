import { Input } from "@/components/reuse/Form/Input/Input";
import { LeadStepProps } from "./LeadStepProps";
import { LeadChoiceGroup } from "./LeadStepHelpers";

export const GoalStep = ({
  formData,
  onAutoAdvance,
  onChange,
  translations,
}: LeadStepProps) => (
  <>
    <LeadChoiceGroup
      field="goal"
      onAutoAdvance={onAutoAdvance}
      onChange={onChange}
      options={translations.steps.goal.options}
      shouldAutoAdvance={(value) => value !== "other"}
      value={formData.goal}
    />
    {formData.goal === "other" && (
      <Input
        label={translations.steps.goal.otherLabel}
        onChange={(value) => onChange("goalOther", value.toString())}
        type="text"
        value={formData.goalOther}
        required
      />
    )}
  </>
);
