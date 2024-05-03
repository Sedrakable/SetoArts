import React from "react";
import styles from "./Quote.module.scss";
import cn from "classnames";
import { Heading } from "./Heading";
import FlexDiv from "./FlexDiv";
import X from "@/assets/vector/X.svg";
import { IQuote } from "../../data.d";
import { VersionType } from "./Hero/Hero";

interface QuoteProps extends IQuote {
  version?: VersionType;
}

export const Quote: React.FC<QuoteProps> = ({
  leftText,
  rightText,
  version,
}) => {
  return (
    <FlexDiv
      className={cn(styles.quote, { [styles.v2]: version === 2 })}
      flex={{ x: "flex-start" }}
    >
      <FlexDiv
        className={styles.left}
        flex={{ x: "flex-end" }}
        height100
        padding={{ right: [4, 6, 6, 7] }}
      >
        <Heading font="Seto" as="h3" level="3">
          {leftText}
        </Heading>
        <X className={styles.x} />
      </FlexDiv>

      <FlexDiv
        className={styles.right}
        flex={{ x: "flex-start" }}
        height100
        padding={{ left: [4, 5, 5, 6], right: [1, 8] }}
      >
        <Heading font="Cursive" as="h3" level="3" color="yellow">
          {rightText}
        </Heading>
      </FlexDiv>
    </FlexDiv>
  );
};
