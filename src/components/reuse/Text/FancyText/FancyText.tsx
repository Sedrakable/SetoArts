import React from "react";
import { fingerPaint, Heading, HeadingProps } from "../Heading/Heading";

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

const splitX = (text: string) => text.split(/(\s[xX]\s)/g);

const transformXNodes = (node: React.ReactNode): React.ReactNode => {
  if (typeof node === "string") {
    const parts = splitX(node);
    if (parts.length === 1) return node;

    return parts.map((part, i) =>
      /\s[xX]\s/.test(part) ? (
        <span
          key={i}
          className={fingerPaint.className}
          style={{ color: "var(--dark-grey)" }}
        >
          {part}
        </span>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      ),
    );
  }

  if (Array.isArray(node)) return node.map(transformXNodes);

  if (React.isValidElement(node)) {
    // recurse into any element children (keeps <strong>, etc.)
    return React.cloneElement(node, {
      ...node.props,
      children: transformXNodes(node.props.children),
    });
  }

  return node;
};

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
        <Heading {...props}>
          {isOutfit ? <>{transformXNodes(children)}</> : <>{children}</>}
        </Heading>
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
