"use client";
import React, { Suspense, useEffect, useState } from "react";
import styles from "./Questions.module.scss";
import cn from "classnames";
import { BlockVariantType, Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import { IQuestion } from "@/data.d";
import { useWindowResize } from "@/helpers/useWindowResize";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";
import { PortableTextContent } from "@/components/reuse/Paragraph/PortableTextContent";

const Question: React.FC<IQuestion> = ({ title, desc, extraNote }) => {
  return (
    <FlexDiv
      flex={{ direction: "column", y: "flex-start" }}
      width100
      gapArray={[1]}
      as="li"
    >
      <FlexDiv
        padding={{ left: [3], bottom: [4], right: [4] }}
        flex={{ y: "flex-start" }}
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
            <Paragraph level="regular" color="black" textAlign="right">
              {extraNote}
            </Paragraph>
          </FlexDiv>
        )}
      </FlexDiv>

      <PortableTextContent
        level="regular"
        value={desc}
        className={styles.desc}
      />
    </FlexDiv>
  );
};

export interface QuestionsProps {
  variant: BlockVariantType;
  questions: IQuestion[];
}

export const Questions: React.FC<QuestionsProps> = ({
  questions,
  variant = "dark",
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <Block variant={variant}>
      <FlexDiv
        flex={{ direction: "column", x: "stretch" }}
        width100
        padding={{ bottom: [4, 5, 5, 6] }}
      >
        <Heading
          font="Outfit"
          as="h3"
          level="2"
          color="black"
          className={styles.heading}
          textAlign="left"
          weight={400}
        >
          {translations.blockTitles.questionTitle1}
        </Heading>
        <Heading
          font="Cursive"
          as="h3"
          level="2"
          color="yellow"
          className={styles.heading}
          textAlign="right"
          weight={400}
          paddingBottomArray={[4, 5, 5, 6]}
        >
          {translations.blockTitles.questionTitle2}
        </Heading>
        <Heading
          font="Outfit"
          as="h3"
          level="4"
          color="black"
          className={styles.heading}
          textAlign="center"
          upperCase={false}
          weight={400}
        >
          {translations.blockTitles.questionTitle3}
        </Heading>
      </FlexDiv>
      <FlexDiv
        gapArray={[6, 7, 7, 8]}
        flex={{ y: "flex-start" }}
        width100
        className={cn(styles.questions, styles[variant])}
        as="ul"
      >
        {questions?.map((question: IQuestion, key) => {
          return <Question {...question} key={key} />;
        })}
      </FlexDiv>
    </Block>
  );
};
