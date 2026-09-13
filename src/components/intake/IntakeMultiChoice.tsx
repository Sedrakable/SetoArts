import React from "react";
import cn from "classnames";
import styles from "./Intake.module.scss";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { outfit } from "@/components/reuse/Text/Heading/Heading";

interface IntakeMultiChoiceProps {
  options: readonly string[];
  values: string[];
  onToggle: (value: string) => void;
  isInvalid?: boolean;
}

// Checkbox group styled to match ChoiceGroup's single-select rows. Uses real
// <input type="checkbox"> elements (visually hidden, keyboard-reachable) so the
// control stays accessible while looking like the rest of the form.
export const IntakeMultiChoice: React.FC<IntakeMultiChoiceProps> = ({
  options,
  values,
  onToggle,
  isInvalid = false,
}) => (
  <FlexDiv
    className={styles.multi}
    flex={{ direction: "column", x: "stretch", y: "flex-start" }}
    gapArray={[3]}
    width100
  >
    {options.map((option) => {
      const checked = values.includes(option);

      return (
        <label
          key={option}
          className={cn(styles.optionRow, {
            [styles.optionSelected]: checked,
            [styles.optionInvalid]: isInvalid,
          })}
        >
          <input
            type="checkbox"
            className={styles.nativeCheckbox}
            checked={checked}
            onChange={() => onToggle(option)}
          />
          <Paragraph
            level="regular"
            textAlign="left"
            color="black"
            weight={400}
            className={outfit.className}
          >
            {option}
          </Paragraph>
          <span
            aria-hidden="true"
            className={cn(styles.checkIndicator, {
              [styles.checkIndicatorActive]: checked,
            })}
          >
            {checked && (
              <Paragraph level="small" color="white" weight={600}>
                ✓
              </Paragraph>
            )}
          </span>
        </label>
      );
    })}
  </FlexDiv>
);
