"use client";
import React from "react"; // Add useState
import styles from "./Landing.module.scss";
import cn from "classnames";
import { ILandingSide, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n/request";
import { getTranslations } from "@/helpers/langUtils";

import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading, ColorType } from "@/components/reuse/Text/Heading/Heading";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";
import { Button } from "@/components/reuse/Button/Button";

import Logo from "@/assets/vector/LogoSmall.svg";
import GlowingSign from "@/assets/vector/GlowingSignGraphic.svg";
import DigitalDesign from "@/assets/vector/DigitalDesignGraphic.svg";

import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import { useWindowResize } from "@/helpers/useWindowResize";

export interface LandingProps {
  left: ILandingSide;
  right: ILandingSide;
  locale: LangType;
}

const LandingSide: React.FC<{
  side: ILandingSide;
  isLeft?: boolean;
  color: ColorType;
  // onHover: (isHovered: boolean) => void; // Add hover callback
}> = ({ side, isLeft = false, color }) => {
  const { backgroundImage, tags, title, desc, cta } = side;
  const { isMobile, isMobileOrTablet } = useWindowResize();
  return (
    <FlexDiv
      className={cn(isLeft ? styles.left : styles.right, styles.landingSide)}
      flex={{
        y: isMobileOrTablet ? (isLeft ? "flex-end" : "flex-start") : "center",
        x: isLeft ? "flex-end" : "flex-start",
      }}
      height100
      padding={{
        [isLeft ? "right" : "left"]: [6, 8, 8, 10],
        [isLeft ? "left" : "right"]: [8, 10, 0, 0],
        bottom: [8, 8, 0, 0],
        top: [7, 8, 0, 0],
      }}
      // onMouseEnter={() => onHover(true)} // Trigger hover
      // onMouseLeave={() => onHover(false)} // Clear hover
    >
      <SanityImage
        {...backgroundImage}
        figureclassname={styles.backgroundImage}
        quality={100}
        sizes={["30vw", "30vw", "60vw", "60vw"]}
        priority={true}
      />
      <FlexDiv
        className={styles.content}
        flex={{ direction: "column", x: isLeft ? "flex-end" : "flex-start" }}
        padding={{ [isLeft ? "bottom" : "top"]: [0, 0, 10, 11] }}
      >
        <Heading
          as="h1"
          level={isMobileOrTablet ? "2" : "3"}
          font="Outfit"
          color={color}
          weight={900}
          textAlign={isLeft ? "right" : "left"}
          className={styles.title}
        >
          {title}
        </Heading>
        <PortableTextContent
          value={desc}
          level="regular"
          textAlign={isLeft ? "right" : "left"}
          color={color}
          className={styles.desc}
          // paddingBottomArray={[3, 3, 3, 4]}
        />
        {cta && (
          <Button variant="primary" path={cta.path}>
            {cta.text}
          </Button>
        )}
        {!isMobile && <Tags tags={tags} color={color} />}
      </FlexDiv>
      {isLeft ? (
        <GlowingSign className={styles.graphic} />
      ) : (
        <DigitalDesign className={styles.graphic} />
      )}
      {/* {exampleImages.length > 0 && (
        <FlexDiv
          className={styles.exampleImages}
          padding={{ horizontal: [7, 8, 8, 10], vertical: [0, 4, 5, 6] }}
          gapArray={[0, 2, 2, 3]}
        >
          {exampleImages.map((image, i) => (
            <SanityImage
              {...image}
              figureclassname={styles.floatingImage}
              quality={100}
              sizes={[120, 160, 160, 200]}
              key={i}
            />
          ))}
        </FlexDiv>
      )} */}
    </FlexDiv>
  );
};

export const Landing: React.FC<LandingProps> = ({ left, right, locale }) => {
  const translations = getTranslations(locale);

  return (
    <FlexDiv
      className={cn(styles.landingContainer, {
        // [styles.leftHover]: hoverState === "left",
        // [styles.rightHover]: hoverState === "right",
      })}
      flex={{ direction: "column", y: "center" }}
      width100
    >
      <LandingSide
        side={{
          ...left,
          cta: {
            text: translations.buttons.buildSign,
            path: `/${locale}${LocalPaths.SIGNS}`,
          },
        }}
        isLeft
        color="black"
        // onHover={(isHovered) => {
        //   if (!isMobileOrTablet) setHoverState(isHovered ? "left" : null);
        // }}
      />
      <LandingSide
        side={{
          ...right,
          cta: {
            text: translations.buttons.design,
            path: `/${locale}${LocalPaths.DIGITAL}`,
          },
        }}
        color="white"
        // onHover={(isHovered) => {
        //   if (!isMobileOrTablet) setHoverState(isHovered ? "right" : null);
        // }}
      />
      <Logo className={styles.logo} />
    </FlexDiv>
  );
};

interface TagsProps {
  tags: string[];
  color?: ColorType;
}
const Tags: React.FC<TagsProps> = ({ tags, color }) => (
  <FlexDiv
    className={styles.tags}
    flex={{ direction: "row", x: "center", y: "flex-end" }}
    gapArray={[0, 4, 6, 7]}
    padding={{ horizontal: [0, 4, 5, 6], vertical: [0, 3, 3, 4] }}
  >
    {tags.map((tag, i) => (
      <Heading
        as="h2"
        level="5"
        font="Cursive"
        color={color}
        weight={400}
        className={styles.tag}
        key={i}
      >
        {tag}
      </Heading>
    ))}
  </FlexDiv>
);
