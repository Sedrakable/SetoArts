"use client";
import React from "react";
import Image from "next/image";

import styles from "./WoodBlock.module.scss";
import { getTranslations } from "../../../../helpers/langUtils";
import bigStroke from "/public/photos/test.png";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import { Block } from "../../containers/Block";
import { FancyText } from "@/components/reuse/FancyText";
import { Icon } from "@/components/reuse/Icon";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";

export interface WoodBlockProps {
  fancyText: any;
}

export const WoodBlock: React.FC<WoodBlockProps> = ({ fancyText }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <Block variant="wood">
      <FlexDiv
        flex={{ direction: "column", x: "center" }}
        gapArray={[4]}
        width100
        padding={{ bottom: [4,6,6, 8] }}
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
          level="1"
          color="white"
          textAlign="left"
          weight={900}
        >
          {translations.blockTitles.realTitle1}
        </Heading>
        <Heading
          font="Cursive"
          as="h2"
          level="1"
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
      {/* <FlexDiv
        className={styles.wrapper}
        flex={{ direction: "column" }}
        gapArray={[4, 5, 5, 5]}
      >
        <Image src={stroke.src} alt="stroke" width={800} height={200} />
        <FlexDiv className={styles.title}>
          <Heading font="Seto" as="h2" level="2">
            {translations.blockTitles.inspired}
          </Heading>
          <Heading
            font="Cursive"
            as="h1"
            level="1"
            color="yellow"
            className={styles.question}
          >
            ?
          </Heading>
        </FlexDiv>
        <Button variant="fancy" path={`/${locale}${LocalPaths.CONTACT}`}>
          {translations.buttons.workWithMe}
        </Button>
      </FlexDiv> */}
    </Block>
  );
};
