"use client";
import React from "react";
import styles from "./Features.module.scss";
import cn from "classnames";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import { IFeature, ITheme } from "@/data.d";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";
import { useSvgComponent } from "@/helpers/useSvgComponent";
import { useWindowResize } from "@/helpers/useWindowResize";
import { getOptimalColumnCount } from "@/helpers/getOptimalColumnCount";

interface FeatureProps extends IFeature {
  className?: string;
}
const Feature: React.FC<FeatureProps> = ({
  title,
  customImage,
  svgName,
  desc,
  className,
}) => {
  const SvgComponent = useSvgComponent(svgName || "Bulb");

  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start" }}
      width100
      className={cn(styles.container, className)}
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
        <Heading
          font="Outfit"
          level="5"
          as="h3"
          color="black"
          weight={700}
          textAlign="center"
        >
          {title}
        </Heading>
        <Paragraph level="small" color="black" textAlign="center">
          {desc}
        </Paragraph>
      </FlexDiv>
    </FlexDiv>
  );
};

export interface FeaturesProps {
  theme: ITheme;
  features: IFeature[];
}

export const Features: React.FC<FeaturesProps> = ({
  features,
  theme = "dark",
}) => {
  const { isMobile, isTablet, isLaptop } = useWindowResize();
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  const getColumnRange = () => {
    if (isMobile) {
      return { min: 1, max: 1 };
    } else if (isTablet) {
      return { min: 2, max: 3 };
    } else if (isLaptop) {
      // Assuming laptop breakpoint at 1280px
      return { min: 3, max: 4 };
    } else {
      return { min: 4, max: 5 }; // Desktop
    }
  };
  const { min, max } = getColumnRange();
  const columnCount = getOptimalColumnCount(features.length, min, max); // returns 4
  const remainder = features.length % columnCount;

  const firstOfLastRowIndex = features.length - remainder;
  return (
    <Block
      title={{
        children: translations.blockTitles.whatYouGet,
        font: "Outfit",
        color: "black",
        weight: 900,
      }}
      theme={theme}
      className={styles.block}
    >
      <FlexDiv
        customStyle={{
          ["--columns" as any]: columnCount,
        }}
        gapArray={[7, 8, 8, 8]}
        flex={{ y: "flex-start" }}
        width100
        className={cn(styles.features, styles[theme])}
        as="ul"
      >
        {features?.map((feature: IFeature, key) => {
          const isFirstOfLastRow = key === firstOfLastRowIndex;
          return (
            <Feature
              {...feature}
              key={key}
              className={cn({ [styles.lastRowItem]: isFirstOfLastRow })}
            />
          );
        })}
      </FlexDiv>
    </Block>
  );
};
