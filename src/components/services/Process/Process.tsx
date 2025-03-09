// Process.tsx
"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./Process.module.scss";
import cn from "classnames";
import FlexDiv from "@/components/reuse/FlexDiv";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";
import { Block } from "@/components/pages/containers/Block";
import { EmblaOptionsType } from "embla-carousel";
import { ProcessStatic } from "./ProcessStatic";
import { IProcessStep } from "@/data.d";
import { ProcessStep } from "./ProcessStep";
import {
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest);
  });
  // // Observe steps and auto-scroll when a step enters the viewport (starting from step 2)
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           const index = stepRefs.current.indexOf(
  //             entry.target as HTMLDivElement
  //           );
  //           if (index >= 1) {
  //             console.log(
  //               `[Process] Step ${index + 1} is visible → Auto-scrolling`
  //             );
  //             entry.target.scrollIntoView({
  //               behavior: "smooth",
  //               block: "center",
  //             });
  //           }
  //         }
  //       });
  //     },
  //     { threshold: 0.2 } // Trigger when 50% of the step is visible
  //   );

  //   stepRefs.current.forEach((step) => {
  //     if (step) observer.observe(step);
  //   });

  //   return () => observer.disconnect();
  // }, []);
  return (
    <Block
      title={{
        children: translations.blockTitles.process,
        font: "Cursive",
        color: "yellow",
      }}
      variant="light"
      ref={containerRef}
    >
      <FlexDiv
        gapArray={[0, 0, 5, 7]}
        width100
        className={styles.wrapper}
        flex={{
          direction: side === "left" ? "row" : "row-reverse",
          y: "flex-start",
        }}
      >
        {media === "video-3D" ? (
          // Video/3D view with carousel
          <>
            <div
              className={cn(styles.process, {
                [styles.right]: side === "right",
              })}
            >
              {processSteps?.map((processStep: IProcessStep, key) => (
                <ProcessStep
                  {...processStep}
                  number={key}
                  key={key}

                  // ref={(el) => {
                  //   stepRefs.current[key] = el;
                  // }}
                />
              ))}
            </div>

            {/* YouTube video iframe */}
            <ProcessVideo containerYProgress={scrollYProgress} />
          </>
        ) : (
          // Static view with SVGs
          <ProcessStatic processSteps={processSteps} />
        )}
      </FlexDiv>
    </Block>
  );
};

const ProcessVideo: React.FC<{ containerYProgress: MotionValue<number> }> = ({
  containerYProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const imageLastIndex = 200;

  // Create array of image paths
  const imagePaths = useMemo(() => {
    const paths: string[] = [];
    for (let i = 0; i <= imageLastIndex; i++) {
      paths.push(
        `/videos/coin/Coin Animation.png0${i.toString().padStart(3, "0")}.png`
      );
    }
    return paths;
  }, []);

  // Calculate current frame based on scroll position
  const currentFrame = useTransform(
    containerYProgress,
    [0, 1],
    [0, imageLastIndex]
  );

  useMotionValueEvent(currentFrame, "change", (latest) => {
    setVisibleIndex(Math.round(latest));
  });

  return (
    <div className={styles.video} ref={containerRef}>
      {imagePaths.map((path, index) => (
        <img
          key={path}
          src={path}
          alt={`Frame ${index}`}
          className={styles.frame}
          style={{
            opacity: index === visibleIndex ? 1 : 0,
            position: index === 0 ? "relative" : "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ))}
    </div>
  );
};
