"use client";
import React from "react";
import styles from "./ServicesBlock.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Text/Heading/Heading";
import { Block } from "../../containers/Block";
import { LocalTargets } from "../../../../data.d";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";
import { FancyTitleProps } from "@/components/reuse/FancyTitle/FancyTitle";

export interface ServiceProps {
  title: string;
  titleFR?: string;
  image: ICustomImage;
  path?: string;
}

const Service: React.FC<ServiceProps> = ({ title, titleFR, image, path }) => {
  const locale = useLocale() as LangType;

  return (
    <FlexDiv
      flex={{ direction: "column", x: "center", y: "flex-start" }}
      width100
      className={cn(styles.container)}
      gapArray={[3]}
    >
      <SanityImage
        figureclassname={styles.image}
        {...image}
        quality={90}
        sizes={["50vw", "30vw", "30vw", "30vw"]}
      />
      <Heading
        font="Cursive"
        level="3"
        as="h2"
        color="black"
        weight={900}
        textAlign="center"
        className={styles.title}
      >
        {locale === "fr" && titleFR ? titleFR : title}
      </Heading>
    </FlexDiv>
  );
};

export interface ServicesBlockProps {
  fancyTitle: FancyTitleProps;
  services: ServiceProps[];
}

export const ServicesBlock: React.FC<ServicesBlockProps> = ({
  fancyTitle,
  services,
}) => {
  return (
    <Block
      fancyTitle={fancyTitle}
      theme="light"
      id={LocalTargets.SERVICESBLOCK}
    >
      <FlexDiv
        gapArray={[5, 6, 6, 7]}
        flex={{ y: "flex-start" }}
        width100
        className={styles.services}
        as="ul"
      >
        {services?.map((service: ServiceProps, key) => {
          return (
            <AnimatedWrapper from="inside" key={key} as="li">
              <Service {...service} />
            </AnimatedWrapper>
          );
        })}
      </FlexDiv>
    </Block>
  );
};
