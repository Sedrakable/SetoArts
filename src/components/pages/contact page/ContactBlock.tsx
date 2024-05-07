"use client";
import { Block } from "@/components/pages/containers/Block";
import { IForm } from "@/data.d";
import { Form } from "./Form";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";

export const ContactBlock: React.FC<IForm> = ({ desc }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  return (
    <Block variant="dark" strokes title={translations.blockTitles.contact}>
      <Form desc={desc} />
    </Block>
  );
};
