"use client";
import React, { useRef, useEffect } from "react";
import styles from "./FeaturesBlock.module.scss";
import cn from "classnames";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import GridDiv from "@/components/reuse/GridDiv";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";
import { FancyTitleProps } from "@/components/reuse/FancyTitle/FancyTitle";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";
import { FancyText } from "@/components/reuse/Text/FancyText/FancyText";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";
import { Heading } from "@/components/reuse/Text/Heading/Heading";

export interface FeatureProps {
  image: ICustomImage;
  title: string;
  desc: FancyText;
}

const Feature: React.FC<FeatureProps> = ({ title, image, desc }) => {
  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
      width100
      className={cn(styles.container)}
      padding={{ all: [5], bottom: [4], top: [4] }}
      gapArray={[5, 4, 4, 5]}
    >
      <SanityImage
        figureclassname={styles.image}
        {...image}
        quality={90}
        sizes={["90vw", "45vw", "40vw", "40vw"]}
      />

      <FlexDiv
        flex={{ direction: "column", y: "flex-start", x: "flex-start" }}
        width100
        className={styles.content}
        height100
        gapArray={[0]}
      >
        <FlexDiv
          className={styles.title}
          flex={{ y: "flex-end", x: "flex-start" }}
          padding={{ bottom: [2, 2, 3, 3] }}
        >
          <Heading
            font="Outfit"
            level="4"
            as="h3"
            color="white"
            weight={600}
            upperCase={false}
            // paddingBottomArray={[2, 2, 3, 3]}
          >
            {title}
          </Heading>
        </FlexDiv>

        <PortableTextContent
          value={desc}
          level="small"
          color="white"
          className={styles.desc}
        />
      </FlexDiv>
    </FlexDiv>
  );
};

export interface FeaturesBlockProps {
  fancyTitle: FancyTitleProps;
  features: FeatureProps[];
}

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({
  fancyTitle,
  features,
}) => {
  return (
    <Block fancyTitle={fancyTitle} theme="light" className={styles.block}>
      <GridDiv
        gapArray={[4, 5, 5, 6]}
        columns={[
          [1, 1],
          [2, 3],
          [3, 4],
          [4, 5],
        ]}
        width100
        as="ul"
      >
        {features?.map((feature: FeatureProps, key) => {
          return (
            <AnimatedWrapper from="inside" key={key} as="li">
              <Feature {...feature} />
            </AnimatedWrapper>
          );
        })}
      </GridDiv>
    </Block>
  );
};
