"use client";
import React, { useRef, useEffect, useState } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMeasured, setIsMeasured] = useState(false);

  useEffect(() => {
    const measureHeights = () => {
      if (contentRef.current && containerRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const titleHeight = contentRef.current.children[0]?.clientHeight || 0;

        if (contentHeight > 0 && titleHeight > 0) {
          containerRef.current.style.setProperty(
            "--content-height",
            `${contentHeight}px`,
          );
          containerRef.current.style.setProperty(
            "--title-height",
            `${titleHeight}px`,
          );
          setIsMeasured(true);
        }
      }
    };

    // Initial measurement with delay
    const timer1 = setTimeout(measureHeights, 100);

    // Backup measurement in case fonts are still loading
    const timer2 = setTimeout(measureHeights, 500);

    // Measure on window load (after all resources)
    window.addEventListener("load", measureHeights);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("load", measureHeights);
    };
  }, [title, desc]);

  return (
    <FlexDiv
      ref={containerRef}
      flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
      width100
      className={cn(styles.container, { [styles.measured]: isMeasured })}
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
        ref={contentRef}
        flex={{ direction: "column", y: "flex-start", x: "flex-start" }}
        width100
        className={styles.content}
        height100
        gapArray={[0]}
      >
        <Heading
          font="Outfit"
          level="4"
          as="h3"
          color="white"
          weight={600}
          upperCase={false}
          paddingBottomArray={[2, 2, 3, 3]}
        >
          {title}
        </Heading>
        <PortableTextContent
          value={desc}
          level="regular"
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
