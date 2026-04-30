import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { LeadStepProps } from "./LeadStepProps";
import { LeadChoiceGroup } from "./LeadStepHelpers";
import styles from "../LeadForm.module.scss";

export const LocationStep = ({
  formData,
  onChange,
  translations,
}: LeadStepProps) => (
  <>
    <LeadChoiceGroup
      field="installLocation"
      onChange={onChange}
      options={translations.steps.location.options}
      value={formData.installLocation}
    />
    {formData.installLocation && (
      <Paragraph className={styles.microcopy} color="dark-grey" level="regular">
        {translations.steps.location.microcopy[formData.installLocation]}
      </Paragraph>
    )}
  </>
);
