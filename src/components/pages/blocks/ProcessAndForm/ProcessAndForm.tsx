"use client";
import { FC, useRef } from "react";

import FlexDiv from "@/components/reuse/FlexDiv";
import styles from "./ProcessAndForm.module.scss";
import cn from "classnames";

import { LangType } from "@/i18n/request";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";

import { IFrameVideo, IProcessStep } from "@/data.d";
import { Block } from "../../containers/Block";
import { ProcessVideo } from "@/components/pages/blocks/Process/Process";
import { useScroll } from "framer-motion";
import { ProcessStep } from "@/components/pages/blocks/Process/ProcessStep";
import { useWindowResize } from "@/helpers/useWindowResize";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import { ContactForm } from "@/components/reuse/Form/ContactForm";

interface ProcessAndFormProps extends FormTitleProps {
  processes: IProcessStep[];
  video: IFrameVideo;
}

export const ProcessAndForm: FC<ProcessAndFormProps> = ({
  processes,
  title,
  subTitle,
  video,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobileOrTablet } = useWindowResize();
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

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

  return (
    <Block
      theme="light"
      className={styles.processBlock}
      fancyTitle={{ title: translations.titles.process }}
    >
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
          {!isMobileOrTablet && (
            <ContactForm title={title} subTitle={subTitle} />
          )}
        </FlexDiv>
      </FlexDiv>
      {isMobileOrTablet && <ContactForm title={title} subTitle={subTitle} />}
    </Block>
  );
};
