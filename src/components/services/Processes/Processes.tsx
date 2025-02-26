"use client";
import React from "react";
import styles from "./Processes.module.scss";

import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { IProcessStep } from "@/data.d";
import { useWindowResize } from "@/helpers/useWindowResize";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";
import { Block } from "@/components/pages/containers/Block";

import Analysis from "@/assets/vector/Analysis.svg";
import Developer from "@/assets/vector/Developer.svg";
import Draw from "@/assets/vector/Draw.svg";
import { PortableTextContent } from "@/components/reuse/Paragraph/PortableTextContent";

interface ProcessStepProps extends IProcessStep {
  number: number;
}

const svgArray: any[] = [
  <Analysis className={styles.one} key="one" />,
  <Developer className={styles.two} key="two" />,
  <Draw className={styles.three} key="three" />,
];

const ProcessStep: React.FC<ProcessStepProps> = ({ title, desc, number }) => {
  const { isTablet } = useWindowResize();
  return (
    <FlexDiv
      className={styles.container}
      flex={{ y: "flex-start" }}
      gapArray={[4, 5, 5, 6]}
      as="li"
    >
      <FlexDiv className={styles.number}>
        <Heading font="Outfit" level="2" as="h4" color="yellow">
          {(number + 1).toString()}
        </Heading>
      </FlexDiv>
      <FlexDiv
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        width100
        // padding={{ all: [4], bottom: [5] }}
        gapArray={[2]}
      >
        <Heading
          font="Outfit"
          level="3"
          as="h3"
          color="black"
          weight={900}
          className={styles.title}
        >
          {title}
        </Heading>
        <PortableTextContent
          level="regular"
          value={desc}
          color="black"
          weight={400}
        />
      </FlexDiv>
      {number % 2 === 0 && isTablet && svgArray[number / 2]}
    </FlexDiv>
  );
};

export interface ProcessProps {
  processSteps: IProcessStep[];
  side: "left" | "right";
  media: "images" | "video-3D";
}
export const Process: React.FC<ProcessProps> = ({
  processSteps,
  side = "left",
  media,
}) => {
  const { isMobile, isMobileOrTablet } = useWindowResize();
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <Block title={translations.blockTitles.process} variant="light">
      <FlexDiv
        gapArray={[0, 0, 5, 7]}
        width100
        className={styles.wrapper}
        flex={{
          direction: side === "left" ? "row" : "row-reverse",
          y: "stretch",
        }}
      >
        <FlexDiv
          gapArray={[7]}
          flex={{ direction: "column", y: "flex-start" }}
          width100
          className={styles.processes}
          as="ol"
        >
          {processSteps?.map((processStep: IProcessStep, key) => {
            return (
              <React.Fragment key={process.title}>
                {key % 2 === 1 && isMobile && (
                  <li>{svgArray[(key - 1) / 2]}</li>
                )}
                <ProcessStep {...processStep} number={key} />
              </React.Fragment>
            );
          })}
        </FlexDiv>
        {!isMobileOrTablet && (
          <div className={styles.svgs}>
            {processSteps?.map((_process: IProcessStep, key) => {
              return <>{key % 2 !== 0 && svgArray[(key - 1) / 2]}</>;
            })}
          </div>
        )}
      </FlexDiv>
    </Block>
  );
};
