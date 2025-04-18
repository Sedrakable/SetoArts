"use client";
import React from "react";
import styles from "./About.module.scss";
import { Block } from "../../containers/Block";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Text/Heading/Heading";
import { IAbout } from "../../../../data.d";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";

export const About: React.FC<IAbout> = ({
  profileImage,
  title,
  subTitle,
  desc,
}) => {
  return (
    <Block theme="light">
      <FlexDiv
        width100
        flex={{ x: "flex-start", y: "flex-start", direction: "column" }}
        gapArray={[6, 7, 7, 8]}
        padding={{ top: [8, 9, 9, 10] }}
        className={styles.container}
      >
        <AnimatedWrapper from="left" className={styles.imgContainer}>
          <SanityImage
            figureclassname={styles.image}
            image={profileImage?.image}
            alt={profileImage?.alt}
            loading="eager"
            fetchPriority="high"
            rel="preload"
            sizes={["90vw", "70vw", "40vw", "40vw"]}
          />
        </AnimatedWrapper>
        <AnimatedWrapper from="right" className={styles.textContainer}>
          <FlexDiv width100 flex={{ direction: "column", x: "flex-start" }}>
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
        </AnimatedWrapper>
      </FlexDiv>
    </Block>
  );
};
