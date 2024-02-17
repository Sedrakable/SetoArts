import React from "react";
import styles from "./Quote.module.scss";
import { Heading } from "./Heading";
import { FlexDiv } from "./FlexDiv";
import { ReactComponent as X } from "../../assets/illu/X.svg";
import { IQuote } from "../../data";

export const Quote: React.FC<IQuote> = ({ leftText, rightText }) => {
  return (
    <FlexDiv className={styles.quote}>
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
