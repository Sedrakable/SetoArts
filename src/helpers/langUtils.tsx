import { LangType } from "../components/navbar/LangSwitcher/LangSwitcher";
import { enTranslations } from "../langs/en";
import { frTranslations } from "../langs/fr";
import { Translations } from "../langs/langTypes";

export const getTranslations = (lang: LangType): Translations => {
  return lang === "en" ? enTranslations : frTranslations;
};
