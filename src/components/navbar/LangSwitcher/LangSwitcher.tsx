import React, { useEffect } from "react";
import styles from "./LangSwitcher.module.scss";
import FlexDiv from "../../reuse/FlexDiv";
import { ICta } from "../../../data";
import { Paragraph } from "../../reuse/Paragraph";
import { atom, useAtom } from "jotai";
import { Icon } from "../../reuse/Icon";
import { useNavigate } from "react-router-dom";

export interface DropDownProps {
  parentPath: string;
  dropdown: ICta[];
}

export const langData = atom<LangType>("en");

export const Langs = ["en", "fr"] as const;

export type LangType = typeof Langs[number];

export const LangSwitcher: React.FC = () => {
  const [lang, setLang] = useAtom(langData);
  const navigate = useNavigate();

  const onClick = () => {
    const newLang: LangType = lang === "en" ? "fr" : "en";
    const currentPath = window.location.pathname;
    const newLangPath = currentPath.replace(/\/(en|fr)\//, `/${newLang}/`);
    if (newLangPath !== currentPath) {
      navigate(newLangPath);
      setLang(newLang);
    }
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const langFromUrl = currentPath.split("/")[1] as LangType | null;
    if (langFromUrl && Object.values(Langs).includes(langFromUrl)) {
      setLang(langFromUrl);
    }
  }, [setLang]);

  return (
    <FlexDiv
      gapArray={[2]}
      className={styles.langWrapper}
      onClick={() => onClick()}
    >
      <Paragraph level="big" color="yellow">
        {lang.toUpperCase()}
      </Paragraph>
      <Icon icon="internet" size="regular" />
    </FlexDiv>
  );
};
