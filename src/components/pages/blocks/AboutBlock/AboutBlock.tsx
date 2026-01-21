"use client";
import React from "react";
import styles from "./AboutBlock.module.scss";
import { Block } from "../../containers/Block";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Text/Heading/Heading";
import {
  ICustomImage,
  SanityImage,
} from "../../../reuse/SanityImage/SanityImage";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";
import { FancyText } from "@/components/reuse/Text/FancyText/FancyText";
// import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";

export interface AboutBlockProps {
  profileImage: ICustomImage;
  title: FancyText;
  subTitle: string;
  desc: any;
}

export const AboutBlock: React.FC<AboutBlockProps> = ({
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
        // padding={{ top: [8, 9, 9, 10] }}
        className={styles.container}
      >
        {/* <AnimatedWrapper from="left" className={styles.imgContainer}> */}
        <SanityImage
          figureclassname={styles.image}
          image={profileImage?.image}
          alt={profileImage?.alt}
          priority={true}
          quality={90}
          sizes={["90vw", "25vw", "40vw", "30vw"]}
        />
        {/* </AnimatedWrapper> */}
        {/* <AnimatedWrapper from="right"  */}
        <FlexDiv
          width100
          flex={{ direction: "column", x: "flex-start" }}
          className={styles.textContainer}
        >
          <Heading
            font="Cursive"
            as="h2"
            level="4"
            color="light-grey"
            weight={900}
            // paddingBottomArray={[2, 3, 3, 4]}
          >
            {subTitle}
          </Heading>
          <FancyText
            value={title}
            font="Outfit"
            as="h2"
            level="2"
            color="black"
            // upperCase={false}
            weight={600}
            paddingBottomArray={[2, 3, 3, 4]}
          />

          <PortableTextContent value={desc} level="regular" />
        </FlexDiv>
        {/* </AnimatedWrapper> */}
      </FlexDiv>
    </Block>
  );
};
