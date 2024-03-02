import React, { PropsWithChildren } from "react";
import styles from "./Work.module.scss";

import { Splider, SpliderProps } from "../../containers/Splider";
import FlexDiv from "../../../reuse/FlexDiv";
import { IWork, IWorkBlock, LocalPaths } from "../../../../data.d";
import { useAtom } from "jotai";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";
import { getTranslations } from "../../../../helpers/langUtils";

export const Work: React.FC<PropsWithChildren<IWorkBlock>> = ({ works }) => {
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

  const slides: SpliderProps[] = works!?.map(
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
            text: translations.buttons.view,
            link: `${LocalPaths.WORK}/${work.slug.current}`,
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