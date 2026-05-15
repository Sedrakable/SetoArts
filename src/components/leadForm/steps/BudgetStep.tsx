import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { LeadStepProps } from "./LeadStepProps";
import { LeadChoiceGroup } from "./LeadStepHelpers";
import styles from "../LeadForm.module.scss";

export const BudgetStep = ({
  formData,
  onAutoAdvance,
  onChange,
  translations,
}: LeadStepProps) => (
  <>
    <LeadChoiceGroup
      field="budget"
      onAutoAdvance={onAutoAdvance}
      onChange={onChange}
      options={translations.steps.budget.options}
      shouldAutoAdvance={() => true}
      value={formData.budget}
    />
    <Paragraph className={styles.microcopy} color="dark-grey" level="regular">
      {translations.steps.budget.microcopy}
    </Paragraph>
  </>
);
