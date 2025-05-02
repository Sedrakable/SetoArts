"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Select.module.scss";
import cn from "classnames";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n/request";
import { useLocale } from "next-intl";
import FlexDiv from "../../FlexDiv";
import { Icon } from "../../Icon/Icon";
import { Paragraph } from "../../Text/Paragraph/Paragraph";
import { InputWrapper } from "../InputWrapper/InputWrapper";

export interface OptionType {
  value: string;
  label: string;
}

export interface SelectProps {
  options: OptionType[];
  onChange: (selected: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  defaultValue?: string;
  required?: boolean;
  isInvalid?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  placeholder,
  disabled = false,
  label,
  required = false,
  isInvalid = false,
  defaultValue = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(defaultValue);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [searchString, setSearchString] = useState("");
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  // Sync selected value with defaultValue changes
  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset highlight and search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(-1);
      setSearchString("");
    }
  }, [isOpen]);

  const scrollOptionIntoView = (index: number) => {
    if (listRef.current && index >= 0) {
      const optionElement = listRef.current.children[index] as HTMLElement;
      optionElement?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (["Enter", " ", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prev) => {
          const nextIndex = prev < options.length - 1 ? prev + 1 : 0;
          scrollOptionIntoView(nextIndex);
          return nextIndex;
        });
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prev) => {
          const nextIndex = prev > 0 ? prev - 1 : options.length - 1;
          scrollOptionIntoView(nextIndex);
          return nextIndex;
        });
        break;
      case "Enter":
        event.preventDefault();
        if (highlightedIndex >= 0) {
          handleOptionClick(options[highlightedIndex].value);
        }
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        break;
      default:
        if (event.key.length === 1 && /[a-z0-9]/i.test(event.key)) {
          const newSearchString = searchString + event.key.toLowerCase();
          setSearchString(newSearchString);

          if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
          searchTimeoutRef.current = setTimeout(
            () => setSearchString(""),
            1000
          );

          const matchingIndex = options.findIndex((option) =>
            option.label.toLowerCase().startsWith(newSearchString)
          );
          if (matchingIndex >= 0) {
            setHighlightedIndex(matchingIndex);
            scrollOptionIntoView(matchingIndex);
          }
        }
    }
  };

  const handleToggle = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (value: string) => {
    if (!disabled) {
      setSelected(value);
      onChange(value);
      setIsOpen(false);
    }
  };

  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label ||
    placeholder ||
    translations.form.general.select;

  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
      className={cn(styles.container, { [styles.disabled]: disabled })}
      ref={selectRef}
      width100
      gapArray={[2]}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="select-dropdown"
    >
      <InputWrapper label={label!} required={required} isInvalid={isInvalid}>
        <FlexDiv
          className={cn(styles.select, { [styles.invalid]: isInvalid })}
          onClick={handleToggle}
          flex={{ x: "space-between" }}
          gapArray={[5]}
          width100
          padding={{ left: [4], right: [5] }}
        >
          <Paragraph level="regular" color={selected ? "black" : "yellow"}>
            {selectedLabel}
          </Paragraph>
          <Icon
            icon="arrow"
            color="black"
            size="extra-small"
            rotate={isOpen ? 270 : 90}
          />
        </FlexDiv>
      </InputWrapper>
      {isOpen && !disabled && (
        <FlexDiv
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
          className={styles.dropdown}
          as="ul"
          ref={listRef}
          role="listbox"
          id="select-dropdown"
        >
          {options.map((option, index) => (
            <FlexDiv
              width100
              as="li"
              padding={{ vertical: [4, 4, 3], horizontal: [4] }}
              className={cn(styles.tab, {
                [styles.selected]: option.value === selected,
                [styles.highlighted]: index === highlightedIndex,
              })}
              onClick={() => handleOptionClick(option.value)}
              key={option.value}
              role="option"
              aria-selected={option.value === selected}
            >
              <Paragraph level="regular" color="black">
                {option.label}
              </Paragraph>
            </FlexDiv>
          ))}
        </FlexDiv>
      )}
    </FlexDiv>
  );
};
