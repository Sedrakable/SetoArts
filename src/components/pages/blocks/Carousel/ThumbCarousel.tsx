// src/components/pages/blocks/Carousel/ThumbCarousel.tsx
"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import cn from "classnames";

import styles from "./ThumbCarousel.module.scss";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";
import FlexDiv from "@/components/reuse/FlexDiv";

interface ThumbCarouselProps {
  images: ICustomImage[];
  options?: EmblaOptionsType;
}

export const ThumbCarousel: FC<ThumbCarouselProps> = ({ images, options }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "x",
    align: "start", // Add this
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className={styles.embla}>
      <div className={styles.viewport} ref={emblaMainRef}>
        <div className={styles.container}>
          {images.map((image, index) => (
            <div className={styles.slide} key={index}>
              <SanityImage
                {...image}
                figureclassname={styles.slideImage}
                quality={90}
                sizes={["80vw", "75vw", "30vw", "30vw"]}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.thumbsViewport} ref={emblaThumbsRef}>
        <FlexDiv className={styles.thumbsContainer} gapArray={[3, 3, 3, 4]}>
          {images.map((image, index) => (
            <Thumb
              key={index}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              image={image}
            />
          ))}
        </FlexDiv>
      </div>
    </div>
  );
};

interface ThumbProps {
  selected: boolean;
  image: ICustomImage;
  onClick: () => void;
}

const Thumb: FC<ThumbProps> = ({ selected, image, onClick }) => {
  return (
    <button
      type="button"
      className={cn(styles.thumb, selected && styles.selected)}
      onClick={onClick}
      aria-label={`View ${image.alt}`}
    >
      <SanityImage
        {...image}
        figureclassname={styles.thumbImage}
        quality={30}
        sizes={[80, 120, 100, 100]}
      />
    </button>
  );
};
