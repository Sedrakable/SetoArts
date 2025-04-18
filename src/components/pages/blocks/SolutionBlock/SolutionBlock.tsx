"use client";
import React from "react";
import Image from "next/image";

import styles from "./SolutionBlock.module.scss";
import { getTranslations } from "../../../../helpers/langUtils";
import bigStroke from "/public/photos/BigStroke.webp";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import { Block } from "../../containers/Block";
import { FancyText } from "@/components/reuse/Text/FancyText/FancyText";
import { Icon } from "@/components/reuse/Icon/Icon";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { useWindowResize } from "@/helpers/useWindowResize";
import { ITheme } from "@/data.d";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";

export interface SolutionBlockProps {
  fancyText: any;
  theme: ITheme;
}

export const SolutionBlock: React.FC<SolutionBlockProps> = ({
  fancyText,
  theme,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const { isMobileOrTablet } = useWindowResize();

  return (
    <Block theme={theme} className={styles.block}>
      <AnimatedWrapper from="inside">
        <FlexDiv
          flex={{ direction: "column", x: "center" }}
          gapArray={[4]}
          width100
          padding={{ bottom: [4, 6, 6, 8] }}
        >
          <FancyText value={fancyText} as="h3" level="3" textAlign="center" />
          <Icon icon={"arrow"} size="big" rotate={90} />
        </FlexDiv>
      </AnimatedWrapper>
      <FlexDiv
        flex={{ direction: "column", x: "stretch" }}
        width100
        className={styles.headings}
      >
        <AnimatedWrapper from="left">
          <Heading
            font="Outfit"
            as="h2"
            level={isMobileOrTablet ? "2" : "1"}
            color="white"
            textAlign="left"
            weight={900}
            className={styles.heading}
          >
            {translations.titles.realTitle1}
          </Heading>
        </AnimatedWrapper>
        <AnimatedWrapper from="right">
          <Heading
            font="Cursive"
            as="h2"
            level={isMobileOrTablet ? "2" : "1"}
            color="black"
            textAlign="right"
            weight={400}
            className={styles.heading}
          >
            {translations.titles.realTitle2}
          </Heading>
        </AnimatedWrapper>
      </FlexDiv>
      <Image
        src={bigStroke.src}
        alt="stroke"
        width={2400}
        height={200}
        className={styles.stroke}
      />
    </Block>
  );
};
