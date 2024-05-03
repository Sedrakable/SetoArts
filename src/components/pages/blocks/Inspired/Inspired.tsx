"use client";
import React from "react";
import styles from "./Inspired.module.scss";
import { Heading } from "../../../reuse/Heading";
import FlexDiv from "../../../reuse/FlexDiv";
import { LocalPaths } from "../../../../data.d";
import { Button } from "../../../reuse/Button";
import { getTranslations } from "../../../../helpers/langUtils";
import stroke from "/public/photos/BigStroke.png";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import Image from "next/image";

export const Inspired: React.FC = () => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <FlexDiv
      className={styles.block}
      padding={{ vertical: [6, 7, 7, 8] }}
      width100
      as="section"
    >
      <FlexDiv
        className={styles.wrapper}
        flex={{ direction: "column" }}
        gapArray={[4, 5, 5, 5]}
      >
        <Image src={stroke.src} alt="stroke" fill />
        <FlexDiv className={styles.title}>
          <Heading font="Seto" as="h1" level="1">
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
      </FlexDiv>
    </FlexDiv>
  );
};
