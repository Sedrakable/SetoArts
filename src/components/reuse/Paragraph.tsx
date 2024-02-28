import React, { CSSProperties } from "react";
import styles from "./Paragraph.module.scss";
import cn from "classnames";
import {
  SpacingArrayType,
  useSpacingGenerator,
} from "../../helpers/SpacingGenerator";

export interface ParagraphProps {
  children: string | JSX.Element;
  level: "small" | "regular" | "big";
  textAlign?: CSSProperties["textAlign"];
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

const processChildren = (children: string | JSX.Element) => {
  if (typeof children === "string") {
    // Replace newline characters with <br /> elements
    return children.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }
  return children;
};

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  level = "regular",
  textAlign,
  weight = "weak",
  paddingBottomArray,
  color = "white",
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
      {processChildren(children)}
    </p>
  );
};
