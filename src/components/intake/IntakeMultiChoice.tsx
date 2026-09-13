import React from "react";
import cn from "classnames";
// Reuse the ChoiceGroup styles verbatim so multi-select rows are visually
// identical to the single-select choice rows already used across the form.
import styles from "@/components/reuse/Form/ChoiceGroup/ChoiceGroup.module.scss";
import { outfit } from "@/components/reuse/Text/Heading/Heading";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";

interface IntakeMultiChoiceProps {
  options: readonly string[];
  values: string[];
  onToggle: (value: string) => void;
  isInvalid?: boolean;
}

// Same markup and classes as ChoiceGroup, but each row is an independent
// checkbox so several can be selected. The selected state reuses ChoiceGroup's
// filled indicator — no custom checkmark glyph.
export const IntakeMultiChoice: React.FC<IntakeMultiChoiceProps> = ({
  options,
  values,
  onToggle,
  isInvalid = false,
}) => (
  <FlexDiv
    className={styles.group}
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
          className={cn(styles.choice, outfit.className, {
            [styles.selected]: checked,
            [styles.invalid]: isInvalid,
          })}
        >
          <Paragraph level="regular" textAlign="left" color="black" weight={400}>
            {option}
          </Paragraph>
          <span
            className={cn(styles.indicator, styles.selectIndicator, {
              [styles.selectIndicatorActive]: checked,
            })}
          />
        </button>
      );
    })}
  </FlexDiv>
);
