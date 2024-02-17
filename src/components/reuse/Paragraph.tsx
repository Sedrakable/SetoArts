import React from "react";
import styles from "./Paragraph.module.scss";
import cn from "classnames";
import { capitalizeString } from "./Heading";
import {
  SpacingArrayType,
  useSpacingGenerator,
} from "../../helpers/SpacingGenerator";

type textAlign =
  | "start"
  | "end"
  | "left"
  | "right"
  | "center"
  | "justify"
  | "match-parent";

export interface ParagraphProps {
  children: string | JSX.Element;
  level: "small" | "regular" | "big";
  textAlign?: textAlign;
  paddingBottomArray?: SpacingArrayType;
  color?: "white" | "black" | "grey" | "yellow";
  weight?: "weak" | "regular";
  capitalise?: boolean;
  clickable?: boolean;
  className?: string;
}

const fontWeights = {
  weak: 300,
  regular: 400,
};

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  level = "regular",
  textAlign,
  weight = "weak",
  paddingBottomArray,
  color = "white",
  capitalise,
  clickable,
  className,
}) => {
  const { spacingNum } = useSpacingGenerator(paddingBottomArray);

  return (
    <p
      className={cn(
        styles.paragraph,
        styles[level],
        {
          [styles.clickable]: clickable,
        },
        className
      )}
      style={{
        color: `var(--${color})`,
        textAlign,
        fontWeight: fontWeights[weight],
        paddingBottom: spacingNum && `var(--pad-${spacingNum})`,
      }}
    >
      {children}
      {/* {capitalise ? capitalizeString(children) : children} */}
    </p>
  );
};
