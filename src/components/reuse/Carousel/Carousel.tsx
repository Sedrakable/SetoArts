"use client";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

import styles from "./Carousel.module.scss";
import cn from "classnames";

import { ICustomImage, SanityImage } from "../SanityImage/SanityImage";
import { ICta } from "@/data.d";
import FlexDiv from "../FlexDiv";
import { Button } from "../Button";
import { useShuffleArray } from "@/helpers/useShuffleArray";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

interface ICarouselProps {
  images: ICustomImage[];
  cta?: ICta;
}

export const Carousel: FC<ICarouselProps> = ({ images, cta }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    AutoScroll({ playOnInit: true }),
  ]);

  const [autoplayPlugin, setAutoplayPlugin] = useState<any>(null);

  useEffect(() => {
    if (emblaApi) {
      setAutoplayPlugin(emblaApi.plugins().autoScroll);
    }
  }, [emblaApi]);

  const onPointerUp = useCallback(() => {
    if (autoplayPlugin) {
      autoplayPlugin.stop();
      setTimeout(() => {
        autoplayPlugin.play();
      }, 1000);
    }
  }, [autoplayPlugin]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("pointerUp", onPointerUp);

      return () => {
        emblaApi.off("pointerUp", onPointerUp);
      };
    }
  }, [emblaApi, onPointerUp]);

  // Use useShuffleArray hook here, directly passing the array
  const shuffledImages = useShuffleArray(images);

  if (!shuffledImages.length) return null;

  return (
    <FlexDiv
      flex={{ direction: "column", x: "center" }}
      width100
      padding={{ vertical: [4, 5, 5, 6] }}
      customStyle={{ zIndex: 1 }}
    >
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {shuffledImages.map(
            (image, index) =>
              image?.image && (
                <div className={styles.embla__slide} key={index}>
                  <SanityImage
                    image={image?.image}
                    alt={image?.alt}
                    figureclassname={cn(styles.image)}
                    quality={100}
                  />
                </div>
              )
          )}
        </div>
      </div>
      {cta && (
        <Button variant="black" path={cta?.link} target="_blank">
          {cta?.text}
        </Button>
      )}
    </FlexDiv>
  );
};
