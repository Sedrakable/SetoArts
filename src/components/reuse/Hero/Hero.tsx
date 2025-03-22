"use client";
import React from "react";
import styles from "./Hero.module.scss";
import cn from "classnames";
import Image from "next/image";

import { Paragraph } from "../Paragraph/Paragraph";
import { IHero, IHeroV2, LocalPaths } from "../../../data.d";
import FlexDiv from "../FlexDiv";
import Logo from "@/assets/vector/LogoBig.svg";
import bigStroke from "/public/photos/test.png";
import { FancyText } from "../FancyText";
import { Button } from "../Button";
import { Quote } from "../Quote";
import { SanityImage } from "../SanityImage/SanityImage";
import { useWindowResize } from "../../../helpers/useWindowResize";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import LogoHori from "@/assets/vector/LogoHorizontal.svg";
import { Heading } from "../Heading";
import GlowingSign from "@/assets/vector/GlowingSignGraphic.svg";

export type VersionType = 1 | 2;

interface HeroProps extends IHero {
  version?: VersionType;
}

export const HeroV3: React.FC<IHeroV2> = ({
  backgroundImage,
  foregroundImage,
  subTitle,
  cta,
  message,
}) => {
  const { isMobile, isMobileOrTablet } = useWindowResize();
  const locale = useLocale() as LangType;
  return (
    <FlexDiv
      className={cn(styles.heroV3)}
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
            color="white"
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
        customStyle={{ zIndex: 1 }}
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
              level="big"
              color="black"
              textAlign={isMobile ? "center" : "left"}
            >
              {subTitle}
            </Paragraph>
          )}
          {cta && (
            <Button
              variant={isMobile ? "primary" : "fancy"}
              path={`/${locale}${LocalPaths.CONTACT}`}
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
      {!isMobileOrTablet && <GlowingSign className={styles.graphic} />}
    </FlexDiv>
  );
};

export const Hero: React.FC<HeroProps> = ({
  customImage,
  desc,
  title,
  cta1,
  cta2,
  subTitle,
  quote,
  version = 1,
}) => {
  const { isMobileOrTablet } = useWindowResize();
  const locale = useLocale() as LangType;
  return (
    <header className={cn(styles.hero)}>
      {!isMobileOrTablet && (
        <div className={styles.quote}>
          <Quote {...quote} version={version} />
        </div>
      )}

      {version === 1 && (
        <FlexDiv
          className={styles.left}
          padding={{
            horizontal: [3, 8, 0],
            vertical: [0, 5, 0],
          }}
          id="hero-left"
          rel="preload"
        >
          <Logo />
        </FlexDiv>
      )}
      {isMobileOrTablet && version === 1 && (
        <div className={styles.quote}>
          <Quote {...quote} version={version} />
        </div>
      )}
      <FlexDiv className={styles.right}>
        <SanityImage
          image={customImage?.image}
          alt={customImage?.alt}
          loading="eager"
          fetchPriority="high"
          rel="preload"
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, (max-width: 1680px) 66vw"
        />
        <FlexDiv
          className={styles.container}
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
          padding={{ vertical: [6, 8, 9, 11], horizontal: [5, 7, 8, 10] }}
          gapArray={[3, 4, 4, 5]}
        >
          <FlexDiv
            flex={{ direction: "column", x: "flex-start" }}
            gapArray={[3]}
            customStyle={{ zIndex: 1 }}
            as="header"
          >
            {subTitle && <FancyText {...subTitle} mode="paragraph" />}
            {title && <FancyText mode="heading" {...title} />}
            <Paragraph
              level="small"
              weight="weak"
              className={styles.description}
            >
              {desc}
            </Paragraph>
          </FlexDiv>
          {cta1 && (
            <FlexDiv gapArray={[4]} flex={{ x: "flex-start" }} width100 wrap>
              <Button
                variant="fancy"
                id="primary"
                path={`/${locale}${LocalPaths.CONTACT}`}
              >
                {cta1.text}
              </Button>
              {cta2 && (
                <Button variant="black" id="secondary">
                  {cta2.text}
                </Button>
              )}
            </FlexDiv>
          )}
        </FlexDiv>
      </FlexDiv>
      {isMobileOrTablet && version === 2 && (
        <q className={styles.quote}>
          <Quote {...quote} version={version} />
        </q>
      )}
    </header>
  );
};
