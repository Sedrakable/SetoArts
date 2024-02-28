import React from "react";
import styles from "./SideContainer.module.scss";
import cn from "classnames";
import { Heading } from "../../reuse/Heading";
import { Paragraph } from "../../reuse/Paragraph";
import { Button } from "../../reuse/Button";
import { Link } from "../../reuse/Link";
import FlexDiv from "../../reuse/FlexDiv";
import { ICta } from "../../../data";

export interface SideContainerProps {
  title: string;
  desc: string;
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
        >
          <Heading font="Seto" as="h2" level="2">
            {title}
          </Heading>

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
            <Button variant="primary" path={primaryCta?.link}>
              {primaryCta?.text!}
            </Button>
          )}
          {seconadryCta && (
            <Button
              variant="secondary"
              href={seconadryCta?.link!}
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
