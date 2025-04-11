"use client";
import { FC, useRef } from "react";

import FlexDiv from "@/components/reuse/FlexDiv";
import styles from "./ProcessAndQuote.module.scss";
import cn from "classnames";

import { IFrameVideo, IProcessStep, ServiceType } from "@/data.d";
import { Block } from "../containers/Block";
import { WoodForm } from "./WoodForm";
import { ProcessVideo } from "@/components/services/Process/Process";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ProcessStep } from "@/components/services/Process/ProcessStep";
import { useWindowResize } from "@/helpers/useWindowResize";
import { DigitalForm } from "../DigitalPage/DigitalForm";
import { FormTitleProps } from "@/components/reuse/Form/Form";

interface ProcessAndQuoteProps extends FormTitleProps {
  processes: IProcessStep[];
  video: IFrameVideo;
  form: ServiceType;
}

export const ProcessAndQuote: FC<ProcessAndQuoteProps> = ({
  processes,
  title,
  subTitle,
  video,
  form,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobileOrTablet } = useWindowResize();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobileOrTablet ? ["0 0", "1 800px"] : ["-440px 0", "1 1600px"],
  });
  // // const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = containerRef.current?.children[0];
    if (video) {
      const rect = video.getBoundingClientRect();
    }
  });
  const process = (
    <div className={cn(styles.process)}>
      {processes?.map((processStep: IProcessStep, key) => (
        <ProcessStep {...processStep} number={key} key={key} />
      ))}
    </div>
  );

  const forms: { [key in ServiceType]: React.ReactNode } = {
    wood: <WoodForm title={title} subTitle={subTitle} />,
    digital: <DigitalForm title={title} subTitle={subTitle} />,
  };
  return (
    <Block theme="light">
      <FlexDiv
        gapArray={[0, 0, 8, 9]}
        width100
        flex={{ direction: "column", x: "flex-end", y: "flex-start" }}
        className={cn(styles.container)}
        ref={containerRef}
        padding={{ bottom: [9, 10, 0, 0] }}
      >
        <ProcessVideo {...video} containerYProgress={scrollYProgress} />

        <FlexDiv
          gapArray={[8, 9, 10, 11]}
          className={cn(styles.right)}
          flex={{ direction: "column" }}
        >
          {process}
          {!isMobileOrTablet && forms[form]}
        </FlexDiv>
      </FlexDiv>
      {isMobileOrTablet && forms[form]}
    </Block>
  );
};
