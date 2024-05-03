import React from "react";
import styles from "./PriceBlock.module.scss";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import { getTranslations } from "@/helpers/langUtils";
import FlexDiv from "@/components/reuse/FlexDiv";
import { FancyText } from "@/components/reuse/FancyText";

export const PriceBlock: React.FC<{ price: string }> = ({ price }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <FlexDiv padding={{ vertical: [2] }} width100 className={styles.wrapper}>
      <FancyText
        part1={translations.other.startAt}
        part2={price}
        part3="CAD"
        mode="paragraph"
      />
    </FlexDiv>
  );
};
