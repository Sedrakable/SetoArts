"use client";
import React from "react";
import styles from "./WorkSlider.module.scss";

import FlexDiv from "../../../reuse/FlexDiv";
import { IWork, LocalPaths } from "../../../../data.d";
import { getTranslations } from "../../../../helpers/langUtils";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import {
  ProjectSlider,
  ProjectSliderProps,
} from "../../containers/ProjectSlider";

export const WorkSlider: React.FC<{ works: IWork[] }> = ({ works }) => {
  console.log("works", works);
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const slides: ProjectSliderProps[] = works?.map(
    (work: IWork): ProjectSliderProps => {
      return {
        thumbnailImage: work?.thumbnailImage,
        content: {
          title: work.title,
          desc: locale === "fr" ? work.descFR : work.descEN,
          primaryCta: {
            text: translations.buttons.viewMyWork,
            path: `/${locale}${LocalPaths.ABOUT}`,
          },
          seconadryCta: {
            text: translations.buttons.view,
            path: work.link,
          },
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
