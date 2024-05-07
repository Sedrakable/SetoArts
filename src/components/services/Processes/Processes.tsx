"use client";
import React from "react";
import styles from "./Processes.module.scss";

import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { Paragraph } from "@/components/reuse/Paragraph";
import { Tag } from "@/components/reuse/Tag";
import { IProcess, IFeature, IProcesses } from "@/data.d";
import { useWindowResize } from "@/helpers/useWindowResize";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";
import { Block } from "@/components/pages/containers/Block";

import Analysis from "@/assets/vector/Analysis.svg";
import Developer from "@/assets/vector/Developer.svg";
import Draw from "@/assets/vector/Draw.svg";

interface IProcessProps extends IProcess {
  number: number;
}

const svgArray: any[] = [
  <Analysis className={styles.one} key="one" />,
  <Developer className={styles.two} key="two" />,
  <Draw className={styles.three} key="three" />,
];

const Process: React.FC<IProcessProps> = ({
  title,
  desc,
  features,
  number,
}) => {
  const { isTablet } = useWindowResize();
  return (
    <FlexDiv
      className={styles.container}
      flex={{ y: "flex-start" }}
      gapArray={[4, 5, 5, 6]}
      as="li"
    >
      <FlexDiv className={styles.number}>
        <Heading font="Seto" level="2" as="h2" color="yellow">
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
          font="Seto"
          level="3"
          as="h3"
          color="black"
          className={styles.title}
        >
          {title}
        </Heading>
        <Paragraph level="small" color="black">
          {desc}
        </Paragraph>
        <FlexDiv className={styles.tags} flex={{ x: "flex-start" }} wrap>
          {features?.map((feature: IFeature) => {
            return (
              <Tag chosen key={feature.title}>
                {feature.title}
              </Tag>
            );
          })}
        </FlexDiv>
      </FlexDiv>
      {number % 2 === 0 && isTablet && svgArray[number / 2]}
    </FlexDiv>
  );
};

export const Processes: React.FC<IProcesses> = ({ processes }) => {
  const { isMobile, isMobileOrTablet } = useWindowResize();
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <Block title={translations.blockTitles.process} variant="fabric-hori">
      <FlexDiv
        gapArray={[0, 0, 5, 7]}
        width100
        className={styles.wrapper}
        flex={{ y: "stretch" }}
      >
        <FlexDiv
          gapArray={[7]}
          flex={{ direction: "column", y: "flex-start" }}
          width100
          className={styles.processes}
          as="ol"
        >
          {processes?.map((process: IProcess, key) => {
            return (
              <React.Fragment key={process.title}>
                <li>{key % 2 === 1 && isMobile && svgArray[(key - 1) / 2]}</li>
                <Process {...process} number={key} />
              </React.Fragment>
            );
          })}
        </FlexDiv>
        {!isMobileOrTablet && (
          <div className={styles.svgs}>
            {processes?.map((_process: IProcess, key) => {
              return <>{key % 2 !== 0 && svgArray[(key - 1) / 2]}</>;
            })}
          </div>
        )}
      </FlexDiv>
    </Block>
  );
};
