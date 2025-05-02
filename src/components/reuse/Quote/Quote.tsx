import React from "react";
import styles from "./Quote.module.scss";
import cn from "classnames";
import { Heading } from "../Text/Heading/Heading";
import FlexDiv from "../FlexDiv";
import X from "@/assets/vector/X.svg";
import { IQuote } from "../../../data.d";

export const Quote: React.FC<IQuote> = ({ leftText, rightText }) => {
  return (
    <FlexDiv className={cn(styles.quote)} flex={{ x: "flex-start" }}>
      <FlexDiv
        className={styles.left}
        flex={{ x: "flex-end" }}
        height100
        padding={{ right: [4, 6, 6, 7] }}
      >
        <Heading font="Outfit" as="h2" level="3">
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
        <Heading font="Cursive" as="h2" level="3" color="yellow">
          {rightText}
        </Heading>
      </FlexDiv>
    </FlexDiv>
  );
};
