import React from "react";
import { Heading, HeadingProps } from "../Heading/Heading";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

export type FancyText = PortableTextBlock[];
interface FancyTextProps extends Omit<HeadingProps, "children"> {
  value: FancyText; // Comes from Sanity
}

// helpers
const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

function getStrongColorForCursive(color?: string) {
  switch (color) {
    case "light-grey":
      return "dark-grey";
    case "dark-grey":
      return "black";
    default:
      return undefined; // no override
  }
}

export const FancyText: React.FC<FancyTextProps> = ({ value, ...props }) => {
  const { font, color, weight } = props;

  const isOutfit = font === "Outfit";
  const isCursive = font === "Cursive";

  const strongStyle: React.CSSProperties = {};

  if (isOutfit) {
    const base = typeof weight === "number" ? weight : 400;
    strongStyle.fontWeight = clamp(base + 200, 300, 900);
  }

  if (isCursive) {
    const darker = getStrongColorForCursive(color);
    if (darker) strongStyle.color = `var(--${darker})`;
    // If you aren't using CSS vars like --dark-grey, then map to actual hex values instead.
  }

  const customComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <Heading {...props}>{children as string | JSX.Element}</Heading>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong
          // className={cn(styles.stron}
          style={strongStyle}
        >
          {children}
        </strong>
      ),
    },
  };

  return <PortableText value={value} components={customComponents} />;
};
