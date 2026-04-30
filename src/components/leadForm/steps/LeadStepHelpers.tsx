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
  options: readonly ChoiceGroupOption[];
  value: string;
}

export const LeadChoiceGroup = ({
  field,
  onChange,
  options,
  value,
}: LeadChoiceGroupProps) => (
  <ChoiceGroup
    options={options}
    value={value}
    onChange={(choice) => onChange(field, choice)}
  />
);
