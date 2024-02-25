import React, { CSSProperties } from "react";
import styles from "./FancyText.module.scss";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { IFancyText } from "../../data";
import FlexDiv from "./FlexDiv";

export interface FancyTextProps extends IFancyText {
  paragraph?: boolean;
  dark?: boolean;
  textAlign?: CSSProperties["textAlign"];
}
export const FancyText: React.FC<FancyTextProps> = ({
  part1,
  part2,
  part3,
  paragraph,
  textAlign,
  dark = false,
}) => {
  const CursiveText = () => {
    return <span className={styles.cursive}>{part2}</span>;
  };
  const colorChoose = dark ? "black" : "white";
  return paragraph ? (
    <FlexDiv
      gapArray={[3]}
      flex={{ direction: "row", x: "flex-start", y: "flex-start" }}
      className={styles.fancyParagraph}
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
  ) : (
    <FlexDiv
      gapArray={[4]}
      flex={{ direction: "row", x: "flex-start", y: "flex-start" }}
      className={styles.fancyHeading}
      width100
      wrap
    >
      <Heading font="Seto" as="h2" level="2" color={colorChoose}>
        <>
          {part1} <CursiveText /> {part3}
        </>
      </Heading>
    </FlexDiv>
  );
};
