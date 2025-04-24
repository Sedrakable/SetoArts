import React, { PropsWithChildren, FC, ReactNode } from "react";

import styles from "./Form.module.scss";
import { Button } from "@/components/reuse/Button/Button";
import FlexDiv from "../FlexDiv";
import { Heading } from "../Text/Heading/Heading";
import { Alert } from "../Alert/Alert";
import { useWindowResize } from "@/helpers/useWindowResize";
import { StepProps } from "./formTypes";
import { Paragraph } from "../Text/Paragraph/Paragraph";
import { Translations } from "@/langs/langTypes";
import { LocalPaths } from "@/data.d";
import { LangType } from "@/i18n/request";

export interface FormTitleProps {
  title: string;
  subTitle?: string;
  alignText?: "left" | "center";
}
export const FormTitles: FC<FormTitleProps> = ({
  title,
  subTitle,
  alignText = "center",
}) => {
  return (
    <FlexDiv
      width100
      flex={{
        direction: "column",
        x: alignText == "center" ? "center" : "flex-start",
      }}
      className={styles.formTitles}
    >
      <Heading
        font="Outfit"
        as="h3"
        level="4"
        color="black"
        weight={700}
        textAlign={alignText}
      >
        {title}
      </Heading>
      {subTitle && (
        <Paragraph
          level="regular"
          color="black"
          weight={300}
          textAlign={alignText}
        >
          {subTitle}
        </Paragraph>
      )}
    </FlexDiv>
  );
};
export const Step: FC<PropsWithChildren<StepProps>> = ({
  children,
  number,
}) => {
  return (
    <FlexDiv
      gapArray={[3, 3, 3, 4]}
      flex={{ y: "flex-start" }}
      width100
      className={styles.step}
    >
      {number && (
        <Heading
          font="Cursive"
          as="h4"
          level="4"
          color="black"
          weight={400}
          className={styles.number}
        >
          {number.toString()}
        </Heading>
      )}
      <FlexDiv
        gapArray={[3, 4]}
        flex={{ direction: "column" }}
        className={styles.stepContent}
      >
        {children}
      </FlexDiv>
    </FlexDiv>
  );
};

export const MultiColumn: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FlexDiv gapArray={[3, 3, 3, 4]} width100 wrap>
      {children}
    </FlexDiv>
  );
};

export const FormSubmitButton: FC<{
  isValid: boolean;
  submitText: string | false;
  translations: Translations;
  loading: boolean;
  title: string;
}> = ({ isValid, translations, submitText, loading = true, title }) => {
  const { isMobile } = useWindowResize();

  return (
    <FlexDiv className={styles.submitWrapper} gapArray={[2]}>
      <Button type="submit" variant="black">
        {title}
      </Button>
      {!isValid && (
        <Alert arrow={isMobile ? "bottom" : "left"}>
          {translations.form.general.requiredAlert}
        </Alert>
      )}
      {submitText && (
        <Alert arrow={isMobile ? "bottom" : "left"}>{submitText}</Alert>
      )}
      {loading && <div className={styles.spinner} />}
    </FlexDiv>
  );
};

export const FormSteps: FC<{
  steps: ReactNode[];
  stepNumbers?: boolean;
}> = ({ steps, stepNumbers = false }) => {
  return (
    <FlexDiv
      gapArray={[5]}
      width100
      flex={{ direction: "column", x: "stretch", y: "flex-start" }}
    >
      {steps.map((step, index) => (
        <Step key={index} number={stepNumbers ? index + 1 : undefined}>
          {step}
        </Step>
      ))}
    </FlexDiv>
  );
};

export const FormSubmitMessage: FC<{
  locale: LangType;
  translations: Translations;
}> = ({ locale, translations }) => {
  return (
    <FlexDiv flex={{ direction: "column" }} gapArray={[3, 3, 3, 4]}>
      <Heading
        font="Cursive"
        as="h3"
        level="2"
        color="yellow"
        weight={500}
        textAlign="center"
      >
        {translations.form.general.emailSent}
      </Heading>
      <Button variant="black" path={`/${locale}${LocalPaths.HOME}`}>
        {translations.nav.home}
      </Button>
    </FlexDiv>
  );
};
