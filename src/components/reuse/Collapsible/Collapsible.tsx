"use client";
import React, { useState } from "react";
import styles from "./Collapsible.module.scss";

import FlexDiv from "../../reuse/FlexDiv";
import cn from "classnames";
import { Heading } from "../../reuse/Heading";
import { Paragraph } from "../Paragraph/Paragraph";
import { PortableTextContent } from "../Paragraph/PortableTextContent";
import { ICollapsible } from "@/data.d";
import { Block } from "@/components/pages/containers/Block";

export const Collapsible: React.FC<ICollapsible> = ({ title, questions }) => {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const toggleQuestion = (index: number) => {
    setOpenQuestions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  return (
    <Block variant="light" contentSize="small">
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
            <FlexDiv
              key={index}
              width100
              flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
              className={styles.question}
              padding={{ horizontal: [4], vertical: [4] }}
            >
              <button
                className={styles.questionToggle}
                onClick={() => toggleQuestion(index)}
              >
                <Paragraph
                  level="big"
                  color="black"
                  textAlign="left"
                  weight={openQuestions.includes(index) ? 600 : 400}
                >
                  {q.question}
                </Paragraph>

                <Heading
                  font="Cursive"
                  level={openQuestions.includes(index) ? "4" : "5"}
                  as="span"
                  color={openQuestions.includes(index) ? "black" : "yellow"}
                  weight={700}
                  className={cn(
                    styles.toggleIcon,
                    openQuestions.includes(index) ? styles.minus : styles.plus
                  )}
                >
                  {openQuestions.includes(index) ? "-" : "+"}
                </Heading>
              </button>
              {openQuestions.includes(index) && (
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
          ))}
        </FlexDiv>
      </FlexDiv>
    </Block>
  );
};
