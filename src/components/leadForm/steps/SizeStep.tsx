import { Input } from "@/components/reuse/Form/Input/Input";
import { MultiColumn } from "@/components/reuse/Form/Form";
import { Select } from "@/components/reuse/Form/Select/Select";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { LeadFormData } from "../leadFormTypes";
import { LeadStepProps } from "./LeadStepProps";
import { LeadChoiceGroup } from "./LeadStepHelpers";
import styles from "../LeadForm.module.scss";

export const SizeStep = ({
  formData,
  onAutoAdvance,
  onChange,
  translations,
}: LeadStepProps) => (
  <>
    <LeadChoiceGroup
      field="sizeKnowledge"
      onAutoAdvance={onAutoAdvance}
      onChange={onChange}
      options={translations.steps.size.options}
      shouldAutoAdvance={(value) => value === "need-help"}
      value={formData.sizeKnowledge}
    />
    <Paragraph className={styles.microcopy} color="dark-grey" level="regular">
      {translations.steps.size.microcopy}
    </Paragraph>
    {formData.sizeKnowledge === "known-size" && (
      <MultiColumn>
        <Input
          label={translations.steps.size.widthLabel}
          onChange={(value) => onChange("width", value.toString())}
          type="number"
          value={formData.width}
          required
        />
        <Input
          label={translations.steps.size.heightLabel}
          onChange={(value) => onChange("height", value.toString())}
          type="number"
          value={formData.height}
          required
        />
        <Select
          defaultValue={formData.unit}
          fit="shrink"
          label={translations.steps.size.unitLabel}
          onChange={(value) => onChange("unit", value as LeadFormData["unit"])}
          options={translations.steps.size.unitOptions}
        />
      </MultiColumn>
    )}
    {formData.sizeKnowledge === "rough-size" && (
      <LeadChoiceGroup
        field="roughSize"
        onAutoAdvance={onAutoAdvance}
        onChange={onChange}
        options={translations.steps.size.roughOptions}
        shouldAutoAdvance={() => true}
        value={formData.roughSize}
      />
    )}
  </>
);
