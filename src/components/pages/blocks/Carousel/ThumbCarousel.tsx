"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import styles from "./ThumbCarousel.module.scss";
import cn from "classnames";
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
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <FlexDiv
      flex={{ direction: "column", x: "center" }}
      className={styles.embla}
      gapArray={[3, 3, 3, 4]}
    >
      <div className={styles.viewport} ref={emblaMainRef}>
        <div className={styles.container}>
          {images.map((image, index) => (
            <div className={styles.slide} key={index}>
              <SanityImage
                image={image?.image}
                alt={image?.alt}
                figureclassname={cn(styles.image)}
                quality={90}
                sizes={["80vw", "75vw", "30vw", "30vw"]}
              />
            </div>
          ))}
        </div>
      </div>
      <FlexDiv
        className={styles.thumbs}
        ref={emblaThumbsRef}
        gapArray={[3, 3, 3, 4]}
      >
        {images.map((image, index) => (
          <Thumb
            key={index}
            onClick={() => onThumbClick(index)}
            selected={index === selectedIndex}
            image={image}
          />
        ))}
      </FlexDiv>
    </FlexDiv>
  );
};

interface ThumbProps {
  selected: boolean;
  image: ICustomImage;
  onClick: () => void;
}

export const Thumb: React.FC<ThumbProps> = ({ selected, image, onClick }) => {
  return (
    <div
      className={cn(styles.thumb, selected && styles.selected)}
      onClick={onClick}
    >
      <SanityImage
        image={image?.image}
        alt={image?.alt}
        figureclassname={cn(styles.image)}
        quality={30}
        sizes={[80, 120, 100, 100]}
      />
    </div>
  );
};
