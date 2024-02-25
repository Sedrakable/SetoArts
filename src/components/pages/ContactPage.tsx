import React from "react";
import { Form } from "./contact page/Form";
import { Block } from "./containers/Block";
import { IForm } from "../../data";
import { useAtom } from "jotai";
import { langData } from "../navbar/LangSwitcher/LangSwitcher";
import { useFetchPage } from "../../api/useFetchPage";

// const socials: string = require("../../../assets/photos/Steampunk/Thumbnail/Instagram.png");

export interface ContactPageProps {
  title: string;
  form: IForm;
}

export const ContactPage = () => {
  const [lang] = useAtom(langData);
  const contactQuery = `*[_type == 'contactPage' && lang == '${lang}'][0] {
    title,
    form->,
  }`;
  const contactPageData: ContactPageProps = useFetchPage(contactQuery)!;
  return (
    contactPageData && (
      <Block variant="dark" strokes title={contactPageData?.title}>
        <Form {...contactPageData?.form} />
      </Block>
    )
  );
};
