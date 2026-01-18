import React, { PropsWithChildren } from "react";
import styles from "./FancyTitle.module.scss";

import FlexDiv from "../FlexDiv";
import { Heading } from "../Text/Heading/Heading";
import { FancyText } from "../Text/FancyText/FancyText";
import Line from "@/assets/vector/Line.svg";

export interface FancyTitleProps {
  subTitle?: string;
  title: FancyText;
  line?: boolean;
}
export const FancyTitle: React.FC<PropsWithChildren<FancyTitleProps>> = ({
  subTitle,
  title,
  line = true,
}) => {
  return (
    <FlexDiv
      className={styles.title}
      flex={{ direction: "column", x: "center", y: "center" }}
      gapArray={[1, 2, 2, 3]}
    >
      {subTitle && (
        <Heading
          font="Cursive"
          as="h4"
          level="4"
          textAlign="center"
          color="light-grey"
          weight={400}
          capitalise={false}
        >
          {subTitle}
        </Heading>
      )}
      <FancyText
        font="Outfit"
        level="3"
        as="h2"
        color="black"
        textAlign="center"
        weight={400}
        paddingBottomArray={[0, 2, 2, 3]}
        value={title}
      />
      {line && <Line className={styles.line} />}
    </FlexDiv>
  );
};
