// Process.tsx
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Process.module.scss";
import cn from "classnames";
import FlexDiv from "@/components/reuse/FlexDiv";
import { LangType } from "@/i18n/request";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";
import { Block } from "@/components/pages/containers/Block";
import { IFrameVideo, IProcessStep } from "@/data.d";
import { ProcessStep } from "./ProcessStep";
import {
  MotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";

export interface ProcessProps {
  processSteps: IProcessStep[];
  side: "left" | "right";
  video: ProcessVideoProps;
}

/**
 * Process - Main component for displaying process steps with either video/3D or static images
 */
export const Process: React.FC<ProcessProps> = ({
  processSteps,
  side = "left",
  video,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Block
      title={{
        children: translations.titles.process,
        font: "Cursive",
        color: "yellow",
      }}
      theme="light"
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
        <div
          className={cn(styles.process, {
            [styles.right]: side === "right",
          })}
        >
          {processSteps?.map((processStep: IProcessStep, key) => (
            <ProcessStep {...processStep} number={key} key={key} />
          ))}
        </div>

        {/* YouTube video iframe */}
        <ProcessVideo {...video} />
      </FlexDiv>
    </Block>
  );
};

export interface ProcessVideoProps extends IFrameVideo {
  containerYProgress: MotionValue<number>;
}

export const ProcessVideo: React.FC<ProcessVideoProps> = ({
  format,
  folder,
  firstIndex,
  lastIndex,
  containerYProgress,
}) => {
  const [visibleIndex, setVisibleIndex] = useState(firstIndex);

  // Create array of image paths
  const imagePaths = useMemo(() => {
    const paths: string[] = [];
    for (let i = firstIndex; i <= lastIndex; i++) {
      if (i === lastIndex) {
        paths.push(`/videos/${folder}/final.png`);
      } else {
        paths.push(
          `/videos/${folder}/${i.toString().padStart(4, "0")}.${format}`
        );
      }
    }
    return paths;
  }, [folder, format, firstIndex, lastIndex]);

  // Preload images
  useEffect(() => {
    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  }, [imagePaths]);

  // Smooth the scroll progress with softer spring
  const smoothFrame = useSpring(containerYProgress, {
    stiffness: 100, // Lowered for smoother, less snappy response
    damping: 20, // Reduced for less resistance, more fluid motion
    mass: 0.3, // Lighter mass for quicker reaction
  });

  // Map smoothFrame to frame indices
  const currentFrame = useTransform(
    smoothFrame,
    [0, 1],
    [firstIndex, lastIndex],
    { clamp: true }
  );

  // Update visibleIndex with smoother transition
  useMotionValueEvent(currentFrame, "change", (latest) => {
    const progress = containerYProgress.get();
    let newIndex = Math.round(latest);

    // Soft boundary adjustment instead of hard clamp
    if (progress > 0.98 && newIndex >= lastIndex - 1) {
      newIndex = lastIndex; // Gently nudge to lastIndex near the end
    } else if (progress < 0.02) {
      newIndex = firstIndex; // Gently nudge to firstIndex at start
    }

    newIndex = Math.max(firstIndex, Math.min(lastIndex, newIndex));
    setVisibleIndex(newIndex);
  });

  return (
    <div className={cn(styles.video, styles[folder])}>
      {imagePaths.map((path, index) => (
        <img
          key={path}
          src={path}
          alt={`Frame ${index + firstIndex}`}
          className={styles.frame}
          style={{
            opacity: index + firstIndex === visibleIndex ? 1 : 0,
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
