"use client";
import React from "react";
import styles from "./QuestionsBlock.module.scss";
import cn from "classnames";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { IQuestion } from "@/data.d";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";
import { FancyTitleProps } from "@/components/reuse/FancyTitle/FancyTitle";
import { FancyText } from "@/components/reuse/Text/FancyText/FancyText";
import { FancyDivWrapper } from "../../containers/FancyDivWrapper/FancyDivWrapper";

const Question: React.FC<IQuestion> = ({ title, desc }) => {
  return (
    <FancyDivWrapper>
      <FlexDiv
        flex={{ direction: "column", y: "flex-start" }}
        width100
        gapArray={[3]}
      >
        <Heading
          font="Outfit"
          level="4"
          as="h3"
          color="black"
          weight={500}
          textAlign="left"
          upperCase={false}
        >
          {title}
        </Heading>

        <PortableTextContent
          level="regular"
          value={desc}
          className={styles.desc}
          differentColorForStrongText={false}
        />
      </FlexDiv>
    </FancyDivWrapper>
  );
};

export interface QuestionsBlockProps {
  fancyTitle: FancyTitleProps;
  questions: IQuestion[];
}

export const QuestionsBlock: React.FC<QuestionsBlockProps> = ({
  fancyTitle,
  questions,
}) => {
  return (
    <Block theme="light">
      <FlexDiv
        gapArray={[5, 6, 6, 7]}
        flex={{ direction: "column", x: "center", y: "center" }}
        width100
      >
        <AnimatedWrapper from="left">
          <FancyText
            font="Outfit"
            level="2"
            as="h2"
            color="black"
            textAlign="center"
            weight={300}
            paddingBottomArray={[0, 2, 2, 3]}
            value={fancyTitle.title as FancyText}
          />
        </AnimatedWrapper>
        <FlexDiv
          gapArray={[5, 6, 6, 7]}
          flex={{ y: "flex-start" }}
          width100
          className={cn(styles.questions)}
          as="ul"
        >
          {questions?.map((question: IQuestion, key) => {
            return (
              <AnimatedWrapper from="inside" key={key} as="li">
                <Question {...question} />
              </AnimatedWrapper>
            );
          })}
        </FlexDiv>
      </FlexDiv>
    </Block>
  );
};
