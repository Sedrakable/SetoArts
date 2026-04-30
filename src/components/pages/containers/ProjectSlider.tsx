"use client";

import React from "react";
import cn from "classnames";
import styles from "./ProjectSlider.module.scss";
import FlexDiv from "@/components/reuse/FlexDiv";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";
import { SideContainer, SideContainerProps } from "./SideContainer";
import { useWindowResize } from "@/helpers/useWindowResize";

export interface ProjectSliderProps {
  customImages?: ICustomImage[];
  thumbnailImage: ICustomImage;
  content?: SideContainerProps;
}

export interface SliderContainerProps {
  slides: ProjectSliderProps[];
}

const gridImageIndexes = [0, 1, 2, 3, -1, 4, 5, 6, 7];

const ProjectSlide = ({ slide }: { slide: ProjectSliderProps }) => {
  const { isMobileOrTablet } = useWindowResize();
  const customImages = slide.customImages ?? [];
  const hasCustomImages = customImages.length > 0;
  const gridImages = gridImageIndexes.map((index) =>
    index === -1 ? slide.thumbnailImage : customImages[index % customImages.length],
  );

  return (
    <div className={cn(styles.emblaSlide, { [styles.content]: slide.content })}>
      {!isMobileOrTablet && slide.content && <SideContainer {...slide.content} />}

      {hasCustomImages ? (
        <div className={styles.imgGridWrapper}>
          <div className={styles.imgGrid}>
            {gridImages.map((image, index) => (
              <SanityImage
                key={`${image.alt}-${index}`}
                image={image.image}
                alt={image.alt}
                quality={index === 4 ? 90 : 20}
                figureclassname={index === 4 ? "" : styles.blur}
              />
            ))}
          </div>
        </div>
      ) : (
        <SanityImage
          image={slide.thumbnailImage.image}
          alt={slide.thumbnailImage.alt}
          quality={80}
        />
      )}

      {isMobileOrTablet && slide.content && <SideContainer {...slide.content} />}
    </div>
  );
};

export const ProjectSlider: React.FC<SliderContainerProps> = ({ slides }) => {
  return (
    <div className={cn(styles.splider, styles.carousel)}>
      <div className={styles.emblaViewport}>
        <div className={styles.emblaContainer}>
          {slides.map((slide, index) => (
            <ProjectSlide key={index} slide={slide} />
          ))}
        </div>
      </div>
      {slides.length > 1 && (
        <FlexDiv
          className={styles.emblaControls}
          gapArray={[4]}
          flex={{ direction: "column", x: "flex-start" }}
          padding={{ vertical: [6], horizontal: [6, 6, 6, 7] }}
        >
          <FlexDiv className={styles.emblaDots} gapArray={[4]}>
            {slides.map((_, index) => (
              <span
                key={index}
                className={cn(styles.emblaDot, {
                  [styles.emblaDotSelected]: index === 0,
                })}
              />
            ))}
          </FlexDiv>
        </FlexDiv>
      )}
    </div>
  );
};
