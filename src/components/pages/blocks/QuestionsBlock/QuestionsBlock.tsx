"use client";
import React from "react";
import styles from "./QuestionsBlock.module.scss";
import cn from "classnames";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";
import { FancyTitleProps } from "@/components/reuse/FancyTitle/FancyTitle";
import { FancyDivWrapper } from "../../containers/FancyDivWrapper/FancyDivWrapper";
import { Icon } from "@/components/reuse/Icon/Icon";
import { FancyText } from "@/components/reuse/Text/FancyText/FancyText";

export interface QuestionProps {
  title: string;
  desc: FancyText;
  icon: string;
}

const Question: React.FC<QuestionProps> = ({ title, desc, icon }) => {
  return (
    <FancyDivWrapper fancyCorners={false}>
      <FlexDiv
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        width100
        gapArray={[3]}
        padding={{ top: [2, 3, 3, 4] }}
      >
        {icon && (
          <Icon icon={icon} size="big" className={styles.icon} color="error" />
        )}
        <Heading
          font="Outfit"
          level="4"
          as="h3"
          color="black"
          weight={500}
          textAlign="left"
          upperCase={false}
          className={styles.title}
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
  questions: QuestionProps[];
}

export const QuestionsBlock: React.FC<QuestionsBlockProps> = ({
  fancyTitle,
  questions,
}) => {
  return (
    <Block theme="light" fancyTitle={{ title: fancyTitle.title, line: false }}>
      <FlexDiv
        gapArray={[5, 6, 6, 7]}
        flex={{ y: "flex-start" }}
        width100
        className={cn(styles.questions)}
        as="ul"
      >
        {questions?.map((question: QuestionProps, key) => {
          return (
            <AnimatedWrapper from="inside" key={key} as="li">
              <Question {...question} />
            </AnimatedWrapper>
          );
        })}
      </FlexDiv>
    </Block>
  );
};
