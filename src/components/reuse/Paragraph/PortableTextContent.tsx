import React, { CSSProperties } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Paragraph, ParagraphProps } from "./Paragraph";

interface PortableTextContentProps extends Omit<ParagraphProps, "children"> {
  value: any;
  differentColorForStrongText?: boolean;
}

export const PortableTextContent: React.FC<PortableTextContentProps> = ({
  value,
  color = "black", // default color
  textAlign = "left",
  weight = 300,
  level = "regular",
  differentColorForStrongText = true,
  className,
}) => {
  const contastColor = differentColorForStrongText ? `var(--burgundy)` : color;
  const quote = (
    <strong style={{ fontWeight: 500, color: contastColor }}>"</strong>
  );
  const myComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <Paragraph
          level={level}
          weight={weight}
          color={color}
          textAlign={textAlign}
          className={className}
        >
          {children}
        </Paragraph>
      ),
      blockquote: ({ children }) => (
        <Paragraph
          level={level}
          weight={weight}
          color={color}
          textAlign={textAlign}
          className={className}
        >
          <em>
            {quote}
            {children}
            {quote}
          </em>
        </Paragraph>
      ),
    },
    marks: {
      link: ({ children, value }) => (
        <a
          style={{
            fontWeight: weight + 100,
            color: contastColor,
            textDecoration: "underline",
          }}
          {...value}
          target="_blank"
        >
          {children}
        </a>
      ),
      strong: ({ children }) => (
        <strong style={{ fontWeight: weight + 200, color: contastColor }}>
          {children}
        </strong>
      ),
      em: ({ children }) => <em>{children}</em>,
    },
    list: {
      bullet: ({ children }) => <ul className={className}>{children}</ul>,
      number: ({ children }) => <ol className={className}>{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => (
        <Paragraph as="li" level={level} weight={weight} color={color}>
          {children}
        </Paragraph>
      ),
      number: ({ children }) => (
        <Paragraph as="li" level={level} weight={weight} color={color}>
          {children}
        </Paragraph>
      ),
    },
  };

  return <PortableText value={value} components={myComponents} />;
};
