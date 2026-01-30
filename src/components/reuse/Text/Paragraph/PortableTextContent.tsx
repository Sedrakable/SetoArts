import React from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";

import { Paragraph, ParagraphProps } from "./Paragraph";
import { FancyText } from "../FancyText/FancyText";
import FlexDiv from "../../FlexDiv";
import { SpacingArrayType } from "@/helpers/SpacingGenerator";

interface PortableTextContentProps extends Omit<ParagraphProps, "children"> {
  value: FancyText;
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
  const paddingBetweenParagraphs: SpacingArrayType = [3, 3, 3, 3];
  const contastColor =
    differentColorForStrongText && color === "white" ? `var(--white)` : color;
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
      normal: ({ children }) => {
        const isEmpty =
          Array.isArray(children) &&
          children.every((c) => typeof c === "string" && c.trim() === "");

        if (isEmpty) return <div style={{ height: "1em" }} />; // or 16px

        return (
          <Paragraph
            level={level}
            weight={weight}
            color={color}
            textAlign={textAlign}
            paddingBottomArray={paddingBetweenParagraphs}
            className={className}
          >
            {children}
          </Paragraph>
        );
      },
      blockquote: ({ children }) => (
        <Paragraph
          level={level}
          weight={weight}
          color={color}
          textAlign={textAlign}
          paddingBottomArray={paddingBetweenParagraphs}
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
          paddingBottomArray={paddingBetweenParagraphs}
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
          paddingBottomArray={paddingBetweenParagraphs}
        >
          {children}
        </Paragraph>
      ),
    },
  };

  return (
    <FlexDiv
      padding={{ bottom: paddingBottomArray }}
      flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
      customStyle={{ maxWidth: "fit-content" }}
    >
      <PortableText value={value} components={myComponents} />
    </FlexDiv>
  );
};
