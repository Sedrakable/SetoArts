import React, { FC } from "react";
import { Form } from "./contact page/Form";
import { Block } from "./containers/Block";
import { IForm } from "../../data";
import { SEO } from "../SEO";

export interface ContactPageProps {
  title: string;
  form: IForm;
}

export const ContactPage: FC<ContactPageProps> = (props) => {
  return (
    props && (
      <>
        <SEO
          title={props.title}
          description={
            props.form?.desc.part1 +
            " " +
            props.form?.desc.part2 +
            " " +
            props.form?.desc.part3
          }
          imgUrl="https://i.imgur.com/u9EH6vH.png"
          url="https://www.setoxarts.com/en/home"
        />
        <Block variant="dark" strokes title={props?.title}>
          <Form {...props?.form} />
        </Block>
      </>
    )
  );
};
