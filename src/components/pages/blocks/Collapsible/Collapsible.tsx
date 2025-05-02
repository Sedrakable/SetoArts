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

export const Collapsible: React.FC<ICollapsible> = ({
  title,
  questions,
  id,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };
  return (
    <Block theme="light" contentSize="small" id={id}>
      <FlexDiv
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        width100
        gapArray={[4]}
      >
        {title && (
          <Heading font="Cursive" level="3" as="h3" color="yellow" weight={700}>
            {title}
          </Heading>
        )}
        <FlexDiv
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
          width100
          gapArray={[2]}
        >
          {questions?.map((q, index) => (
            <AnimatedWrapper key={index} from="left">
              <FlexDiv
                width100
                flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
                className={styles.question}
                padding={{ horizontal: [4], vertical: [5, 5, 5, 6] }}
              >
                <button
                  className={styles.questionToggle}
                  onClick={() => toggleQuestion(index)}
                >
                  <Paragraph
                    level="big"
                    color="black"
                    textAlign="left"
                    weight={openIndex === index ? 600 : 400}
                  >
                    {q.question}
                  </Paragraph>

                  <Heading
                    font="Cursive"
                    level={openIndex === index ? "4" : "5"}
                    as="span"
                    color={openIndex === index ? "black" : "yellow"}
                    weight={700}
                    className={cn(
                      styles.toggleIcon,
                      openIndex === index ? styles.minus : styles.plus
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
            </AnimatedWrapper>
          ))}
        </FlexDiv>
      </FlexDiv>
    </Block>
  );
};
