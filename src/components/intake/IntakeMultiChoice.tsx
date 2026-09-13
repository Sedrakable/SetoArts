import React from "react";
import cn from "classnames";
// Reuse the ChoiceGroup row styles so multi-select rows match single-select
// rows (border, gap, yellow selected background). Only the indicator differs.
import choiceStyles from "@/components/reuse/Form/ChoiceGroup/ChoiceGroup.module.scss";
import styles from "./Intake.module.scss";
import { outfit } from "@/components/reuse/Text/Heading/Heading";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";

interface IntakeMultiChoiceProps {
  options: readonly string[];
  values: string[];
  onToggle: (value: string) => void;
  isInvalid?: boolean;
}

// A square checkbox that fills and shows a checkmark when selected — the
// multi-select counterpart to ChoiceGroup's round radio indicator.
const CheckIndicator: React.FC<{ checked: boolean }> = ({ checked }) => (
  <span
    aria-hidden="true"
    className={cn(styles.checkbox, { [styles.checkboxChecked]: checked })}
  >
    {checked && (
      <svg viewBox="0 0 24 24" className={styles.checkmark} focusable="false">
        <polyline
          points="4 12 10 18 20 6"
          fill="none"
          stroke="var(--white)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </span>
);

// Rows mirror ChoiceGroup, but each is an independent checkbox so several can
// be selected at once.
export const IntakeMultiChoice: React.FC<IntakeMultiChoiceProps> = ({
  options,
  values,
  onToggle,
  isInvalid = false,
}) => (
  <FlexDiv
    className={choiceStyles.group}
    flex={{ direction: "column", x: "stretch", y: "flex-start" }}
    gapArray={[3]}
    width100
  >
    {options.map((option) => {
      const checked = values.includes(option);

      return (
        <button
          key={option}
          type="button"
          role="checkbox"
          aria-checked={checked}
          onClick={() => onToggle(option)}
          className={cn(choiceStyles.choice, outfit.className, {
            [choiceStyles.selected]: checked,
            [choiceStyles.invalid]: isInvalid,
          })}
        >
          <Paragraph level="regular" textAlign="left" color="black" weight={400}>
            {option}
          </Paragraph>
          <CheckIndicator checked={checked} />
        </button>
      );
    })}
  </FlexDiv>
);
