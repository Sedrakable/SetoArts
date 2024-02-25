import React, { PropsWithChildren } from "react";
import styles from "./Work.module.scss";

import { Splider, SpliderProps } from "../../containers/Splider";
import FlexDiv from "../../../reuse/FlexDiv";
import { IWork, IWorkBlock } from "../../../../data";

export const tabTexts: string[] = ["home", "services", "about + work"];

export const Work: React.FC<PropsWithChildren<IWorkBlock>> = ({ works }) => {
  const slides: SpliderProps[] = works!.map(
    (work: IWork): SpliderProps => {
      return {
        customImage: {
          image: work.thumbnailImage.image,
          alt: work.thumbnailImage.alt,
        },
        content: {
          title: work.title,
          desc: work.desc,
          primaryCta: {
            text: "View",
            link: `/work/${work.slug.current}`,
          },
          seconadryCta: work.primaryLink,
        },
      };
    }
  );

  return (
    <FlexDiv flex={{ direction: "column" }} width100 className={styles.block}>
      <Splider slides={slides} arrows />
    </FlexDiv>
  );
};
