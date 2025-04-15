"use client";
import React from "react";
import styles from "./Features.module.scss";
import cn from "classnames";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import { IFeature } from "@/data.d";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";
import { useSvgComponent } from "@/helpers/useSvgComponent";
import GridDiv from "@/components/reuse/GridDiv";

const Feature: React.FC<IFeature> = ({ title, customImage, svgName, desc }) => {
  const SvgComponent = useSvgComponent(svgName || "Bulb");

  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start" }}
      width100
      className={cn(styles.container)}
      as="li"
      gapArray={[3, 4, 4, 5]}
    >
      <div className={styles.imgWrapper}>
        {customImage ? (
          <SanityImage {...customImage} />
        ) : SvgComponent ? (
          <SvgComponent />
        ) : (
          <div>Loading...</div> // You could replace this with a spinner or placeholder
        )}
      </div>
      <FlexDiv
        flex={{ direction: "column", y: "flex-start" }}
        width100
        className={styles.content}
        gapArray={[2]}
      >
        <Paragraph
          level="big"
          color="black"
          textAlign="center"
          weight={600}
          className={styles.title}
        >
          {title}
        </Paragraph>
        <Paragraph level="small" color="black" textAlign="center">
          {desc}
        </Paragraph>
      </FlexDiv>
    </FlexDiv>
  );
};

export interface FeaturesProps {
  features: IFeature[];
}

export const Features: React.FC<FeaturesProps> = ({ features }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <Block
      title={{
        children: translations.blockTitles.whatYouGet,
        font: "Outfit",
        color: "black",
        weight: 900,
      }}
      theme="light"
      className={styles.block}
    >
      <GridDiv
        gapArray={[7, 8, 8, 8]}
        columns={[
          [1, 1],
          [2, 3],
          [3, 4],
          [4, 5],
        ]}
        width100
        as="ul"
      >
        {features?.map((feature: IFeature, key) => {
          return <Feature {...feature} key={key} />;
        })}
      </GridDiv>
    </Block>
  );
};
