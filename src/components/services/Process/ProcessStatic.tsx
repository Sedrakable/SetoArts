// ProcessStatic.tsx
import React from "react";
import styles from "./Process.module.scss";
import { IProcessStep } from "@/data.d";
import FlexDiv from "@/components/reuse/FlexDiv";
import { useWindowResize } from "@/helpers/useWindowResize";

import Analysis from "@/assets/vector/Analysis.svg";
import Developer from "@/assets/vector/Developer.svg";
import Draw from "@/assets/vector/Draw.svg";
import { ProcessStep } from "./ProcessStep";

const svgArray: any[] = [
  <Analysis className={styles.one} key="one" />,
  <Developer className={styles.two} key="two" />,
  <Draw className={styles.three} key="three" />,
];

interface ProcessStaticProps {
  processSteps: IProcessStep[];
}

/**
 * ProcessStatic - Static (non-carousel) view of process steps
 */
export const ProcessStatic: React.FC<ProcessStaticProps> = ({
  processSteps,
}) => {
  const { isMobile, isMobileOrTablet } = useWindowResize();

  return (
    <>
      <FlexDiv
        gapArray={[7]}
        flex={{ direction: "column", y: "flex-start" }}
        width100
        className={styles.processes}
        as="ol"
      >
        {processSteps?.map((processStep: IProcessStep, key) => (
          <React.Fragment key={processStep.title || key}>
            {/* Insert SVGs between steps on mobile */}
            {key % 2 === 1 && isMobile && <li>{svgArray[(key - 1) / 2]}</li>}
            <ProcessStep {...processStep} number={key} />
          </React.Fragment>
        ))}
      </FlexDiv>

      {/* Show SVGs on side for non-mobile/tablet */}
      {!isMobileOrTablet && (
        <div className={styles.svgs}>
          {processSteps?.map((_process: IProcessStep, key) => (
            <React.Fragment key={key}>
              {key % 2 !== 0 && svgArray[(key - 1) / 2]}
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};
