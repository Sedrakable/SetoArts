import React, { useEffect, useRef } from "react";
import {
  Options,
  Splide,
  SplideSlide,
  SplideTrack,
} from "@splidejs/react-splide";
import styles from "./Splider.module.scss";
import "@splidejs/react-splide/css/skyblue";

import { SideContainer, SideContainerProps } from "./SideContainer";
import cn from "classnames";
import FlexDiv from "../../reuse/FlexDiv";
import { Icon } from "../../reuse/Icon";
import { SanityImage } from "../../reuse/SanityImage/SanityImage";
import { useWindowResize } from "../../../helpers/useWindowResize";
import { ICustomImage } from "../../../data";

export interface SpliderProps {
  customImages: ICustomImage[];
  content?: SideContainerProps;
}

export interface SpliderContainerProps {
  slides: SpliderProps[];
  arrows?: boolean;
  splideProgress?: number;
  setSplideProgress?: (progress: number) => void;
}

export const Splider: React.FC<SpliderContainerProps> = ({
  slides,
  arrows = false,
  splideProgress,
  setSplideProgress,
}) => {
  const { isMobileOrTablet } = useWindowResize();
  const mainRef = useRef<Splide>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const prevArrowRef = useRef<HTMLDivElement>(null);
  const nextArrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      const splideInstance = mainRef.current.splide;

      if (splideInstance) {
        splideInstance.on("move", (index) => {
          if (setSplideProgress) {
            setSplideProgress(index);
          }
          const progressBarWidth = `${((index + 1) / slides.length) * 100}%`;
          progressBarRef.current!.style.width = progressBarWidth;
        });
      }
    }
  }, [setSplideProgress, slides, progressBarRef]);

  useEffect(() => {
    if (mainRef.current && splideProgress !== undefined) {
      const splideInstance = mainRef.current.splide;

      if (splideInstance) {
        splideInstance.go(splideProgress);
      }
    }
  }, [splideProgress]);

  useEffect(() => {
    if (mainRef.current) {
      const splideInstance = mainRef.current.splide;

      const handleDragStart = () => {
        // Hide the arrow elements when dragging starts.
        if (prevArrowRef.current && nextArrowRef.current) {
          prevArrowRef.current.style.opacity = "0%";
          nextArrowRef.current.style.opacity = "0%";
        }
      };

      const handleDragEnd = () => {
        // Restore the visibility of the arrow elements when dragging ends.
        if (prevArrowRef.current && nextArrowRef.current) {
          prevArrowRef.current.style.opacity = "100%";
          nextArrowRef.current.style.opacity = "100%";
        }
      };

      if (!splideInstance) return;
      splideInstance.on("drag", handleDragStart);
      splideInstance.on("dragged", handleDragEnd); // Listen for the "dragged" event, which occurs when dragging ends.

      return () => {
        splideInstance.off("drag");
        splideInstance.off("dragged");
      };
    }
  }, [mainRef]);

  useEffect(() => {
    const splideInstance = mainRef.current?.splide;
    const prevArrowElement = prevArrowRef.current;
    const nextArrowElement = nextArrowRef.current;

    const handlePrevArrowClick = () => {
      if (setSplideProgress) {
        setSplideProgress(splideInstance?.index! - 1);
      } else {
        splideInstance?.go("-1");
      }
    };

    const handleNextArrowClick = () => {
      if (setSplideProgress) {
        setSplideProgress(splideInstance?.index! + 1);
      } else {
        splideInstance?.go("+1");
      }
    };

    prevArrowElement?.addEventListener("click", handlePrevArrowClick);
    nextArrowElement?.addEventListener("click", handleNextArrowClick);

    return () => {
      prevArrowElement?.removeEventListener("click", handlePrevArrowClick);
      nextArrowElement?.removeEventListener("click", handleNextArrowClick);
    };
  }, [mainRef, prevArrowRef, nextArrowRef, setSplideProgress]);

  const renderSlides = (text: boolean) => {
    return slides?.map((splider: SpliderProps, key) => {
      return (
        <SplideSlide
          key={key}
          className={cn({ [styles.content]: splider?.content })}
        >
          {!isMobileOrTablet && text && splider?.content && (
            <SideContainer {...splider.content} />
          )}
          {splider?.customImages &&
            (splider?.customImages?.length > 1 ? (
              <div className={styles.imgGridWrapper}>
                <div className={styles.imgGrid}>
                  {/* Duplicate images if there are less than 9 */}
                  {[...Array(Math.max(9, splider.customImages.length))].map(
                    (_, index) => {
                      const imageIndex = index % splider.customImages.length; // Ensure index does not exceed the length of customImages
                      const image = splider.customImages[imageIndex];
                      return (
                        <SanityImage
                          visible
                          key={index}
                          image={image.image}
                          alt={image.alt}
                        />
                      );
                    }
                  )}
                </div>
              </div>
            ) : (
              <SanityImage
                image={splider?.customImages[0].image}
                alt={splider?.customImages[0].alt}
              />
            ))}
          {isMobileOrTablet && text && splider?.content && (
            <SideContainer {...splider.content} />
          )}
        </SplideSlide>
      );
    });
  };

  const mainOptions: Options = {
    type: "loop",
    autoplay: true,
    pagination: false,
    pauseOnHover: true,
    resetProgress: false,
    interval: 5000,
    arrows: false,
  };

  return (
    <div className={cn(styles.wrapper)}>
      <Splide
        className={styles.container}
        options={mainOptions}
        hasTrack={false}
        ref={mainRef}
      >
        <SplideTrack className={styles.track}>{renderSlides(true)}</SplideTrack>
      </Splide>
      <div className={styles.ui}>
        <FlexDiv flex={{ x: "flex-start" }} className={styles.progressBar}>
          <div className={styles.progress} ref={progressBarRef} />
        </FlexDiv>
        {arrows && !isMobileOrTablet && (
          <div className={styles.customArrows}>
            <div ref={prevArrowRef} className={styles.prevArrow}>
              <Icon icon="arrow" rotate={180} size="big" />
            </div>
            <div ref={nextArrowRef} className={styles.nextArrow}>
              <Icon icon="arrow" size="big" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
