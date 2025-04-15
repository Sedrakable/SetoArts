"use client";

import React from "react";
import { useLocale } from "next-intl";
import styles from "./WorkModalContent.module.scss";

import { getTranslations } from "@/helpers/langUtils";
import { ThumbCarousel } from "@/components/reuse/Carousel/ThumbCarousel";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import {
  ParagraphProps,
  Paragraph,
} from "@/components/reuse/Paragraph/Paragraph";
import { IWork } from "@/data.d";
import { LangType } from "@/i18n";

export const WorkModalContent: React.FC<IWork> = (props) => {
  const { images, title, desc, slug, thumbnailImage } = props;
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

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
          {desc}
        </Paragraph>
      </FlexDiv>

      {images && <ThumbCarousel images={images} />}
    </FlexDiv>
  );
};
