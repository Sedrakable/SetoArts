"use client";
import React from "react";
import styles from "./Features.module.scss";
import cn from "classnames";
import { BlockVariantType, Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { Paragraph } from "@/components/reuse/Paragraph";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import { IFeature, IFeatures } from "@/data.d";
import { useWindowResize } from "@/helpers/useWindowResize";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";

const Feature: React.FC<IFeature> = ({ title, customImage, desc }) => {
  const { isMobile } = useWindowResize();
  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start" }}
      width100
      className={styles.container}
      as="li"
    >
      <div className={styles.imgWrapper}>
        <SanityImage {...customImage} />
      </div>
      <FlexDiv
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        width100
        className={styles.content}
        padding={{ all: [3, 3, 3, 4] }}
        gapArray={[1]}
      >
        {isMobile ? (
          <Paragraph level="big" color="black" weight="regular">
            {title}
          </Paragraph>
        ) : (
          <Heading font="Cursive" level="5" as="h3" color="black">
            {title}
          </Heading>
        )}
        <Paragraph level="small" color="black">
          {desc}
        </Paragraph>
      </FlexDiv>
    </FlexDiv>
  );
};

export interface FeaturesProps extends IFeatures {
  variant: BlockVariantType;
}

export const Features: React.FC<FeaturesProps> = ({
  features,
  variant = "dark",
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <Block title={translations.blockTitles.features} variant={variant} strokes>
      <FlexDiv
        gapArray={[2, 3, 3, 4]}
        flex={{ y: "flex-start" }}
        width100
        className={cn(styles.features, styles[variant])}
        as="ul"
      >
        {features?.map((feature: IFeature, key) => {
          return <Feature {...feature} key={key} />;
        })}
      </FlexDiv>
    </Block>
  );
};
