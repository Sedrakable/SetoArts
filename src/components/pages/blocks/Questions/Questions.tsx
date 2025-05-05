"use client";
import React from "react";
import styles from "./Questions.module.scss";
import cn from "classnames";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { IQuestion, ITheme } from "@/data.d";
import { LangType } from "@/i18n/request";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";

const Question: React.FC<IQuestion> = ({
  title,
  desc,
  extraNote,
  theme = "light",
}) => {
  return (
    <FlexDiv
      flex={{ direction: "column", y: "flex-start" }}
      width100
      gapArray={[1]}
    >
      <FlexDiv
        padding={{ left: [3], bottom: [4], right: [4] }}
        flex={{ x: "flex-start", y: "flex-start" }}
        className={styles.titleContainer}
        width100
      >
        <Heading
          font="Outfit"
          level="4"
          as="h3"
          color="black"
          weight={700}
          textAlign="left"
        >
          {title}
        </Heading>
        {extraNote && (
          <FlexDiv
            padding={{ vertical: [2], right: [5] }}
            className={styles.extraNote}
          >
            <Paragraph
              level="regular"
              color={theme === "dark" ? "white" : "black"}
              textAlign="right"
            >
              {extraNote}
            </Paragraph>
          </FlexDiv>
        )}
      </FlexDiv>

      <PortableTextContent
        level="regular"
        value={desc}
        className={styles.desc}
        differentColorForStrongText={false}
        color={theme === "dark" ? "white" : "black"}
      />
    </FlexDiv>
  );
};

export interface QuestionsProps {
  theme: ITheme;
  questions: IQuestion[];
}

export const Questions: React.FC<QuestionsProps> = ({
  questions,
  theme = "dark",
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <Block theme={theme} className={styles.block}>
      <FlexDiv
        flex={{ direction: "column", x: "stretch" }}
        width100
        padding={{ bottom: [4, 5, 5, 6] }}
        gapArray={[2, 3, 3, 4]}
      >
        <AnimatedWrapper from="left">
          <Heading
            font="Outfit"
            as="h3"
            level="2"
            color={theme === "dark" ? "white" : "black"}
            className={styles.heading}
            textAlign={"center"}
            weight={400}
          >
            {translations.titles.questionTitle1}
          </Heading>
        </AnimatedWrapper>
        <AnimatedWrapper from="right">
          <Heading
            font="Cursive"
            as="h3"
            level="2"
            color="yellow"
            className={styles.heading}
            textAlign={"center"}
            weight={400}
            paddingBottomArray={[4, 5, 5, 6]}
          >
            {translations.titles.questionTitle2}
          </Heading>
        </AnimatedWrapper>
        <Heading
          font="Outfit"
          as="h3"
          level="4"
          color={theme === "dark" ? "white" : "black"}
          className={styles.heading}
          textAlign="center"
          upperCase={false}
          weight={400}
        >
          {translations.titles.questionTitle3}
        </Heading>
      </FlexDiv>
      <FlexDiv
        gapArray={[6, 7, 7, 8]}
        flex={{ y: "flex-start" }}
        width100
        className={cn(styles.questions, styles[theme])}
        as="ul"
      >
        {questions?.map((question: IQuestion, key) => {
          return (
            <AnimatedWrapper from="inside" key={key} as="li">
              <Question {...question} theme={theme} />
            </AnimatedWrapper>
          );
        })}
      </FlexDiv>
    </Block>
  );
};
