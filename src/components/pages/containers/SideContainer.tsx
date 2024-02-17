import React from "react";
import styles from "./SideContainer.module.scss";
import cn from "classnames";
import { Heading } from "../../reuse/Heading";
import { Paragraph } from "../../reuse/Paragraph";
import { Button } from "../../reuse/Button";
import { Link } from "../../reuse/Link";
import { FlexDiv } from "../../reuse/FlexDiv";
import { ICta } from "../../../data";

export interface SideContainerProps {
  title: string;
  desc: string;
  cta?: ICta;
}

export const SideContainer: React.FC<SideContainerProps> = ({
  title,
  desc,
  cta,
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
        {cta &&
          (cta?.link ? (
            <Link href={cta?.link} target="_blank">
              <Button variant="fancy">{cta?.text!}</Button>
            </Link>
          ) : (
            <Button variant="fancy" path={cta?.link}>
              {cta?.text!}
            </Button>
          ))}
      </FlexDiv>
    </div>
  );
};
