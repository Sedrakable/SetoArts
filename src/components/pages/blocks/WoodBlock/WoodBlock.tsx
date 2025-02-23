"use client";
import React from "react";
import styles from "./WoodBlock.module.scss";
import { getTranslations } from "../../../../helpers/langUtils";
import stroke from "/public/photos/BigStroke.webp";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import { Block } from "../../containers/Block";
import { FancyText } from "@/components/reuse/FancyText";

export interface WoodBlockProps {
  fancyText: any;
}

export const WoodBlock: React.FC<WoodBlockProps> = ({ fancyText }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <Block variant="wood">
      <FancyText value={fancyText} as="h2" level="4" />
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
