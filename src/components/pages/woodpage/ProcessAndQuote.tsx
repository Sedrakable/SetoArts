"use client";
import { FC, useRef } from "react";

import FlexDiv from "@/components/reuse/FlexDiv";
import styles from "./ProcessAndQuote.module.scss";
import cn from "classnames";

import { IProcessStep } from "@/data.d";
import { Block } from "../containers/Block";
import { WoodFormProps, WoodForm } from "./WoodForm";
import { ProcessVideo } from "@/components/services/Process/Process";
import { useScroll } from "framer-motion";
import { ProcessStep } from "@/components/services/Process/ProcessStep";

interface ProcessAndQuoteProps extends WoodFormProps {
  processes: IProcessStep[];
}
export const ProcessAndQuote: FC<ProcessAndQuoteProps> = ({
  processes,
  title,
  subTitle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["100px 0", "1 1000px"],
  });
  return (
    <Block variant="light">
      <FlexDiv
        gapArray={[7, 8, 8, 9]}
        width100
        flex={{ y: "flex-start" }}
        className={cn(styles.container)}
      >
        <ProcessVideo containerYProgress={scrollYProgress} />
        <FlexDiv
          gapArray={[8, 9, 9, 10]}
          className={cn(styles.right)}
          flex={{ direction: "column" }}
        >
          <div className={cn(styles.process)} ref={containerRef}>
            {processes?.map((processStep: IProcessStep, key) => (
              <ProcessStep {...processStep} number={key} key={key} />
            ))}
          </div>
          <WoodForm title={title} subTitle={subTitle} />
        </FlexDiv>
      </FlexDiv>
    </Block>
  );
};
