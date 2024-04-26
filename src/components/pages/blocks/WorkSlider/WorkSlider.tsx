import React, { PropsWithChildren } from "react";
import styles from "./WorkSlider.module.scss";

import { Splider, SpliderProps } from "../../containers/Splider";
import FlexDiv from "../../../reuse/FlexDiv";
import { IWork, IWorkBlock, LocalPaths } from "../../../../data.d";
import { useAtom } from "jotai";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";
import { getTranslations } from "../../../../helpers/langUtils";

export const WorkSlider: React.FC<PropsWithChildren<IWorkBlock>> = ({
  works,
}) => {
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

  const slides: SpliderProps[] = works!?.map(
    (work: IWork): SpliderProps => {
      return {
        customImages: work?.customImages,
        content: {
          title: work.title,
          desc: work.desc,
          primaryCta: {
            text: translations.buttons.view,
            link: `/${lang}${LocalPaths.ABOUT}/${work.slug.current}`,
          },
          seconadryCta: work.primaryLink,
        },
      };
    }
  );
  return (
    <FlexDiv
      flex={{ direction: "column" }}
      width100
      className={styles.block}
      as="article"
    >
      <Splider slides={slides} arrows />
    </FlexDiv>
  );
};
