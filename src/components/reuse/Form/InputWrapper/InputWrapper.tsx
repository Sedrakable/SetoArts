import React, { PropsWithChildren } from "react";

import styles from "./InputWrapper.module.scss";
import cn from "classnames";

import { Paragraph } from "../../Text/Paragraph/Paragraph";
import FlexDiv from "../../FlexDiv";

export interface InputWrapperProps {
  label: string;
  required?: boolean; // Optional prop to make input required
  isInvalid?: boolean; // To visually mark invalid fields
  honeyPot?: boolean; // To hide honeypot fields
}

export const InputWrapper: React.FC<PropsWithChildren<InputWrapperProps>> = ({
  label,
  children,
  required = false,
  isInvalid = false,
  honeyPot = false,
}) => {
  return (
    <FlexDiv
      className={cn(styles.inputContainer, {
        [styles.honeyPot]: honeyPot,
      })}
      flex={{ direction: "column" }}
      gapArray={[2]}
      as="label"
    >
      <Paragraph
        level="regular"
        color={isInvalid ? "error" : "black"} // Red color on invalid
        className={styles.label}
      >
        {label} {required && <span className={styles.required}>*</span>}
      </Paragraph>
      {children}
    </FlexDiv>
  );
};
