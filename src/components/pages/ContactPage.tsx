import React, { FC } from "react";
import { Form } from "./contact page/Form";
import { Block } from "./containers/Block";
import { IForm } from "../../data";

export interface ContactPageProps {
  title: string;
  form: IForm;
}

export const ContactPage: FC<ContactPageProps> = (props) => {
  return (
    props && (
      <Block variant="dark" strokes title={props?.title}>
        <Form {...props?.form} />
      </Block>
    )
  );
};
