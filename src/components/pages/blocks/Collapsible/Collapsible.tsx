"use client";
import React, { useState } from "react";
import styles from "./Collapsible.module.scss";

import FlexDiv from "../../../reuse/FlexDiv";
import cn from "classnames";
import { Heading } from "../../../reuse/Text/Heading/Heading";
import { Paragraph } from "../../../reuse/Text/Paragraph/Paragraph";
import { PortableTextContent } from "../../../reuse/Text/Paragraph/PortableTextContent";
import { ICollapsible } from "@/data.d";
import { Block } from "@/components/pages/containers/Block";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";
import { FancyDivWrapper } from "../../containers/FancyDivWrapper/FancyDivWrapper";

export const Collapsible: React.FC<ICollapsible> = ({
  title,
  questions,
  id,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };
  const content = (index: number, q: any) => (
    <FlexDiv
      width100
      flex={{
        direction: "column",
        x: "flex-start",
        y: "flex-start",
      }}
      className={styles.question}
      padding={
        openIndex === index ? {} : { horizontal: [4], vertical: [4, 4, 4, 5] }
      }
    >
      <button
        className={styles.questionToggle}
        onClick={() => toggleQuestion(index)}
      >
        <Paragraph level="regular" color="dark-grey" textAlign="left">
          {q.question}
        </Paragraph>

        <Heading
          font="Cursive"
          level={openIndex === index ? "3" : "4"}
          as="span"
          color={openIndex === index ? "dark-grey" : "yellow"}
          weight={700}
          className={cn(
            styles.toggleIcon,
            openIndex === index ? styles.minus : styles.plus,
          )}
        >
          {openIndex === index ? "-" : "+"}
        </Heading>
      </button>
      {openIndex === index && (
        <FlexDiv
          className={styles.answer}
          padding={{ top: [3], left: [4], right: [8] }}
        >
          <PortableTextContent
            level="regular"
            value={q.answer}
            color="black"
            weight={400}
          />
        </FlexDiv>
      )}
    </FlexDiv>
  );
  return (
    <Block theme="off-white" contentSize="small" id={id}>
      <FlexDiv
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        width100
        gapArray={[4]}
      >
        {title && (
          <Heading font="Outfit" level="3" as="h3" color="black" weight={700}>
            {title}
          </Heading>
        )}
        <FlexDiv
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
          width100
          gapArray={[2]}
          as={"ul"}
        >
          {questions?.map((q, index) => (
            <AnimatedWrapper
              key={index}
              from="left"
              as={"li"}
              className={styles.questionWrapper}
            >
              {openIndex === index ? (
                <FancyDivWrapper>{content(index, q)}</FancyDivWrapper>
              ) : (
                content(index, q)
              )}
            </AnimatedWrapper>
          ))}
        </FlexDiv>
      </FlexDiv>
    </Block>
  );
};
