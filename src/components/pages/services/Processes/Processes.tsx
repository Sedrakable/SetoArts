import React from "react";
import styles from "./Processes.module.scss";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { Block } from "../../containers/Block";
import { IFeature, IProcess, IProcesses } from "../../../../data";
import { Paragraph } from "../../../reuse/Paragraph";
import { Tag } from "../../../reuse/Tag";
import { ReactComponent as Analysis } from "../../../../assets/illu/Analysis.svg";
import { ReactComponent as Developer } from "../../../../assets/illu/Developer.svg";
import { ReactComponent as Draw } from "../../../../assets/illu/Draw.svg";
import { useWindowResize } from "../../../../helpers/useWindowResize";
import { useAtom } from "jotai";
import { getTranslations } from "../../../../helpers/langUtils";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";

interface IProcessProps extends IProcess {
  number: number;
}

const svgArray = [
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
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

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
              <>
                {key % 2 === 1 && isMobile && svgArray[(key - 1) / 2]}
                <Process {...process} number={key} key={process.title} />
              </>
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
