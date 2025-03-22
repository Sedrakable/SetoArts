"use client";
import React, { Suspense, useEffect, useState } from "react";
import styles from "./Features.module.scss";
import cn from "classnames";
import { BlockVariantType, Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import { IFeature } from "@/data.d";
import { useWindowResize } from "@/helpers/useWindowResize";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";

const Feature: React.FC<IFeature> = ({ title, customImage, svgName, desc }) => {
  const { isMobile } = useWindowResize();
  const [SvgComponent, setSvgComponent] = useState<React.FC | null>(null);
  const fallbackSvg = "Bulb";
  if (svgName) {
    import(`@/assets/vector/${svgName}.svg`)
      .then((module) => setSvgComponent(() => module.default))
      .catch(() => {
        console.error(
          `SVG '${svgName}' not found in /assets/vector/. Falling back to 'bulb'.`
        );
        import(`@/assets/vector/${fallbackSvg}.svg`)
          .then((fallbackModule) =>
            setSvgComponent(() => fallbackModule.default)
          )
          .catch(() =>
            console.error(`Fallback SVG 'bulb' also failed to load.`)
          );
      });
  }

  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start" }}
      width100
      className={styles.container}
      as="li"
      gapArray={[3, 4, 4, 5]}
    >
      <div className={styles.imgWrapper}>
        {customImage ? (
          <SanityImage {...customImage} />
        ) : SvgComponent ? (
          <Suspense fallback={<div>Loading...</div>}>
            <SvgComponent />
          </Suspense>
        ) : null}
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

        <Paragraph level="regular" color="black" textAlign="center">
          {desc}
        </Paragraph>
      </FlexDiv>
    </FlexDiv>
  );
};

export interface FeaturesProps {
  variant: BlockVariantType;
  features: IFeature[];
}

export const Features: React.FC<FeaturesProps> = ({
  features,
  variant = "dark",
}) => {
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
      variant={variant}
    >
      <FlexDiv
        gapArray={[8, 8, 8, 9]}
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
