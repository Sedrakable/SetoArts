"use client";

import React from "react";
import styles from "./WorkModalContent.module.scss";

import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { IWork } from "@/data.d";
import { ThumbCarousel } from "../Carousel/ThumbCarousel";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";

export const WorkModalContent: React.FC<IWork> = (props) => {
  const { images, title, descEN, descFR } = props;
  const locale = useLocale() as LangType; // Replace with actual locale logic

  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
      gapArray={[3, 3, 3, 4]}
      className={styles.workModal}
      aria-label={title}
    >
      <FlexDiv
        flex={{ direction: "column", x: "center" }}
        className={styles.content}
        width100
      >
        {title && (
          <Heading
            font="Outfit"
            as="h4"
            level="3"
            color="black"
            weight={700}
            className={styles.title}
            paddingBottomArray={[2, 2, 2, 3]}
          >
            {title}
          </Heading>
        )}
        <Paragraph
          level="small" // Use the appropriate level for your design
          color="black"
          weight={400}
          paddingBottomArray={[3, 4, 4, 5]}
          className={styles.desc}
        >
          {locale === "en" ? descEN : descFR}
        </Paragraph>
      </FlexDiv>

      {images && <ThumbCarousel images={images} />}
    </FlexDiv>
  );
};
