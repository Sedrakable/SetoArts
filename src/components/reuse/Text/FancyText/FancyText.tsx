import React from "react";
import cn from "classnames";
import styles from "./FancyText.module.scss";
import { fingerPaint, Heading, HeadingProps } from "../Heading/Heading";

import { PortableText, PortableTextComponents } from "@portabletext/react";

interface FancyTextProps extends Omit<HeadingProps, "children" | "font"> {
  value: any; // Comes from Sanity
}
export const FancyText: React.FC<FancyTextProps> = ({ value, ...props }) => {
  const customComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <Heading font="Outfit" {...props}>
          {children as string | JSX.Element}
        </Heading>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className={cn(styles.strong, fingerPaint.variable)}>
          {children}
        </strong>
      ),
    },
  };

  return <PortableText value={value} components={customComponents} />;
};
