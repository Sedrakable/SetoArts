"use client";
import React, { PropsWithChildren } from "react";
import styles from "./WorkSlider.module.scss";

import { Splider, SpliderProps } from "../../containers/Splider";
import FlexDiv from "../../../reuse/FlexDiv";
import { IWork, IWorkBlock, LocalPaths } from "../../../../data.d";
import { getTranslations } from "../../../../helpers/langUtils";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";

export const WorkSlider: React.FC<PropsWithChildren<IWorkBlock>> = ({
  works,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  const slides: SpliderProps[] = works!?.map(
    (work: IWork): SpliderProps => {
      return {
        customImages: work?.customImages,
        content: {
          title: work.title,
          desc: work.desc,
          primaryCta: {
            text: translations.buttons.view,
            link: `/${locale}${LocalPaths.ABOUT}/${work.slug.current}`,
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
