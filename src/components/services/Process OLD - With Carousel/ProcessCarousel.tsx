import React from "react";
import styles from "./Process.module.scss";
import cn from "classnames";
import { IProcessStep } from "@/data.d";
import { ProcessStep } from "./ProcessStep";

interface ProcessCarouselProps {
  processSteps: IProcessStep[];
  side: "left" | "right";
  isProcessActive: boolean;
  emblaRef: (node: HTMLElement | null) => void; // Accept Embla reference
}

export const ProcessCarousel: React.FC<ProcessCarouselProps> = ({
  processSteps,
  side,
  isProcessActive,
  emblaRef,
}) => {
  return (
    <section
      className={cn(styles.embla, { [styles.active]: isProcessActive })}
      ref={emblaRef}
    >
      <div
        className={cn(styles.embla__container, styles.processes, {
          [styles.right]: side === "right",
        })}
      >
        {processSteps?.map((processStep: IProcessStep, key) => (
          <ProcessStep {...processStep} number={key} key={key} />
        ))}
      </div>
    </section>
  );
};
