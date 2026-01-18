"use client";
import React, { useRef } from "react";
import styles from "./Hero.module.scss";
import cn from "classnames";
import Image from "next/image";

import { IHero } from "../../../../data.d";
import FlexDiv from "../../../reuse/FlexDiv";
import bigStroke from "/public/photos/BigStroke.webp";
import { Button } from "../../../reuse/Button/Button";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { useWindowResize } from "../../../../helpers/useWindowResize";

import { PortableTextContent } from "../../../reuse/Text/Paragraph/PortableTextContent";
import { useParallaxScroll } from "@/helpers/useParallaxScroll";

import { FancyText } from "@/components/reuse/Text/FancyText/FancyText";

export const Hero: React.FC<IHero> = ({
  backgroundImage,
  subTitle,
  title,
  desc,
  cta1,
}) => {
  const { isMobile, isMobileOrTablet } = useWindowResize();
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useParallaxScroll(heroRef);

  return (
    <FlexDiv
      className={cn(styles.hero)}
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
          right: [6, 0],
        }}
        gapArray={[5, 4, 6, 7]}
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        customStyle={{ zIndex: 3 }}
        width100
        className={styles.content}
      >
        <FlexDiv
          padding={{ left: [0, 5, 6, 8] }}
          flex={{
            direction: "column",
            y: "flex-start",
            x: isMobile ? "center" : "flex-start",
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
            textAlign={isMobile ? "center" : "left"}
            value={subTitle}
          />
          <FancyText
            font="Outfit"
            level={"2"}
            as="h4"
            color="black"
            className={styles.title}
            textAlign={isMobile ? "center" : "left"}
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
      {/* {!isMobile && graphic[theme]} */}
    </FlexDiv>
  );
};
