import React, { useEffect } from "react";
import styles from "./LangSwitcher.module.scss";
import FlexDiv from "../../reuse/FlexDiv";
import { Paragraph } from "../../reuse/Paragraph";
import { atom, useAtom } from "jotai";
import { Icon } from "../../reuse/Icon";
import { useNavigate } from "react-router-dom";

export const langData = atom<LangType>("en");

export const Langs = ["en", "fr"] as const;

export type LangType = typeof Langs[number];

export const LangSwitcher: React.FC<{ onClick?: Function }> = ({ onClick }) => {
  const [lang, setLang] = useAtom(langData);
  const navigate = useNavigate();

  const langClick = () => {
    const newLang: LangType = lang === "en" ? "fr" : "en";
    const currentPath = window.location.pathname;
    const newLangPath = currentPath.replace(/\/(en|fr)\//, `/${newLang}/`);
    if (newLangPath !== currentPath) {
      navigate(newLangPath);
      setLang(newLang);
    }
    onClick && onClick();
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
      onClick={() => langClick()}
    >
      <Paragraph level="big" color="yellow">
        {lang.toUpperCase()}
      </Paragraph>
      <Icon icon="internet" size="regular" />
    </FlexDiv>
  );
};
