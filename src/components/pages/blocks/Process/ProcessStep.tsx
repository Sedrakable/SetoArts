import React from "react";
import styles from "./Process.module.scss";
import cn from "classnames";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";

import { IProcessStep } from "@/data.d";

interface ProcessStepProps extends IProcessStep {
  number: number;
}

/**
 * ProcessStep - Renders an individual process step with number, title, description, and optional SVG
 */
export const ProcessStep = React.forwardRef<HTMLDivElement, ProcessStepProps>(
  ({ title, desc, number }, ref) => {
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
          className={styles.content}
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
      </FlexDiv>
    );
  }
);

// Set a display name for the component for better debugging in React DevTools
ProcessStep.displayName = "ProcessStep";
