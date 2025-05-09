import React from "react";
import styles from "./SideContainer.module.scss";
import cn from "classnames";
import { Heading } from "../../reuse/Text/Heading/Heading";
import { Paragraph } from "../../reuse/Text/Paragraph/Paragraph";
import { Button } from "../../reuse/Button/Button";
import FlexDiv from "../../reuse/FlexDiv";
import { ICta } from "../../../data.d";

export interface SideContainerProps {
  title?: string;
  desc?: string;
  primaryCta?: ICta;
  seconadryCta?: ICta;
}

export const SideContainer: React.FC<SideContainerProps> = ({
  title,
  desc,
  primaryCta,
  seconadryCta,
}) => {
  return (
    <div className={cn(styles.wrapper)}>
      <FlexDiv
        className={styles.container}
        flex={{ direction: "column", x: "flex-start" }}
        width100
        gapArray={[4]}
        padding={{ top: [6, 7], bottom: [7, 8] }}
      >
        <FlexDiv
          flex={{ direction: "column", x: "flex-start" }}
          className={styles.text}
          gapArray={[2, 3]}
          as="header"
        >
          {title && (
            <Heading font="Cursive" as="h3" level="4" color="yellow">
              {title}
            </Heading>
          )}

          <Paragraph
            level="regular"
            color="white"
            className={styles.description}
          >
            {desc}
          </Paragraph>
        </FlexDiv>
        <FlexDiv gapArray={[4]} wrap width100 flex={{ x: "flex-start" }}>
          {primaryCta && (
            <Button variant="primary" path={primaryCta?.path}>
              {primaryCta?.text!}
            </Button>
          )}
          {seconadryCta && (
            <Button
              variant="primary"
              href={seconadryCta?.path!}
              target="_blank"
            >
              {seconadryCta?.text!}
            </Button>
          )}
        </FlexDiv>
      </FlexDiv>
    </div>
  );
};
