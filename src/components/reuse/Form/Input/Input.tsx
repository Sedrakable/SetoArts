import React, { useEffect, useRef } from "react";

import styles from "./Input.module.scss";
import cn from "classnames";
import { InputWrapper, InputWrapperProps } from "../InputWrapper/InputWrapper";
import { outfit } from "../../Heading";

export interface BaseInputProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | number) => void;
  placeholder?: string;
  value: string | number;
}

interface InputProps extends InputWrapperProps, BaseInputProps {
  type: React.HTMLInputTypeAttribute;
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  isInvalid = false,
}) => {
  return (
    <InputWrapper label={label} required={required} isInvalid={isInvalid}>
      <input
        type={type}
        value={value}
        id={type}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(styles.input, outfit.className, {
          [styles.invalid]: isInvalid,
        })} // Apply font and invalid styles
      />
    </InputWrapper>
  );
};

interface TextAreaProps extends InputWrapperProps, BaseInputProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  isInvalid = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Explicitly define the ref type

  // Function to adjust height
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
    }
  };

  // Adjust height on each value change
  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <InputWrapper label={label} required={required} isInvalid={isInvalid}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(styles.textarea, outfit.className, {
          [styles.invalid]: isInvalid,
        })} // Apply font and invalid styles
      />
    </InputWrapper>
  );
};
