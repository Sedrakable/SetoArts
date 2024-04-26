import React, { FC } from "react";
import { Form } from "./contact page/Form";
import { Block } from "./containers/Block";
import { IFancyText } from "../../data";
import { SEO } from "../SEO";
import { getTranslations } from "../../helpers/langUtils";
import { langData } from "../navbar/LangSwitcher/LangSwitcher";
import { useAtom } from "jotai";

export interface ContactPageProps {
  title: string;
  metaDesc: string;
  desc: IFancyText;
}

export const ContactPage: FC<ContactPageProps> = (props) => {
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);
  return (
    props && (
      <>
        <SEO
          title={props.title}
          description={props.metaDesc}
          imgUrl="https://i.imgur.com/u9EH6vH.png"
          url="https://www.setoxarts.com/en/home"
        />
        <Block variant="dark" strokes title={translations.blockTitles.contact}>
          <Form desc={props.desc} />
        </Block>
      </>
    )
  );
};
