"use client";
import React from "react";
import Image from "next/image";

import styles from "./SolutionBlock.module.scss";
import { getTranslations } from "../../../../helpers/langUtils";
import bigStroke from "/public/photos/test.png";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import { Block } from "../../containers/Block";
import { FancyText } from "@/components/reuse/FancyText";
import { Icon } from "@/components/reuse/Icon";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { useWindowResize } from "@/helpers/useWindowResize";
import { ITheme } from "@/data.d";

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
      <FlexDiv
        flex={{ direction: "column", x: "center" }}
        gapArray={[4]}
        width100
        padding={{ bottom: [4, 6, 6, 8] }}
      >
        <FancyText value={fancyText} as="h3" level="3" textAlign="center" />
        <Icon icon={"arrow"} size="big" rotate={90} />
      </FlexDiv>
      <FlexDiv
        flex={{ direction: "column", x: "stretch" }}
        width100
        className={styles.headings}
      >
        <Heading
          font="Outfit"
          as="h2"
          level={isMobileOrTablet ? "2" : "1"}
          color="white"
          textAlign="left"
          weight={900}
        >
          {translations.blockTitles.realTitle1}
        </Heading>
        <Heading
          font="Cursive"
          as="h2"
          level={isMobileOrTablet ? "2" : "1"}
          color="black"
          textAlign="right"
          weight={400}
        >
          {translations.blockTitles.realTitle2}
        </Heading>
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
