"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import styles from "./ThumbCarousel.module.scss";
import cn from "classnames";

import { ICustomImage, SanityImage } from "../SanityImage/SanityImage";
import FlexDiv from "../FlexDiv";

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
      width100
      className={styles.embla}
      gapArray={[3, 4]}
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
              />
            </div>
          ))}
        </div>
      </div>
      <FlexDiv width100 className={styles.thumbs}>
        <div className={styles.viewport} ref={emblaThumbsRef}>
          <FlexDiv className={styles.container} gapArray={[3, 4]}>
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
      //   className={"embla-thumbs__slide".concat(
      //     selected ? " embla-thumbs__slide--selected" : ""
      //   )}
      onClick={onClick}
    >
      <SanityImage
        image={image?.image}
        alt={image?.alt}
        figureclassname={cn(styles.image)}
        quality={50}
      />
    </div>
  );
};
