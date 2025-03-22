"use client";
import React, { useEffect } from "react";
import styles from "./Testimonials.module.scss";
import cn from "classnames";
import { BlockVariantType, Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import { ITestimonial } from "@/data.d";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { PortableTextContent } from "@/components/reuse/Paragraph/PortableTextContent";
import { useWindowResize } from "@/helpers/useWindowResize";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "@/components/reuse/Carousel/DotButton";

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
          gapArray={[2, 3, 3, 3]}
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
            <Paragraph
              level="regular"
              color="black"
              textAlign="left"
              weight={600}
            >
              {name.toUpperCase()}
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
  variant: BlockVariantType;
  testimonials: ITestimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  variant = "dark",
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

  // // Force scroll to slide 0 on mount and log for debugging
  // useEffect(() => {
  //   if (emblaApi) {
  //     emblaApi.reInit();
  //     emblaApi.scrollTo(0);
  //     console.log("Scroll snaps:", emblaApi.scrollSnapList());
  //     console.log("Selected index:", emblaApi.selectedScrollSnap());
  //   }
  // }, [emblaApi]);

  // Force scroll to slide 0 on mount
  return (
    <>
      {isMobileOrTablet ? (
        <div
          className={cn(styles.testimonials, styles[variant], styles.carousel)}
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
        <Block variant={variant}>
          <FlexDiv
            gapArray={[6, 7, 7, 8]}
            flex={{ y: "flex-start" }}
            width100
            padding={{ top: [6, 8, 7, 8] }}
            className={cn(styles.testimonials, styles[variant])}
            as="ul"
          >
            {testimonials?.map((testimonial: ITestimonial, key) => {
              return <Testimonial {...testimonial} key={key} />;
            })}
          </FlexDiv>
        </Block>
      )}
    </>
  );
};
