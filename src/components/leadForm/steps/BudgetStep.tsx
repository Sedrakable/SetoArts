import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { LeadStepProps } from "./LeadStepProps";
import { LeadChoiceGroup } from "./LeadStepHelpers";
import styles from "../LeadForm.module.scss";

export const BudgetStep = ({
  formData,
  onChange,
  translations,
}: LeadStepProps) => (
  <>
    <LeadChoiceGroup
      field="budget"
      onChange={onChange}
      options={translations.steps.budget.options}
      value={formData.budget}
    />
    <Paragraph className={styles.microcopy} color="dark-grey" level="regular">
      {translations.steps.budget.microcopy}
    </Paragraph>
  </>
);
