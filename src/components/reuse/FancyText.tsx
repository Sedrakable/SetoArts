import React, { CSSProperties } from "react";
import cn from "classnames";
import styles from "./FancyText.module.scss";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { IFancyText } from "../../data.d";
import FlexDiv from "./FlexDiv";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export interface FancyTextProps extends IFancyText {
  mode: "paragraph" | "heading" | "tab";
  dark?: boolean;
  textAlign?: CSSProperties["textAlign"];
}
export const FancyText: React.FC<FancyTextProps> = ({
  part1,
  part2,
  part3,
  mode,
  textAlign,
  dark = false,
}) => {
  const CursiveText = () => {
    return <span className={styles.cursive}>{part2}</span>;
  };
  const colorChoose = dark ? "black" : "white";
  switch (mode) {
    case "paragraph":
      return (
        <FlexDiv
          gapArray={[3]}
          flex={{ direction: "row", x: "flex-start", y: "flex-start" }}
          className={cn(styles.fancyParagraph, caveat.variable)}
          width100
          wrap
        >
          <Paragraph
            level="big"
            color={colorChoose}
            weight="regular"
            textAlign={textAlign}
          >
            <>
              {part1} <CursiveText /> {part3}
            </>
          </Paragraph>
        </FlexDiv>
      );
    case "heading":
      return (
        <FlexDiv
          gapArray={[4]}
          flex={{ direction: "row", x: "flex-start", y: "flex-start" }}
          className={cn(styles.fancyHeading, caveat.variable)}
          width100
          wrap
        >
          <Heading font="Seto" as="h1" level="2" color={colorChoose}>
            <>
              {part1} <CursiveText /> {part3}
            </>
          </Heading>
        </FlexDiv>
      );
    case "tab":
      return (
        <FlexDiv
          gapArray={[4]}
          flex={{ direction: "row", x: "flex-start", y: "flex-start" }}
          className={cn(styles.fancyTab, caveat.variable)}
          width100
          wrap
        >
          <Heading font="Seto" as="h5" level="5" color={colorChoose}>
            <>
              {part1} <CursiveText /> {part3}
            </>
          </Heading>
        </FlexDiv>
      );
    default:
      return "broken";
  }
};
