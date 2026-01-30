// WorkBlock.tsx
"use client";
import React from "react";
import styles from "./WorkBlock.module.scss";
import cn from "classnames";
import { useRouter, usePathname } from "next/navigation";

import FlexDiv from "../../../reuse/FlexDiv";
import GridDiv from "@/components/reuse/GridDiv";
import { Block } from "../../containers/Block";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";

import { Heading } from "../../../reuse/Text/Heading/Heading";
import { SanityImage, SizesType } from "../../../reuse/SanityImage/SanityImage";

import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import { FancyTitleProps } from "@/components/reuse/FancyTitle/FancyTitle";
import { ITheme, IWork, LocalTargets } from "../../../../data.d";

const CARD_SIZES: SizesType = ["90vw", "50vw", "33vw", "33vw"];

const WorkCard: React.FC<{ work: IWork; onOpen: (w: IWork) => void }> = ({
  work,
  onOpen,
}) => {
  return (
    <button
      type="button"
      className={styles.cardButton}
      onClick={() => onOpen(work)}
      aria-label={work.title || "Open work"}
    >
      <FlexDiv width100 className={styles.card} flex={{ direction: "column" }}>
        <SanityImage
          {...work.thumbnailImage}
          quality={100}
          sizes={CARD_SIZES}
          figureclassname={styles.cardImage}
        />

        {work.title && (
          <Heading
            font="Outfit"
            level="4"
            as="h3"
            color="white"
            weight={500}
            className={styles.title}
          >
            {work.title}
          </Heading>
        )}
      </FlexDiv>
    </button>
  );
};

export interface WorkBlockProps {
  title: FancyTitleProps;
  titleFR?: FancyTitleProps;
  works: IWork[];
  id: LocalTargets;
  theme: ITheme;
}

export const WorkBlock: React.FC<WorkBlockProps> = ({
  works,
  title,
  titleFR,
  id,
  theme,
}) => {
  const locale = useLocale() as LangType;
  const router = useRouter();
  const pathname = usePathname();

  const handleOpenWork = (work: IWork) => {
    if (work.slug?.current) {
      router.push(`${pathname}/${work.slug.current}`);
    }
  };

  return (
    <Block fancyTitle={locale === "en" ? title : titleFR} theme={theme} id={id}>
      <GridDiv
        gapArray={[2, 2, 3, 3]}
        rowGapArray={[2, 2, 3, 3]}
        columns={[
          [1, 1],
          [1, 2],
          [3, 3],
          [3, 3],
        ]}
        className={cn(styles.workBlock)}
        width100
        // fill
      >
        {works.map((work, key) => (
          <AnimatedWrapper from="left" key={key}>
            <WorkCard work={work} onOpen={handleOpenWork} />
          </AnimatedWrapper>
        ))}
      </GridDiv>
    </Block>
  );
};
