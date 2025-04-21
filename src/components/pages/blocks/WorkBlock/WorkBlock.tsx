"use client";
import React, { useState, useEffect } from "react";
import styles from "./WorkBlock.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading, HeadingLevelType } from "../../../reuse/Text/Heading/Heading";
import { Block } from "../../containers/Block";
import { SanityImage, SizesType } from "../../../reuse/SanityImage/SanityImage";
import { useScrollToTarget } from "@/helpers/useScrollToTarget";
import {
  ITheme,
  IWork,
  IWorkBlock,
  LocalPaths,
  LocalTargets,
} from "../../../../data.d";
import Link from "next/link";
import GridDiv from "@/components/reuse/GridDiv";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";
// import { ImageSlider } from "@/components/reuse/ImageSlider";

// Define image widths for each column count at each breakpoint
const imageWidthsByColumns: Record<number, SizesType> = {
  1: ["100%", "100%", "100%", "100vw"], // Full-width
  2: ["50%", "50%", "50%", "50%"],
  3: ["35%", "35%", "35%", "35%"],
  4: ["27.5%", "27.5%", "27.5%", "27.5%"],
  5: ["20%", "20%", "20%", "20%"],
};

const headingLevelByColumns: Record<number, HeadingLevelType> = {
  1: "2", // Full-width
  2: "3",
  3: "4",
  4: "4",
  5: "5",
};

const Work: React.FC<IWork & { columnCount: number }> = ({
  title,
  descEN,
  descFR,
  thumbnailImage,
  link,
  images,
  workType,
  columnCount,
  slug,
}) => {
  const locale = useLocale() as LangType;

  const inferAction = (): "link" | "modal" | "none" => {
    switch (workType) {
      case "wood":
        return "modal";
      case "branding":
      case "website":
      case "cards":
        return "link";
      case "gallery":
        return "none";
      default:
        return "none";
    }
  };

  const action = inferAction();
  console.log(title, columnCount, imageWidthsByColumns[columnCount]);
  const content = (
    <FlexDiv
      width100
      gapArray={[4, 4, 4, 5]}
      flex={{ x: "flex-start", direction: "column" }}
    >
      <FlexDiv width100 className={styles.card}>
        <SanityImage
          {...thumbnailImage}
          quality={100}
          sizes={imageWidthsByColumns[columnCount]}
          figureclassname={styles.image} // Note: Kept your prop name as-is
        />
        {title && (
          <Heading
            font="Outfit"
            level={headingLevelByColumns[columnCount]}
            as="h3"
            color="white"
            textAlign="start"
            className={styles.title}
            weight={700}
          >
            {title}
          </Heading>
        )}
      </FlexDiv>

      <Paragraph level="regular" color="black" className={styles.desc}>
        {locale === "fr" ? descFR : descEN}
      </Paragraph>
    </FlexDiv>
  );

  if (action === "link" && link) {
    return (
      <Link
        href={link}
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
      >
        {content}
      </Link>
    );
  } else if (action === "modal" && locale && slug && images) {
    return (
      <Link
        href={`/${locale}${LocalPaths.ABOUT}/${slug.current}`}
        className={styles.link}
        aria-label={title}
      >
        {content}
      </Link>
    );
  }
  return content;
};

interface WorkBlockProps extends IWorkBlock {
  theme: ITheme;
}
export const WorkBlock: React.FC<WorkBlockProps> = ({
  works,
  title,
  id,
  theme,
}) => {
  const [columnCount, setColumnCount] = useState(1);
  const { scrollToTarget } = useScrollToTarget();

  useEffect(() => {
    if (window.location.hash === `#${id}`) {
      scrollToTarget(id as LocalTargets);
    }
  }, [id, scrollToTarget]);

  return (
    <Block
      title={{ font: "Outfit", children: title, color: "black", weight: 900 }}
      theme={theme}
      id={id}
    >
      <AnimatedWrapper from={theme === "light" ? "right" : "left"}>
        <GridDiv
          gapArray={[4, 4, 5, 5]}
          rowGapArray={[6, 6, 5, 5]}
          columns={[
            [1, 1],
            [1, 2],
            [3, 3],
            [3, 3],
          ]}
          className={cn(styles.workBlock, styles[theme])}
          width100
          fill
          as="nav"
          onColumnCountChange={(count) => setColumnCount(count)} // Capture column count
        >
          {works.map((work, key) => (
            <Work {...work} columnCount={columnCount} key={key} />
          ))}
        </GridDiv>
      </AnimatedWrapper>
    </Block>
  );
};
