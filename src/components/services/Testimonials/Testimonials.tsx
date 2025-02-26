"use client";
import React from "react";
import styles from "./Testimonials.module.scss";
import cn from "classnames";
import { BlockVariantType, Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import { ITestimonial } from "@/data.d";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { PortableTextContent } from "@/components/reuse/Paragraph/PortableTextContent";

const Testimonial: React.FC<ITestimonial> = ({
  beforeImage,
  afterImage,
  name,
  profileImage,
  review,
  title,
}) => {
  return (
    <FlexDiv
      flex={{ direction: "column", y: "flex-start" }}
      width100
      gapArray={[1]}
      as="li"
    >
      <FlexDiv className={styles.images} width100>
        {beforeImage && (
          <SanityImage
            {...beforeImage}
            figureclassname={styles.beforeImage}
            quality={20}
          />
        )}
        {afterImage && (
          <SanityImage
            {...afterImage}
            figureclassname={styles.afterImage}
            quality={70}
          />
        )}
      </FlexDiv>
      <FlexDiv
        gapArray={[4]}
        className={styles.bottom}
        flex={{ direction: "column" }}
        width100
      >
        <FlexDiv
          padding={{ left: [4] }}
          gapArray={[4]}
          flex={{ x: "flex-start", y: "flex-end" }}
          width100
        >
          {profileImage && (
            <SanityImage
              {...profileImage}
              figureclassname={styles.profileImage}
              quality={20}
            />
          )}

          <FlexDiv
            flex={{ direction: "column", x: "flex-start" }}
            padding={{ bottom: [3] }}
          >
            <Paragraph level="big" color="black" textAlign="left" weight={600}>
              {name.toUpperCase()}
            </Paragraph>
            <Paragraph
              level="regular"
              color="black"
              textAlign="left"
              weight={400}
            >
              {title}
            </Paragraph>
          </FlexDiv>
        </FlexDiv>
        <FlexDiv padding={{ horizontal: [4] }} width100>
          <PortableTextContent
            level="regular"
            value={review}
            textAlign="justify"
            className={styles.desc}
          />
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  );
};

export interface TestimonialsProps {
  variant: BlockVariantType;
  testimonials: ITestimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  variant = "dark",
}) => {
  return (
    <Block variant={variant}>
      <FlexDiv
        gapArray={[6, 7, 7, 8]}
        flex={{ y: "flex-start" }}
        width100
        padding={{ top: [5, 6, 6, 7] }}
        className={cn(styles.testimonials, styles[variant])}
        as="ul"
      >
        {testimonials?.map((testimonial: ITestimonial, key) => {
          return <Testimonial {...testimonial} key={key} />;
        })}
      </FlexDiv>
    </Block>
  );
};
