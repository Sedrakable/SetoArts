"use client";
import React, { useEffect, useState } from "react"; // Add useState
import styles from "./Landing.module.scss";
import cn from "classnames";
import { ICta, ILandingSide, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n";
import { getTranslations } from "@/helpers/langUtils";

import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading, ColorType } from "@/components/reuse/Text/Heading/Heading";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";
import { Button } from "@/components/reuse/Button/Button";

import Logo from "@/assets/vector/LogoSmall.svg";
import GlowingSign from "@/assets/vector/GlowingSignGraphic.svg";
import DigitalDesign from "@/assets/vector/DigitalDesignGraphic.svg";

import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";
import { useWindowResize } from "@/helpers/useWindowResize";

export interface LandingProps {
  left: ILandingSide;
  right: ILandingSide;
  locale: LangType;
}

const LandingSide: React.FC<{
  side: ILandingSide;
  isLeft?: boolean;
  cta: ICta;
  color: ColorType;
  image: ICustomImage;
  onHover: (isHovered: boolean) => void; // Add hover callback
}> = ({ side, isLeft = false, cta, color, image, onHover }) => {
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
      onMouseEnter={() => onHover(true)} // Trigger hover
      onMouseLeave={() => onHover(false)} // Clear hover
    >
      <SanityImage
        {...image}
        figureclassname={styles.backgroundImage}
        sizes={["30vw", "30vw", "50vw", "50vw"]}
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
          {side.title}
        </Heading>
        <PortableTextContent
          value={side.desc}
          level="small"
          textAlign={isLeft ? "right" : "left"}
          color={color}
          className={styles.desc}
          // paddingBottomArray={[3, 3, 3, 4]}
        />
        <Button variant="primary" path={cta.path}>
          {cta.text}
        </Button>
        {!isMobile && <Tags tags={side.tags} color={color} />}
      </FlexDiv>
      {isLeft ? (
        <GlowingSign className={styles.graphic} />
      ) : (
        <DigitalDesign className={styles.graphic} />
      )}
    </FlexDiv>
  );
};

export const Landing: React.FC<LandingProps> = ({ left, right, locale }) => {
  const translations = getTranslations(locale);
  const [hoverState, setHoverState] = useState<"left" | "right" | null>(null); // Track hover
  const { isMobileOrTablet } = useWindowResize();
  useEffect(() => {
    if (isMobileOrTablet) setHoverState(null); // Clear hover on mobile
  }, [isMobileOrTablet]);
  return (
    <FlexDiv
      className={cn(styles.landingContainer, {
        [styles.leftHover]: hoverState === "left",
        [styles.rightHover]: hoverState === "right",
      })}
      flex={{ direction: "column", y: "center" }}
      width100
    >
      <LandingSide
        side={left}
        image={left.backgroundImage}
        isLeft
        cta={{
          text: translations.buttons.buildSign,
          path: `/${locale}${LocalPaths.WOOD}`,
        }}
        color="black"
        onHover={(isHovered) => {
          if (!isMobileOrTablet) setHoverState(isHovered ? "left" : null);
        }}
      />
      <LandingSide
        side={right}
        image={right.backgroundImage}
        cta={{
          text: translations.buttons.buildBrand,
          path: `/${locale}${LocalPaths.DIGITAL}`,
        }}
        color="white"
        onHover={(isHovered) => {
          if (!isMobileOrTablet) setHoverState(isHovered ? "right" : null);
        }}
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
