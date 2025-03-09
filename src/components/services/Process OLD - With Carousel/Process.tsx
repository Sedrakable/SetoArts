// Process.tsx
"use client";
import React, { useRef } from "react";
import styles from "./Process.module.scss";
import cn from "classnames";
import FlexDiv from "@/components/reuse/FlexDiv";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";
import { Block } from "@/components/pages/containers/Block";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { ProcessStatic } from "./ProcessStatic";
import { IProcessStep } from "@/data.d";
import { useProcessScroll } from "./useProcessScroll";
import { ProcessCarousel } from "./ProcessCarousel";

// Embla carousel configuration
const CAROUSEL_OPTIONS: EmblaOptionsType = {
  axis: "y",
};

export interface ProcessProps {
  processSteps: IProcessStep[];
  side: "left" | "right";
  media: "images" | "video-3D";
}

/**
 * Process - Main component for displaying process steps with either video/3D or static images
 */
export const Process: React.FC<ProcessProps> = ({
  processSteps,
  side = "left",
  media,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const processRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(CAROUSEL_OPTIONS);

  // Use custom hook for scroll behavior
  const { isLocked } = useProcessScroll(processRef, emblaApi);

  return (
    <Block
      title={translations.blockTitles.process}
      variant="light"
      ref={processRef}
      className={cn({ [styles.processActive]: isLocked })}
    >
      <FlexDiv
        gapArray={[0, 0, 5, 7]}
        width100
        className={styles.wrapper}
        flex={{
          direction: side === "left" ? "row" : "row-reverse",
          y: "stretch",
        }}
      >
        {media === "video-3D" ? (
          // Video/3D view with carousel
          <>
            <ProcessCarousel
              processSteps={processSteps}
              side={side}
              isProcessActive={isLocked}
              emblaRef={emblaRef}
            />

            {/* YouTube video iframe */}
            <div className={styles.video}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/2m6BqV2zKuU?controls=0&autoplay=1&loop=1&playlist=2m6BqV2zKuU"
                title="YouTube video player"
                frameBorder="0"
              ></iframe>
            </div>
          </>
        ) : (
          // Static view with SVGs
          <ProcessStatic processSteps={processSteps} />
        )}
      </FlexDiv>
    </Block>
  );
};
