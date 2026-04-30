import { Input } from "@/components/reuse/Form/Input/Input";
import { MultiColumn } from "@/components/reuse/Form/Form";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { LeadStepProps } from "./LeadStepProps";
import { LeadChoiceGroup } from "./LeadStepHelpers";
import styles from "../LeadForm.module.scss";

export const ContactStep = ({
  formData,
  onChange,
  translations,
}: LeadStepProps) => (
  <FlexDiv
    className={styles.fields}
    flex={{ direction: "column", x: "stretch", y: "flex-start" }}
    gapArray={[4]}
    width100
  >
    <Input
      honeyPot
      label={translations.steps.contact.companyLabel}
      onChange={(value) => onChange("company", value.toString())}
      type="text"
      value={formData.company}
    />
    <MultiColumn>
      <Input
        label={translations.steps.contact.firstNameLabel}
        onChange={(value) => onChange("firstName", value.toString())}
        required
        type="text"
        value={formData.firstName}
      />
      <Input
        label={translations.steps.contact.lastNameLabel}
        onChange={(value) => onChange("lastName", value.toString())}
        type="text"
        value={formData.lastName}
      />
    </MultiColumn>
    <Input
      label={translations.steps.contact.emailLabel}
      onChange={(value) => onChange("email", value.toString())}
      required
      type="email"
      value={formData.email}
    />
    <Input
      label={translations.steps.contact.phoneLabel}
      onChange={(value) => onChange("phone", value.toString())}
      required
      type="tel"
      value={formData.phone}
    />
    <Paragraph color="dark-grey" level="regular" weight={600}>
      {translations.steps.contact.preferenceQuestion}
    </Paragraph>
    <LeadChoiceGroup
      field="preferredContact"
      onChange={onChange}
      options={translations.steps.contact.contactOptions}
      value={formData.preferredContact}
    />
  </FlexDiv>
);
