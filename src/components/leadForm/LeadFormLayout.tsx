import React, { FormEvent } from "react";
import { Block } from "@/components/pages/containers/Block";
import { Button } from "@/components/reuse/Button/Button";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { leadFormSteps } from "./leadFormTypes";
import styles from "./LeadForm.module.scss";
import { LogoLink } from "../navbar/Navbar/Navbar";
import { LangType } from "@/i18n/request";
import { LeadFormTranslationCopy } from "./steps/LeadStepProps";

interface LeadFormLayoutProps {
  locale: LangType;
  children: React.ReactNode;
  error: string;
  isReview: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (event: FormEvent) => void;
  progress: number;
  question: string;
  showPrimaryAction: boolean;
  stepIndex: number;
  stepLabel: string;
  translations: LeadFormTranslationCopy;
}

export const LeadFormLayout = ({
  locale,
  children,
  error,
  isReview,
  isSubmitting,
  onBack,
  onSubmit,
  progress,
  question,
  showPrimaryAction,
  stepIndex,
  stepLabel,
  translations,
}: LeadFormLayoutProps) => {
  return (
    <Block theme="off-white" contentSize="small" className={styles.leadBlock}>
      <FlexDiv
        className={styles.container}
        flex={{ direction: "column", x: "stretch", y: "flex-start" }}
        gapArray={[5, 5, 6, 6]}
        width100
      >
        <FlexDiv
          flex={{ x: "space-between", y: "flex-end" }}
          gapArray={[4]}
          width100
        >
          <LogoLink locale={locale} />
          <Paragraph color="dark-grey" level="regular" fit="shrink">
            {translations.progress(stepIndex + 1, leadFormSteps.length)}
          </Paragraph>
        </FlexDiv>

        <div
          className={styles.progress}
          aria-label={translations.progressLabel}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        <FlexDiv
          as="form"
          className={styles.form}
          flex={{ direction: "column", x: "stretch", y: "flex-start" }}
          gapArray={[5, 5, 6, 6]}
          onSubmit={onSubmit}
          width100
        >
          <FlexDiv
            flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
            gapArray={[3, 3, 4, 4]}
            width100
          >
            <Heading
              as="span"
              color="dark-grey"
              font="Cursive"
              level="5"
              upperCase={false}
            >
              {stepLabel}
            </Heading>
            <Heading
              as="h1"
              color="black"
              font="Outfit"
              level="2"
              upperCase={false}
              weight={700}
            >
              {question}
            </Heading>
          </FlexDiv>

          {children}

          {error && (
            <Paragraph
              className={styles.error}
              color="error"
              level="regular"
              weight={600}
            >
              {error}
            </Paragraph>
          )}

          <FlexDiv
            flex={{
              direction: "column-reverse",
              x: "space-between",
              y: "flex-start",
            }}
            gapArray={[3]}
            width100
            className={styles.buttons}
          >
            <Button
              onClick={onBack}
              outline
              type="button"
              variant="transparent"
            >
              {translations.actions.back}
            </Button>
            {showPrimaryAction && (
              <Button disabled={isSubmitting} type="submit" variant="black">
                {isReview
                  ? isSubmitting
                    ? translations.actions.submitting
                    : translations.actions.submit
                  : translations.actions.continue}
              </Button>
            )}
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </Block>
  );
};
