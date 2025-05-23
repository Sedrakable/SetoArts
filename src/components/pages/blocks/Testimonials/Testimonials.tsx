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
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import { Button } from "@/components/reuse/Button/Button";
import { getTranslations } from "@/helpers/langUtils";

const Testimonial: React.FC<ITestimonial & { theme: ITheme }> = ({
  theme,
  beforeImage,
  afterImage,
  name,
  profileImage,
  review,
  title,
  company,
  titleFR,
  reviewFR,
  link,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  console.log("link", link);
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
              color={theme === "light" ? "black" : "white"}
              textAlign="left"
              weight={600}
            >
              {name.toUpperCase()}
            </Paragraph>
            <Paragraph
              level="regular"
              color={theme === "light" ? "black" : "white"}
              textAlign="left"
              weight={600}
            >
              {company}
            </Paragraph>
            {title && (
              <Paragraph
                level="small"
                color={theme === "light" ? "black" : "white"}
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
            color={theme === "light" ? "black" : "white"}
            differentColorForStrongText
          />
        </FlexDiv>
        {link && (
          <Button
            variant={theme === "light" ? "white" : "black"}
            outline
            href={link}
          >
            {translations.buttons.viewCaseStudy}
          </Button>
        )}
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
  theme = "light",
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
                  <Testimonial {...testimonial} theme={theme} />
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
        <Block theme={theme} className={styles.block}>
          <FlexDiv
            gapArray={[6, 7, 7, 8]}
            flex={{ y: "flex-start" }}
            width100
            padding={{ top: [6, 8, 8, 9] }}
            className={cn(styles.testimonials, styles[theme])}
            as="ul"
          >
            {testimonials?.map((testimonial: ITestimonial, key) => {
              return (
                <AnimatedWrapper from="inside" key={key} as="li">
                  <Testimonial {...testimonial} theme={theme} />
                </AnimatedWrapper>
              );
            })}
          </FlexDiv>
        </Block>
      )}
    </>
  );
};
