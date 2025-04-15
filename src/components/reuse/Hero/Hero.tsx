"use client";
import React, { ReactNode } from "react";
import styles from "./Hero.module.scss";
import cn from "classnames";
import Image from "next/image";

import { Paragraph } from "../Paragraph/Paragraph";
import { IHero, IHeroV2, ITheme, LocalPaths } from "../../../data.d";
import FlexDiv from "../FlexDiv";
import Logo from "@/assets/vector/LogoBig.svg";
import bigStroke from "/public/photos/test.png";
import { FancyText } from "../FancyText";
import { Button } from "../Button/Button";
import { Quote } from "../Quote";
import { SanityImage } from "../SanityImage/SanityImage";
import { useWindowResize } from "../../../helpers/useWindowResize";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import LogoHori from "@/assets/vector/LogoHorizontal.svg";
import { Heading } from "../Heading";

import GlowingSign from "@/assets/vector/GlowingSignGraphic.svg";
import DigitalDesign from "@/assets/vector/DigitalDesignGraphic.svg";
import { getTranslations } from "@/helpers/langUtils";
import { PortableTextContent } from "../Paragraph/PortableTextContent";

const graphic: Record<ITheme, ReactNode> = {
  light: <GlowingSign className={styles.graphic} />,
  dark: <DigitalDesign className={styles.graphic} />,
  wood: <GlowingSign className={styles.graphic} />,
};
export const Hero: React.FC<IHero> = ({
  backgroundImage,
  foregroundImage,
  subTitle,
  cta,
  message,
  theme = "light",
}) => {
  const { isMobile, isMobileOrTablet } = useWindowResize();
  return (
    <FlexDiv
      className={cn(styles.hero, styles[theme])}
      flex={{ direction: "column-reverse", x: "flex-start", y: "flex-start" }}
      as={"header"}
      width100
    >
      {/* Background Image Wrapper */}
      <div className={styles.backgroundContainer}>
        <SanityImage
          className={styles.backgroundImage}
          {...backgroundImage}
          loading="eager"
          fetchPriority="high"
          rel="preload"
          width={1100}
          quality={90}
        />
        {message && (
          <Heading
            font="Cursive"
            level="5"
            as="h4"
            color={theme === "light" ? "white" : "black"}
            className={styles.message}
            textAlign="center"
            upperCase={false}
          >
            {message}
          </Heading>
        )}
        <SanityImage
          className={styles.foregroundImage}
          {...foregroundImage}
          loading="eager"
          fetchPriority="high"
          rel="preload"
          width={1100}
          quality={90}
          // sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, (max-width: 1680px) 66vw"
        />
      </div>
      <FlexDiv
        padding={{
          left: [6, 7, 8, 10],
          right: [6, 0],

          top: [8, 10, 11, 12],
        }}
        gapArray={[5, 4, 6, 7]}
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        customStyle={{ zIndex: 3 }}
        width100
      >
        {isMobile ? (
          <Logo className={styles.logo} />
        ) : (
          <LogoHori className={styles.logo} />
        )}
        <FlexDiv
          padding={{ left: [0, 5, 6, 8] }}
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
          gapArray={[3, 3, 3, 4]}
          className={styles.titles}
        >
          {subTitle && (
            <Paragraph
              level={isMobileOrTablet ? "regular" : "big"}
              color={theme === "light" ? "black" : "white"}
              textAlign={isMobile ? "center" : "left"}
            >
              {subTitle}
            </Paragraph>
          )}
          {cta && (
            <Button
              variant={isMobile ? "primary" : "fancy"}
              path={cta.path}
              scrollTarget={cta.scrollTarget}
            >
              {cta.text}
            </Button>
          )}
        </FlexDiv>
      </FlexDiv>

      <Image
        src={bigStroke.src}
        alt="stroke"
        width={2400}
        height={200}
        className={styles.stroke}
      />
      {!isMobileOrTablet && graphic[theme]}
    </FlexDiv>
  );
};

export const HeroV2: React.FC<IHeroV2> = ({
  backgroundImage,
  title,
  subTitle,
  desc,
  cta1,
  cta2,
  quote,
}) => {
  const { isMobile, isMobileOrTablet } = useWindowResize();
  const trans = getTranslations(useLocale() as LangType);
  return (
    <FlexDiv
      className={cn(styles.heroV2)}
      flex={{ direction: "column-reverse", x: "flex-start", y: "flex-start" }}
      as={"header"}
      width100
    >
      {/* Background Image Wrapper */}
      <div className={styles.backgroundContainer}>
        <SanityImage
          className={styles.backgroundImage}
          {...backgroundImage}
          loading="eager"
          fetchPriority="high"
          rel="preload"
          width={1100}
          quality={90}
        />
        {/* {message && (
          <Heading
            font="Cursive"
            level="5"
            as="h4"
            color={theme === "light" ? "white" : "black"}
            className={styles.message}
            textAlign="center"
            upperCase={false}
          >
            {message}
          </Heading>
        )} */}
      </div>
      <FlexDiv
        padding={{
          left: [6, 7, 8, 10],
          right: [6, 0],
          bottom: [7, 11, 11, 12],
          top: [9, 9, 9, 11],
        }}
        gapArray={[5, 4, 6, 7]}
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        className={styles.content}
        width100
      >
        <FlexDiv
          padding={{ left: [0, 5, 6, 8] }}
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
          className={styles.titles}
        >
          <Heading
            as="h1"
            level="1"
            weight={900}
            font="Cursive"
            color="yellow"
            textAlign={isMobile ? "center" : "left"}
            paddingBottomArray={[2, 0]}
          >
            {title}
          </Heading>

          {subTitle && (
            <Heading
              as="h3"
              level="4"
              weight={900}
              font="Outfit"
              color="black"
              textAlign={isMobile ? "center" : "left"}
              paddingBottomArray={[2, 2, 2, 2]}
              className={styles.subTitle}
            >
              {subTitle}
            </Heading>
          )}
          {desc && (
            <PortableTextContent
              value={desc}
              color="black"
              level="regular"
              className={styles.desc}
              textAlign={isMobile ? "center" : "left"}
              paddingBottomArray={[5, 4, 4, 5]}
            />
          )}
          {cta1 && (
            <FlexDiv
              gapArray={[2, 3, 3, 4]}
              flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
              className={styles.ctas}
              width100
            >
              <Button
                variant={isMobile ? "primary" : "fancy"}
                path={cta1.path}
                scrollTarget={cta1.scrollTarget}
              >
                {cta1.text}
              </Button>
              {cta2 && (
                <Button
                  variant="white"
                  path={cta2.path}
                  scrollTarget={cta2.scrollTarget}
                >
                  {cta2.text}
                </Button>
              )}
            </FlexDiv>
          )}
        </FlexDiv>
      </FlexDiv>

      <Image
        src={bigStroke.src}
        alt="stroke"
        width={2400}
        height={200}
        className={styles.stroke}
      />
    </FlexDiv>
  );
};
