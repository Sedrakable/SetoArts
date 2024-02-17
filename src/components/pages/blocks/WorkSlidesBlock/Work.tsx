import React, { PropsWithChildren } from "react";
import styles from "./Work.module.scss";

import { Splider, SpliderProps } from "../../containers/Splider";
import { FlexDiv } from "../../../reuse/FlexDiv";
import { IWork } from "../../../../data";

export const tabTexts: string[] = ["home", "services", "about + work"];

export const Work: React.FC<PropsWithChildren<IWork>> = ({ works }) => {
  const slides: SpliderProps[] = works!.map((work) => {
    return {
      customImage: {
        image: work.customImage.image,
        alt: work.customImage.alt,
      },
      content: {
        title: work.title,
        desc: work.desc,
        cta: work.cta,
      },
    };
  });

  return (
    <FlexDiv flex={{ direction: "column" }} width100 className={styles.block}>
      <Splider slides={slides} arrows />
    </FlexDiv>
  );
};
