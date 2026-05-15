import {
  ChoiceGroup,
  ChoiceGroupOption,
} from "@/components/reuse/Form/ChoiceGroup/ChoiceGroup";
import { LeadFormData } from "../leadFormTypes";

interface LeadChoiceGroupProps {
  field: keyof LeadFormData;
  onChange: <Key extends keyof LeadFormData>(
    key: Key,
    value: LeadFormData[Key],
  ) => void;
  onAutoAdvance?: <Key extends keyof LeadFormData>(
    key: Key,
    value: LeadFormData[Key],
  ) => void;
  options: readonly ChoiceGroupOption[];
  shouldAutoAdvance?: (value: string) => boolean;
  value: string;
}

export const LeadChoiceGroup = ({
  field,
  onAutoAdvance,
  onChange,
  options,
  shouldAutoAdvance = () => false,
  value,
}: LeadChoiceGroupProps) => (
  <ChoiceGroup
    getOptionMode={(choice) => (shouldAutoAdvance(choice) ? "advance" : "select")}
    options={options}
    value={value}
    onChange={(choice) => {
      if (shouldAutoAdvance(choice) && onAutoAdvance) {
        onAutoAdvance(field, choice);
        return;
      }

      onChange(field, choice);
    }}
  />
);
