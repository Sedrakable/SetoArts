"use client";
import React, { ReactNode, useRef } from "react";
import styles from "./Hero.module.scss";
import cn from "classnames";
import Image from "next/image";

import { Paragraph } from "../../../reuse/Text/Paragraph/Paragraph";
import { IHero, IHeroV2, ITheme } from "../../../../data.d";
import FlexDiv from "../../../reuse/FlexDiv";
import Logo from "@/assets/vector/LogoBig.svg";
import bigStroke from "/public/photos/BigStroke.webp";
import { Button } from "../../../reuse/Button/Button";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { useWindowResize } from "../../../../helpers/useWindowResize";
import LogoHori from "@/assets/vector/LogoHorizontal.svg";
import { Heading } from "../../../reuse/Text/Heading/Heading";

import GlowingSign from "@/assets/vector/GlowingSignGraphic.svg";
import DigitalDesign from "@/assets/vector/DigitalDesignGraphic.svg";
import { PortableTextContent } from "../../../reuse/Text/Paragraph/PortableTextContent";
import { useParallaxScroll } from "@/helpers/useParallaxScroll";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";

const graphic: Record<ITheme, ReactNode> = {
  light: <GlowingSign className={styles.graphic} />,
  dark: <DigitalDesign className={styles.graphic} />,
  wood: <GlowingSign className={styles.graphic} />,
  yellow: "",
};
export const Hero: React.FC<IHero> = ({
  backgroundImage,
  foregroundImage,
  subTitle,
  cta1,
  cta2,
  message,
  theme = "light",
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const { isMobile, isMobileOrTablet } = useWindowResize();
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useParallaxScroll(heroRef);

  return (
    <FlexDiv
      className={cn(styles.hero, styles[theme])}
      flex={{ direction: "column-reverse", x: "flex-start", y: "flex-start" }}
      as={"header"}
      width100
      ref={heroRef}
      customStyle={
        {
          "--scroll-progress": scrollProgress,
        } as React.CSSProperties
      }
    >
      <div className={styles.backgroundContainer}>
        <SanityImage
          figureclassname={styles.backgroundImage}
          {...backgroundImage}
          priority={true}
          quality={90}
          sizes={["50vw", "30vw", "30vw", "30vw"]}
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
          figureclassname={styles.foregroundImage}
          {...foregroundImage}
          priority={true}
          sizes={["70vw", "60vw", "60vw", "70vw"]}
        />
      </div>
      <FlexDiv
        padding={{
          left: [6, 7, 8, 10],
          right: [6, 0],
        }}
        gapArray={[5, 4, 6, 7]}
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        customStyle={{ zIndex: 3 }}
        width100
        className={styles.content}
      >
        {isMobile ? (
          <Logo className={styles.logo} />
        ) : (
          <LogoHori className={styles.logo} />
        )}
        <FlexDiv
          padding={{ left: [0, 5, 6, 8] }}
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
          // gapArray={[3, 3, 3, 0]}
          className={styles.titles}
          width100
        >
          <Heading
            font="Outfit"
            level={isMobileOrTablet ? "5" : "3"}
            as="h4"
            color={theme === "light" ? "black" : "white"}
            className={styles.quote}
            textAlign={isMobile ? "center" : "left"}
            weight={700}
            paddingBottomArray={[3, 2, 1, 1]}
          >
            {translations.titles.quote}
          </Heading>
          {subTitle && (
            <Paragraph
              level="regular"
              color={theme === "light" ? "black" : "white"}
              textAlign={isMobile ? "center" : "left"}
              weight={400}
              className={styles.subTitle}
              paddingBottomArray={[4, 4, 4, 5]}
            >
              {subTitle}
            </Paragraph>
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
  cta2, //TO DO ADD Quote
}) => {
  const { isMobile } = useWindowResize();

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
          figureclassname={styles.backgroundImage}
          {...backgroundImage}
          priority={true}
          sizes={["90vw", "60vw", "45vw", "60vw"]}
        />
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
          <AnimatedWrapper from="left">
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
          </AnimatedWrapper>
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
