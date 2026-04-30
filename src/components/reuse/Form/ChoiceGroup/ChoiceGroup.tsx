import React from "react";
import cn from "classnames";
import styles from "./ChoiceGroup.module.scss";
import { outfit } from "../../Text/Heading/Heading";
import FlexDiv from "../../FlexDiv";
import { Paragraph } from "../../Text/Paragraph/Paragraph";

export type ChoiceGroupOption = string | { value: string; label: string };

interface ChoiceGroupProps {
  options: readonly ChoiceGroupOption[];
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
}

export const ChoiceGroup: React.FC<ChoiceGroupProps> = ({
  options,
  value,
  onChange,
  isInvalid = false,
}) => {
  return (
    <FlexDiv
      className={styles.group}
      flex={{ direction: "column", x: "stretch", y: "flex-start" }}
      gapArray={[3]}
      width100
    >
      {options.map((option) => {
        const choice =
          typeof option === "string"
            ? { value: option, label: option }
            : option;

        return (
          <button
            className={cn(styles.choice, outfit.className, {
              [styles.selected]: value === choice.value,
              [styles.invalid]: isInvalid,
            })}
            key={choice.value}
            onClick={() => onChange(choice.value)}
            type="button"
          >
            <Paragraph
              level="regular"
              textAlign="left"
              color="black"
              weight={400}
            >
              {choice.label}
            </Paragraph>
          </button>
        );
      })}
    </FlexDiv>
  );
};
