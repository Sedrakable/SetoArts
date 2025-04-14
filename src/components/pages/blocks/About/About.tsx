"use client";
import React from "react";
import styles from "./About.module.scss";
import { Block } from "../../containers/Block";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { IAbout } from "../../../../data.d";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { useWindowResize } from "../../../../helpers/useWindowResize";
import { getTranslations } from "../../../../helpers/langUtils";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import { PortableTextContent } from "@/components/reuse/Paragraph/PortableTextContent";

export const About: React.FC<IAbout> = ({
  profileImage,
  title,
  subTitle,
  desc,
}) => {
  const { isMobileOrTablet } = useWindowResize();
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <Block theme="light">
      <FlexDiv
        width100
        flex={{ x: "flex-start", y: "flex-start", direction: "column" }}
        gapArray={[6, 7, 7, 8]}
        padding={{ top: [8, 9, 9, 10] }}
        className={styles.container}
      >
        <SanityImage
          figureclassname={styles.image}
          image={profileImage?.image}
          alt={profileImage?.alt}
          loading="eager"
          fetchPriority="high"
          rel="preload"
          sizes="(max-width: 640px) 90vw, (max-width: 1200px) 70vw, (max-width: 1680px) 40vw, 40vw"
        />

        <FlexDiv
          width100
          flex={{ direction: "column", x: "flex-start" }}
          className={styles.textContainer}
        >
          <Heading
            font="Cursive"
            as="h1"
            level="2"
            color="yellow"
            weight={900}
            paddingBottomArray={[2, 3, 3, 4]}
          >
            {title}
          </Heading>
          <Heading
            font="Outfit"
            as="h2"
            level="5"
            color="black"
            // upperCase={false}
            weight={800}
            paddingBottomArray={[2, 3, 3, 4]}
          >
            {subTitle}
          </Heading>
          <PortableTextContent value={desc} level="regular" />
        </FlexDiv>
      </FlexDiv>
    </Block>
  );
};
