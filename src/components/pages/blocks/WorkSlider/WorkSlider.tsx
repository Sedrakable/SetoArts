"use client";
import React, { PropsWithChildren } from "react";
import styles from "./WorkSlider.module.scss";

import FlexDiv from "../../../reuse/FlexDiv";
import { IWork, IWorkBlock, LocalPaths } from "../../../../data.d";
import { getTranslations } from "../../../../helpers/langUtils";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import {
  ProjectSlider,
  ProjectSliderProps,
} from "../../containers/ProjectSlider";

export const WorkSlider: React.FC<PropsWithChildren<IWorkBlock>> = ({
  works,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const slides: ProjectSliderProps[] = works!?.map(
    (work: IWork): ProjectSliderProps => {
      return {
        customImages: work?.customImages,
        thumbnailImage: work?.thumbnailImage,
        content: {
          title: work.title,
          desc: work.desc,
          primaryCta: {
            text: translations.buttons.view,
            path: `/${locale}${LocalPaths.ABOUT}/${work.slug.current}`,
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
      <ProjectSlider slides={slides} />
    </FlexDiv>
  );
};
