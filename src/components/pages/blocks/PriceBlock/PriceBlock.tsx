import React from "react";
import styles from "./PriceBlock.module.scss";
import FlexDiv from "../../../reuse/FlexDiv";
import { useAtom } from "jotai";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";
import { getTranslations } from "../../../../helpers/langUtils";
import { FancyText } from "../../../reuse/FancyText";

export const PriceBlock: React.FC<{ price: string }> = ({ price }) => {
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

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
