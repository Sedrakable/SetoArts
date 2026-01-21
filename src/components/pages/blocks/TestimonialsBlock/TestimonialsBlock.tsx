"use client";
import React from "react";
import styles from "./TestimonialsBlock.module.scss";
import cn from "classnames";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";
import { useWindowResize } from "@/helpers/useWindowResize";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "../Carousel/DotButton";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import { FancyTitleProps } from "@/components/reuse/FancyTitle/FancyTitle";

export interface TestimonialkProps {
  beforeImage?: ICustomImage;
  afterImage: ICustomImage;
  name: string;
  company: string;
  profileImage?: ICustomImage;
  title?: string;
  review: any;
  titleFR?: string;
  reviewFR: any;
}

const Testimonial: React.FC<TestimonialkProps> = ({
  beforeImage,
  afterImage,
  name,
  profileImage,
  review,
  title,
  company,
  titleFR,
  reviewFR,
}) => {
  const locale = useLocale() as LangType;
  return (
    <FlexDiv
      flex={{ direction: "column", y: "flex-start" }}
      width100
      gapArray={[3, 3, 3, 3]}
    >
      <FlexDiv className={styles.images} width100>
        {beforeImage && (
          <SanityImage
            {...beforeImage}
            figureclassname={styles.beforeImage}
            quality={80}
            sizes={[100, 200, 120, 120]}
          />
        )}
        {afterImage && (
          <SanityImage
            {...afterImage}
            figureclassname={styles.afterImage}
            sizes={["90vw", "90vw", "25vw", "25vw"]}
          />
        )}
      </FlexDiv>
      <FlexDiv
        gapArray={[4]}
        className={styles.bottom}
        flex={{ direction: "column", x: "flex-start" }}
        width100
      >
        <FlexDiv
          gapArray={[3, 3, 3, 4]}
          flex={{ x: "flex-start", y: "flex-start" }}
          width100
          padding={{ left: [3] }}
        >
          {profileImage && (
            <SanityImage
              {...profileImage}
              figureclassname={styles.profileImage}
              sizes={[80, 80, 80, 100]}
            />
          )}
          <FlexDiv flex={{ direction: "column", x: "flex-start" }}>
            <Paragraph
              level="big"
              color={"black"}
              textAlign="left"
              weight={600}
            >
              {name.toUpperCase()}
            </Paragraph>
            <Paragraph
              level="regular"
              color={"black"}
              textAlign="left"
              weight={600}
            >
              {company}
            </Paragraph>
            {title && (
              <Paragraph
                level="small"
                color={"black"}
                textAlign="left"
                weight={400}
              >
                {locale === "fr" && titleFR ? titleFR : title}
              </Paragraph>
            )}
          </FlexDiv>
        </FlexDiv>
        <FlexDiv padding={{ horizontal: [4] }} width100>
          <PortableTextContent
            level="regular"
            value={locale === "fr" && reviewFR ? reviewFR : review}
            textAlign="justify"
            className={styles.desc}
            color={"black"}
            differentColorForStrongText
          />
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  );
};

export interface TestimonialsBlockProps {
  fancyTitle: FancyTitleProps;
  testimonials: TestimonialkProps[];
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  fancyTitle,
  testimonials,
}) => {
  const { isMobileOrTablet } = useWindowResize();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start", // Align slides to the start
    startIndex: 0, // Start at the first slide
    containScroll: "trimSnaps", // Ensure snapping works cleanly
  });
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
  );

  return (
    <>
      {isMobileOrTablet ? (
        <div className={cn(styles.testimonials, styles.carousel)}>
          <div className={styles.emblaViewport} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {testimonials?.map((testimonial, key) => (
                <div className={styles.emblaSlide} key={key}>
                  <Testimonial {...testimonial} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.emblaDots}>
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={cn(styles.emblaDot, {
                  [styles.emblaDotSelected]: index === selectedIndex,
                })}
              />
            ))}
          </div>
        </div>
      ) : (
        <Block fancyTitle={fancyTitle} theme="light" className={styles.block}>
          <FlexDiv
            gapArray={[6, 7, 7, 8]}
            flex={{ y: "flex-start" }}
            width100
            padding={{ top: [6, 8, 8, 9] }}
            className={cn(styles.testimonials)}
            as="ul"
          >
            {testimonials?.map((testimonial: TestimonialkProps, key) => {
              return (
                <AnimatedWrapper from="inside" key={key} as="li">
                  <Testimonial {...testimonial} />
                </AnimatedWrapper>
              );
            })}
          </FlexDiv>
        </Block>
      )}
    </>
  );
};
