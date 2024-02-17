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
import { FlexDiv } from "../../reuse/FlexDiv";
import { Icon } from "../../reuse/Icon";
import {
  SanityImage,
  SanityImageProps,
} from "../../reuse/SanityImage/SanityImage";
import { IWorkSlide } from "../../../data";
import { useWindowResize } from "../../../helpers/useWindowResize";

export interface SpliderProps {
  customImage: SanityImageProps;
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

          const progressBarWidth = `${(index / slides.length) * 100}%`;
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

  // Adding event listeners outside of useEffect
  useEffect(() => {
    const splideInstance = mainRef.current?.splide;
    prevArrowRef.current?.addEventListener("click", () => {
      if (setSplideProgress) {
        setSplideProgress(splideInstance?.index! - 1);
        return;
      }
      splideInstance?.go("-1");
    });
    nextArrowRef.current?.addEventListener("click", () => {
      if (setSplideProgress) {
        setSplideProgress(splideInstance?.index! + 1);
        return;
      }
      splideInstance?.go("+1");
    });
  }, [mainRef, setSplideProgress]);

  const renderSlides = (text: boolean) => {
    return slides?.map((splider: SpliderProps, key) => {
      return (
        <SplideSlide
          key={key}
          className={cn({ [styles.content]: splider?.content })}
        >
          <SanityImage
            image={splider.customImage.image}
            alt={splider.customImage.alt}
            fit={text && splider.customImage.fit}
          />
          {text && splider?.content && (
            //NEEDS TO BE REPLACED BY ALTUAL CONTENT
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
