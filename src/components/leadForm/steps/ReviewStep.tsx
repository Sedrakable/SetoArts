import FlexDiv from "@/components/reuse/FlexDiv";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { getLeadFormSummary } from "../leadFormReview";
import { LeadFormData, LeadFormStep } from "../leadFormTypes";
import styles from "../LeadForm.module.scss";
import { IconButton } from "@/components/reuse/IconButton/IconButton";
import { LeadFormTranslationCopy } from "./LeadStepProps";

export const ReviewStep = ({
  formData,
  onEditStep,
  translations,
}: {
  formData: LeadFormData;
  onEditStep: (step: LeadFormStep) => void;
  translations: LeadFormTranslationCopy;
}) => {
  const summary = getLeadFormSummary(formData, translations);

  return (
    <>
      <Paragraph className={styles.copy} color="black" level="regular">
        {translations.steps.review.copy}
      </Paragraph>
      <FlexDiv
        className={styles.summary}
        flex={{ direction: "column", x: "stretch", y: "flex-start" }}
        gapArray={[3]}
        width100
      >
        {summary.map(({ label, step, value }) => (
          <FlexDiv className={styles.summaryItem} key={label} width100>
            <FlexDiv
              flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
              gapArray={[1]}
              width100
            >
              <Paragraph
                as="span"
                className={styles.summaryLabel}
                color="dark-grey"
                level="small"
                weight={600}
              >
                {label}
              </Paragraph>
              <Paragraph
                className={styles.summaryValue}
                color="black"
                level="regular"
              >
                {value || translations.steps.review.notProvided}
              </Paragraph>
            </FlexDiv>
            <IconButton
              aria-label={translations.steps.review.editLabel(label)}
              className={styles.summaryEditButton}
              onClick={() => onEditStep(step)}
              iconProps={{ icon: "pen", size: "small", color: "dark-grey" }}
              type="button"
            />
          </FlexDiv>
        ))}
      </FlexDiv>
    </>
  );
};
