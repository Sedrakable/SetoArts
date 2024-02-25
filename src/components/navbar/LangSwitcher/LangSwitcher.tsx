import React from "react";
import styles from "./LangSwitcher.module.scss";
import FlexDiv from "../../reuse/FlexDiv";
import { ICta } from "../../../data";
import { Paragraph } from "../../reuse/Paragraph";
import { atom, useAtom } from "jotai";
import { Icon } from "../../reuse/Icon";

export interface DropDownProps {
  parentPath: string;
  dropdown: ICta[];
}

export const langData = atom<LangType>("en");

export const Langs = ["en", "fr"] as const;

export type LangType = typeof Langs[number];

export const LangSwitcher: React.FC = () => {
  const [lang, setLang] = useAtom(langData);
  return (
    <FlexDiv
      gapArray={[2]}
      className={styles.langWrapper}
      onClick={() => setLang(lang === "en" ? "fr" : "en")}
    >
      <Paragraph level="big" color="yellow">
        {lang.toUpperCase()}
      </Paragraph>
      <Icon icon="internet" size="regular" />
    </FlexDiv>
  );
};
