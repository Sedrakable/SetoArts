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
  paddingBottomArray,
}) => {
  const contastColor = differentColorForStrongText ? `var(--black)` : color;
  const quote = (
    <strong
      style={{
        fontWeight: 900,
        color: contastColor,
      }}
    >
      {" "}
      |{" "}
    </strong>
  );
  const myComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <Paragraph
          level={level}
          weight={weight}
          color={color}
          textAlign={textAlign}
          paddingBottomArray={paddingBottomArray}
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
          paddingBottomArray={paddingBottomArray}
          className={className}
        >
          {quote}
          {children}
          {quote}
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
        <Paragraph
          as="li"
          level={level}
          weight={weight}
          color={color}
          paddingBottomArray={paddingBottomArray}
        >
          {children}
        </Paragraph>
      ),
      number: ({ children }) => (
        <Paragraph
          as="li"
          level={level}
          weight={weight}
          color={color}
          paddingBottomArray={paddingBottomArray}
        >
          {children}
        </Paragraph>
      ),
    },
  };

  return <PortableText value={value} components={myComponents} />;
};
