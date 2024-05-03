"use client";
import React from "react";
import styles from "./Heading.module.scss";
import cn from "classnames";
import {
  SpacingArrayType,
  useSpacingGenerator,
} from "../../helpers/SpacingGenerator";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export type ColorType = "white" | "black" | "yellow" | "grey";

export const HeadingLevelArray = ["1", "2", "3", "4", "5"] as const;

type HeadingLevelType = typeof HeadingLevelArray[number];

export const HeadingAsArray = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "span",
] as const;

type HeadingAsType = typeof HeadingAsArray[number];

type textAlign =
  | "start"
  | "end"
  | "left"
  | "right"
  | "center"
  | "justify"
  | "match-parent";

export interface HeadingProps {
  font: "Seto" | "Cursive";
  children: string | JSX.Element;
  level: HeadingLevelType;
  as: HeadingAsType;
  textAlign?: textAlign;
  paddingBottomArray?: SpacingArrayType;
  color?: ColorType;
  upperCase?: boolean;
  capitalise?: boolean;
  clickable?: boolean;
  className?: string;
}

export const capitalizeString = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const Heading: React.FC<HeadingProps> = ({
  font = "Seto",
  children,
  level,
  as,
  textAlign,
  paddingBottomArray,
  color = "white",
  upperCase = true,
  capitalise,
  clickable,
  className,
}) => {
  const { spacingNum } = useSpacingGenerator(paddingBottomArray);

  const CustomHeading = as as keyof JSX.IntrinsicElements;

  const finalString =
    typeof children === "string" && upperCase
      ? children?.toUpperCase()
      : capitalise
      ? capitalizeString(children as string)
      : children;

  return (
    <CustomHeading
      className={cn(
        styles.heading,
        styles[`level${level}`],
        {
          [styles.gradient]: color.includes("grad"),
          [styles.clickable]: clickable,
          [styles.seto]: font === "Seto",
          [styles.cursive]: font === "Cursive",
          [caveat.variable]: font === "Cursive",
        },
        className
      )}
      style={{
        color: `var(--${color})`,
        textAlign,
        paddingBottom: spacingNum && `var(--pad-${spacingNum})`,
      }}
    >
      {finalString}
    </CustomHeading>
  );
};
