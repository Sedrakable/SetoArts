import React from "react";
import styles from "./Process.module.scss";
import cn from "classnames";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { PortableTextContent } from "@/components/reuse/Paragraph/PortableTextContent";
import { useWindowResize } from "@/helpers/useWindowResize";

// Import SVG components
import Analysis from "@/assets/vector/Analysis.svg";
import Developer from "@/assets/vector/Developer.svg";
import Draw from "@/assets/vector/Draw.svg";
import { IProcessStep } from "@/data.d";

// Array of SVG components to be used for illustrations
const svgArray = [
  <Analysis className={styles.one} key="one" />,
  <Developer className={styles.two} key="two" />,
  <Draw className={styles.three} key="three" />,
];

interface ProcessStepProps extends IProcessStep {
  number: number;
}

/**
 * ProcessStep - Renders an individual process step with number, title, description, and optional SVG
 */
export const ProcessStep = React.forwardRef<HTMLDivElement, ProcessStepProps>(
  ({ title, desc, number }, ref) => {
    const { isTablet } = useWindowResize();

    return (
      <FlexDiv
        className={cn(styles.slide)}
        flex={{ y: "flex-start" }}
        gapArray={[4, 5, 5, 6]}
        as="li"
        ref={ref} // Forward the ref to the root element
      >
        {/* Step number circle */}
        <FlexDiv className={cn(styles.number)}>
          <Heading font="Outfit" level="2" as="h4" color="yellow" weight={900}>
            {(number + 1).toString()}
          </Heading>
        </FlexDiv>

        {/* Step content */}
        <FlexDiv
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
          width100
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

        {/* Display SVG illustration for even numbered steps on tablet view */}
        {number % 2 === 0 && isTablet && svgArray[number / 2]}
      </FlexDiv>
    );
  }
);

// Set a display name for the component for better debugging in React DevTools
ProcessStep.displayName = "ProcessStep";
