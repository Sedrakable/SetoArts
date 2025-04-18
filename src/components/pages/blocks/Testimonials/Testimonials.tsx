"use client";
import React from "react";
import styles from "./Testimonials.module.scss";
import cn from "classnames";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import { ITestimonial, ITheme } from "@/data.d";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";
import { useWindowResize } from "@/helpers/useWindowResize";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "../Carousel/DotButton";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";

const Testimonial: React.FC<ITestimonial> = ({
  beforeImage,
  afterImage,
  name,
  profileImage,
  review,
  title,
  company,
}) => {
  return (
    <FlexDiv
      flex={{ direction: "column", y: "flex-start" }}
      width100
      gapArray={[3, 3, 3, 3]}
      as="li"
    >
      <FlexDiv className={styles.images} width100>
        {beforeImage && (
          <SanityImage
            {...beforeImage}
            figureclassname={styles.beforeImage}
            quality={20}
            sizes={[100, 200, 120, 120]}
          />
        )}
        {afterImage && (
          <SanityImage
            {...afterImage}
            figureclassname={styles.afterImage}
            quality={100}
            sizes={["90vw", "90vw", "25vw", "25vw"]}
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
            <Paragraph level="big" color="black" textAlign="left" weight={600}>
              {name.toUpperCase()}
            </Paragraph>
            <Paragraph
              level="regular"
              color="black"
              textAlign="left"
              weight={600}
            >
              {company}
            </Paragraph>
            <Paragraph
              level="small"
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
  theme: ITheme;
  testimonials: ITestimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  theme = "dark",
}) => {
  const { isMobileOrTablet } = useWindowResize();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start", // Align slides to the start
    startIndex: 0, // Start at the first slide
    containScroll: "trimSnaps", // Ensure snapping works cleanly
  });
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi
  );

  return (
    <>
      {isMobileOrTablet ? (
        <div
          className={cn(styles.testimonials, styles[theme], styles.carousel)}
        >
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
        <Block theme="light" className={styles.block}>
          <FlexDiv
            gapArray={[6, 7, 7, 8]}
            flex={{ y: "flex-start" }}
            width100
            padding={{ top: [6, 8, 7, 8] }}
            className={cn(styles.testimonials, styles[theme])}
            as="ul"
          >
            {testimonials?.map((testimonial: ITestimonial, key) => {
              return (
                <AnimatedWrapper from="inside" key={key}>
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
