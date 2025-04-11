"use client";
import React, { FC, useEffect, useRef, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./ProjectSlider.module.scss";
import cn from "classnames";
import { ICustomImage, SanityImage } from "../../reuse/SanityImage/SanityImage";
import { useWindowResize } from "../../../helpers/useWindowResize";
import { shuffleArray } from "../../../helpers/functions";
import { SideContainer, SideContainerProps } from "./SideContainer";
import { DotButton, useDotButton } from "@/components/reuse/Carousel/DotButton";
import FlexDiv from "@/components/reuse/FlexDiv";

// Constants for easy configuration
const AUTOPLAY_DELAY = 5000; // 5 seconds
const GRID_SIZE = 9;
const THUMBNAIL_INDEX = 4;
const QUALITY = { thumbnail: 90, grid: 5, single: 80 };
const BLUR = { thumbnail: 0, grid: 3, single: 0 };

export interface ProjectSliderProps {
  customImages: ICustomImage[];
  thumbnailImage: ICustomImage;
  content?: SideContainerProps;
}

export interface SpliderContainerProps {
  slides: ProjectSliderProps[];
}

export const ProjectSlider: FC<SpliderContainerProps> = ({ slides }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(performance.now());
  const { isMobileOrTablet } = useWindowResize();

  // Initialize Embla Carousel with Autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      startIndex: 0,
      containScroll: "trimSnaps",
      loop: true,
    },
    [Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false })]
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi
  );

  // Reset start time on slide change
  useEffect(() => {
    if (!emblaApi) return undefined;

    const onSelect = () => {
      startTimeRef.current = performance.now();
    };

    emblaApi.on("select", onSelect);
    onSelect(); // Initial call

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Animate progress bar
  useEffect(() => {
    if (!emblaApi || !progressRef.current) return;

    const updateProgress = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const progress = Math.min(elapsed / AUTOPLAY_DELAY, 1);
      progressRef.current!.style.transform = `scaleX(${progress})`;
      requestAnimationFrame(updateProgress);
    };

    requestAnimationFrame(updateProgress);
  }, [emblaApi, progressRef]);

  // Handle dot clicks and reset autoplay timer
  const handleDotClick = (index: number) => {
    onDotButtonClick(index);
    emblaApi?.plugins()?.autoplay?.reset();
  };

  // Construct 9-image grid with thumbnail at center
  const buildGridImages = (slide: ProjectSliderProps) => {
    const shuffledImages = shuffleArray([...slide.customImages]);
    const repeatedImages = Array.from(
      { length: Math.ceil((GRID_SIZE - 1) / shuffledImages.length) },
      () => shuffledImages
    )
      .flat()
      .slice(0, GRID_SIZE - 1); // 8 images excluding thumbnail
    return [
      ...repeatedImages.slice(0, THUMBNAIL_INDEX),
      slide.thumbnailImage,
      ...repeatedImages.slice(THUMBNAIL_INDEX),
    ];
  };

  // Render individual slide
  const renderSlide = (slide: ProjectSliderProps, key: number) => {
    const hasCustomImages = slide.customImages.length > 0;
    const gridImages = useMemo(
      () => (hasCustomImages ? buildGridImages(slide) : null),
      [slide.customImages, slide.thumbnailImage]
    );

    return (
      <div
        className={cn(styles.emblaSlide, { [styles.content]: slide.content })}
        key={key}
      >
        {!isMobileOrTablet && slide.content && (
          <SideContainer {...slide.content} />
        )}
        {hasCustomImages ? (
          <div className={styles.imgGridWrapper}>
            <div className={styles.imgGrid}>
              {gridImages!.map((image, index) => (
                <SanityImage
                  key={index}
                  image={image.image}
                  alt={image.alt}
                  quality={
                    index === THUMBNAIL_INDEX ? QUALITY.thumbnail : QUALITY.grid
                  }
                  className={index !== THUMBNAIL_INDEX ? styles.blur : ""}
                />
              ))}
            </div>
          </div>
        ) : (
          <SanityImage
            image={slide.thumbnailImage.image}
            alt={slide.thumbnailImage.alt}
            quality={QUALITY.single}
          />
        )}
        {isMobileOrTablet && slide.content && (
          <SideContainer {...slide.content} />
        )}
      </div>
    );
  };

  return (
    <div className={cn(styles.splider, styles.carousel)}>
      <div className={styles.emblaViewport} ref={emblaRef}>
        <div className={styles.emblaContainer}>{slides?.map(renderSlide)}</div>
      </div>
      <FlexDiv
        className={styles.emblaControls}
        gapArray={[4]}
        flex={{ direction: "column", x: "flex-start" }}
        padding={{ vertical: [6], horizontal: [6, 6, 6, 7] }}
      >
        <FlexDiv className={styles.emblaDots} gapArray={[4]}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(styles.emblaDot, {
                [styles.emblaDotSelected]: index === selectedIndex,
              })}
            />
          ))}
        </FlexDiv>
        <div className={styles.emblaProgress}>
          <div className={styles.emblaProgressBar} ref={progressRef} />
        </div>
      </FlexDiv>
    </div>
  );
};
