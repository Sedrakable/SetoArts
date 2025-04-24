"use client";
import { FC, useRef } from "react";

import FlexDiv from "@/components/reuse/FlexDiv";
import styles from "./ProcessAndForm.module.scss";
import cn from "classnames";

import { IFrameVideo, IProcessStep, ServiceType } from "@/data.d";
import { Block } from "../../containers/Block";
import { WoodForm } from "../../../reuse/Form/WoodForm";
import { ProcessVideo } from "@/components/pages/blocks/Process/Process";
import { useScroll } from "framer-motion";
import { ProcessStep } from "@/components/pages/blocks/Process/ProcessStep";
import { useWindowResize } from "@/helpers/useWindowResize";
import { DigitalForm } from "../../../reuse/Form/DigitalForm";
import { FormTitleProps } from "@/components/reuse/Form/Form";

interface ProcessAndFormProps extends FormTitleProps {
  processes: IProcessStep[];
  video: IFrameVideo;
  form: ServiceType;
}

export const ProcessAndForm: FC<ProcessAndFormProps> = ({
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

  const process = (
    <ul className={cn(styles.process)}>
      {processes?.map((processStep: IProcessStep, key) => (
        <ProcessStep {...processStep} number={key} key={key} />
      ))}
    </ul>
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
