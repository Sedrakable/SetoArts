import React, { PropsWithChildren } from "react";
import styles from "./Inspired.module.scss";
import { Heading } from "../../../reuse/Heading";
import { FlexDiv } from "../../../reuse/FlexDiv";
import { IInspired } from "../../../../data";
import { Button } from "../../../reuse/Button";
import { Image } from "../../../reuse/Image";
const stroke = require("../../../../assets/photos/BigStroke.png");

export const Inspired: React.FC<PropsWithChildren<IInspired>> = ({
  title,
  cta,
}) => {
  return (
    <FlexDiv
      className={styles.block}
      padding={{ vertical: [6, 7, 7, 8] }}
      width100
    >
      <FlexDiv
        className={styles.wrapper}
        flex={{ direction: "column" }}
        gapArray={[4, 5, 5, 5]}
      >
        <Image src={stroke} alt="stroke" />
        <FlexDiv className={styles.title}>
          <Heading font="Seto" as="h1" level="1">
            {title}
          </Heading>
          <Heading
            font="Cursive"
            as="h1"
            level="1"
            color="yellow"
            className={styles.question}
          >
            ?
          </Heading>
        </FlexDiv>
        <Button variant="fancy">{cta?.text}</Button>
      </FlexDiv>
    </FlexDiv>
  );
};
