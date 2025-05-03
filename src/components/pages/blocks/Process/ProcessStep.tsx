import React from "react";
import styles from "./Process.module.scss";
import cn from "classnames";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";

import { IProcessStep } from "@/data.d";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";

interface ProcessStepProps extends IProcessStep {
  number: number;
}

/**
 * ProcessStep - Renders an individual process step with number, title, description, and optional SVG
 */
export const ProcessStep = React.forwardRef<HTMLDivElement, ProcessStepProps>(
  ({ title, desc, titleFR, descFR, number }, ref) => {
    const locale = useLocale() as LangType;
    return (
      <FlexDiv
        flex={{ y: "flex-start" }}
        gapArray={[4, 5, 5, 6]}
        ref={ref} // Forward the ref to the root element
        className={cn(styles.slide)}
      >
        {/* Step number circle */}
        <FlexDiv className={cn(styles.number)}>
          <Heading
            font="Outfit"
            level="2"
            as="span"
            color="yellow"
            weight={900}
          >
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
            {locale === "fr" && titleFR ? titleFR : title}
          </Heading>
          <PortableTextContent
            level="regular"
            value={locale === "fr" && descFR ? descFR : desc}
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
