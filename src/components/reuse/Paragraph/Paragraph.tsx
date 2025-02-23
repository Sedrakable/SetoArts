"use client";
import React, { CSSProperties, ReactNode } from "react";
import styles from "./Paragraph.module.scss";
import cn from "classnames";
import {
  SpacingArrayType,
  useSpacingGenerator,
} from "../../../helpers/SpacingGenerator";
import { Outfit } from "next/font/google";
import { ColorType, outfit } from "../Heading";

export interface ParagraphProps {
  as?: "p" | "li" | "span"; // ✅ Allow different HTML elements
  children: string | ReactNode;
  level: "small" | "regular" | "big";
  textAlign?: CSSProperties["textAlign"];
  paddingBottomArray?: SpacingArrayType;
  color?: ColorType;
  weight?: 300 | 400 | 600;
  capitalise?: boolean;
  clickable?: boolean;
  className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  as = "p", // ✅ Allow different HTML elements
  children,
  level = "regular",
  textAlign,
  weight = 400,
  paddingBottomArray,
  color = "white",
  capitalise,
  clickable,
  className,
}) => {
  const { spacingNum } = useSpacingGenerator(paddingBottomArray);

  const CustomTag = as as keyof JSX.IntrinsicElements; // ✅ Dynamic HTML tag

  return (
    <CustomTag
      className={cn(
        styles.paragraph,
        outfit.className,
        styles[level],
        {
          [styles.clickable]: clickable,
        },
        className
      )}
      style={{
        textTransform: capitalise ? "capitalize" : "none",
        color: `var(--${color})`,
        textAlign,
        fontWeight: weight,
        paddingBottom: spacingNum && `var(--pad-${spacingNum})`,
      }}
    >
      {children}
    </CustomTag>
  );
};
