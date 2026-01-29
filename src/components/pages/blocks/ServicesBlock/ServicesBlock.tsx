"use client";
import React from "react";
import styles from "./ServicesBlock.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import GridDiv from "../../../reuse/GridDiv";
import { Heading } from "../../../reuse/Text/Heading/Heading";
import { Block } from "../../containers/Block";
import { LocalTargets } from "../../../../data.d";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";
import { FancyTitleProps } from "@/components/reuse/FancyTitle/FancyTitle";
import { FancyText } from "@/components/reuse/Text/FancyText/FancyText";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";
import { useWindowResize } from "@/helpers/useWindowResize";

export interface ServiceProps {
  title: string;
  desc: FancyText;
  image: ICustomImage;
}

const Service: React.FC<ServiceProps & { index: number }> = ({
  title,
  desc,
  image,
  index,
}) => {
  const isReversed = index % 2 !== 0;
  const { isMobileOrTablet } = useWindowResize();

  const content = (
    <>
      {/* Image */}
      <div className={styles.imageContainer}>
        <SanityImage
          figureclassname={styles.image}
          {...image}
          quality={90}
          sizes={["90vw", "45vw", "40vw", "40vw"]}
        />
      </div>

      {/* Content */}
      <FlexDiv
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        className={styles.content}
      >
        <Heading font="Cursive" level="5" as="span" color="light-grey">
          Glow Wood
        </Heading>
        <Heading
          font="Outfit"
          level="1"
          as="h3"
          color="black"
          weight={500}
          paddingBottomArray={[2, 2, 3, 3]}
        >
          {title}
        </Heading>
        <PortableTextContent
          value={desc}
          level="regular"
          color="black"
          className={styles.desc}
        />
      </FlexDiv>
    </>
  );

  if (isMobileOrTablet) {
    return (
      <FlexDiv
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        width100
        gapArray={[3, 4]}
        className={styles.serviceRow}
        as="li"
      >
        {content}
      </FlexDiv>
    );
  }

  return (
    <GridDiv
      columns={[
        [1, 1],
        [1, 1],
        [2, 2],
        [2, 2],
      ]}
      gapArray={[3, 4, 7, 8]}
      width100
      className={cn(styles.serviceRow, isReversed && styles.reversed)}
      as="li"
    >
      {content}
    </GridDiv>
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
      theme="off-white"
      id={LocalTargets.SERVICESBLOCK}
    >
      <FlexDiv
        gapArray={[7, 8, 8, 9]}
        flex={{ direction: "column" }}
        width100
        as="ul"
      >
        {services?.map((service: ServiceProps, key) => {
          return <Service key={key} index={key} {...service} />;
        })}
      </FlexDiv>
    </Block>
  );
};
