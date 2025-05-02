"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

import styles from "./Carousel.module.scss";
import cn from "classnames";

import { LocalPaths, LocalTargets } from "@/data.d";

import { useShuffleArray } from "@/helpers/useShuffleArray";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import { getTranslations } from "@/helpers/langUtils";
import { Button } from "@/components/reuse/Button/Button";
import FlexDiv from "@/components/reuse/FlexDiv";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

interface ICarouselProps {
  images: ICustomImage[];
}

export const Carousel: FC<ICarouselProps> = ({ images }) => {
  const locale = useLocale() as LangType;
  const translate = getTranslations(locale);

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
      padding={{ top: [2, 3, 5, 6], bottom: [7, 7, 7, 8] }}
      customStyle={{ zIndex: 4 }}
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
                    quality={80}
                    sizes={["90vw", 280, 340, 400]}
                  />
                </div>
              )
          )}
        </div>
      </div>

      <FlexDiv
        flex={{ x: "center", direction: "column" }}
        width100
        padding={{ horizontal: [6, 0] }}
        gapArray={[3, 3, 3, 4]}
        className={styles.buttons}
      >
        <Button
          variant="primary"
          path={`/${locale}${LocalPaths.ABOUT}${LocalTargets.WORK}`}
          target="_blank"
        >
          {translate.buttons.viewMyWork}
        </Button>
        <Button
          variant="black"
          path={"https://www.instagram.com/seto.arts"}
          target="_blank"
        >
          {translate.buttons.viewInstagram}
        </Button>
      </FlexDiv>
    </FlexDiv>
  );
};
