"use client";
import React from "react";
import styles from "./Hero.module.scss";
import cn from "classnames";
import Image from "next/image";

import { ICta } from "../../../../data.d";
import FlexDiv from "../../../reuse/FlexDiv";
import { Button } from "../../../reuse/Button/Button";
import {
  ICustomImage,
  SanityImage,
} from "../../../reuse/SanityImage/SanityImage";
import { useWindowResize } from "../../../../helpers/useWindowResize";

import { PortableTextContent } from "../../../reuse/Text/Paragraph/PortableTextContent";

import { FancyText } from "@/components/reuse/Text/FancyText/FancyText";
import { SpacingArrayType } from "@/helpers/SpacingGenerator";

export interface HeroProps {
  backgroundImage: ICustomImage;
  subTitle: FancyText;
  title: FancyText;
  desc: FancyText;
  cta1?: ICta;
  cta2?: ICta;
  version?: 1 | 2;
}

export const Hero: React.FC<HeroProps> = ({
  backgroundImage,
  subTitle,
  title,
  desc,
  cta1,
  cta2,
  version = 1,
}) => {
  const { isMobileOrTablet, isMobile } = useWindowResize();
  // const heroRef = useRef<HTMLDivElement>(null);
  // const scrollProgress = useParallaxScroll(heroRef);
  const paddings: { top: SpacingArrayType; bottom: SpacingArrayType } =
    version === 1
      ? { top: [4, 7, 10, 11], bottom: [8, 9, 11, 12] }
      : { top: [4, 7, 9, 11], bottom: [6, 7, 9, 10] };
  return (
    <FlexDiv
      className={cn(styles.hero, styles[`version${version}`])}
      padding={paddings}
      flex={{ direction: "column-reverse", x: "flex-start", y: "flex-start" }}
      as={"header"}
      width100
      // ref={heroRef}
      // customStyle={
      //   {
      //     "--scroll-progress": scrollProgress,
      //   } as React.CSSProperties
      // }
    >
      <div className={styles.backgroundContainer}>
        <SanityImage
          figureclassname={styles.backgroundImage}
          {...backgroundImage}
          priority={true}
          quality={90}
          sizes={["100vw", "100vw", "50vw", "50vw"]}
        />
        {/* <SanityImage
          figureclassname={styles.foregroundImage}
          {...foregroundImage}
          priority={true}
          sizes={["70vw", "60vw", "60vw", "70vw"]}
        /> */}
      </div>
      <FlexDiv
        padding={{
          left: [6, 7, 8, 10],
          right: [6, 7],
        }}
        gapArray={[5, 4, 6, 7]}
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        customStyle={{ zIndex: 3 }}
        width100
        className={styles.content}
      >
        <FlexDiv
          padding={{ left: [0, 0, 6, 8] }}
          flex={{
            direction: "column",
            y: "flex-start",
            x: isMobileOrTablet ? "center" : "flex-start",
          }}
          gapArray={[3, 2]}
          className={styles.titles}
          width100
        >
          <FancyText
            level={isMobileOrTablet ? "5" : "5"}
            font="Cursive"
            as="h3"
            color="light-grey"
            textAlign={isMobileOrTablet ? "center" : "left"}
            value={subTitle}
          />
          <FancyText
            font="Outfit"
            level={"2"}
            as="h4"
            color="black"
            className={styles.title}
            textAlign={isMobileOrTablet ? "center" : "left"}
            weight={500}
            paddingBottomArray={[0, 2, 2, 3]}
            value={title}
          />

          {desc && (
            <PortableTextContent
              value={desc}
              differentColorForStrongText={false}
              level="regular"
              className={styles.desc}
              textAlign={isMobileOrTablet ? "center" : "left"}
              paddingBottomArray={[0, 0, 0, 3]}
            />
          )}
          {cta1 && (
            <FlexDiv
              gapArray={[3, 3, 4, 4]}
              width100={isMobile}
              flex={{ direction: isMobile ? "column" : "row" }}
            >
              {cta1 && (
                <Button
                  variant={isMobileOrTablet ? "primary" : "fancy"}
                  path={cta1.path}
                  scrollTarget={cta1.scrollTarget}
                >
                  {cta1.text}
                </Button>
              )}
              {cta2 && (
                <Button
                  variant="white"
                  outline
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

      {version === 1 && (
        <Image
          src={"/photos/BigStroke.webp"}
          alt="stroke"
          width={2400}
          height={200}
          className={styles.stroke}
        />
      )}
    </FlexDiv>
  );
};
