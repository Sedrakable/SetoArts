import React from "react";
import cn from "classnames";
import styles from "./Intake.module.scss";
// Reuse the site's input styling verbatim rather than restyling text fields.
import inputStyles from "@/components/reuse/Form/Input/Input.module.scss";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { outfit } from "@/components/reuse/Text/Heading/Heading";
import { ChoiceGroup } from "@/components/reuse/Form/ChoiceGroup/ChoiceGroup";
import { Input } from "@/components/reuse/Form/Input/Input";
import { IntakeQuestion, isQuestionRequired } from "@/lib/intake/questions";
import { IntakeAnswer } from "@/lib/intake/answers";
import { IntakeMultiChoice } from "./IntakeMultiChoice";
import { IntakeScales } from "./IntakeScales";

interface IntakeQuestionFieldProps {
  question: IntakeQuestion;
  answer: IntakeAnswer;
  onChange: (next: IntakeAnswer) => void;
  isInvalid: boolean;
}

export const IntakeQuestionField: React.FC<IntakeQuestionFieldProps> = ({
  question,
  answer,
  onChange,
  isInvalid,
}) => {
  const required = isQuestionRequired(question);

  return (
    <FlexDiv
      id={`q-${question.id}`}
      className={styles.question}
      flex={{ direction: "column", x: "stretch", y: "flex-start" }}
      gapArray={[2]}
      width100
    >
      {/* Label + help, matching InputWrapper's label styling (incl. the * mark). */}
      <Paragraph level="regular" color={isInvalid ? "error" : "black"}>
        {question.label}{" "}
        {required && <span className={styles.required}>*</span>}
      </Paragraph>

      {question.help && (
        <Paragraph
          className={styles.help}
          level="small"
          color="dark-grey"
          weight={400}
          paddingBottomArray={[2]}
        >
          {question.help}
        </Paragraph>
      )}

      <Control
        question={question}
        answer={answer}
        onChange={onChange}
        isInvalid={isInvalid}
      />
    </FlexDiv>
  );
};

const Control: React.FC<IntakeQuestionFieldProps> = ({
  question,
  answer,
  onChange,
  isInvalid,
}) => {
  switch (question.type) {
    case "short":
      return (
        <input
          type="text"
          className={cn(inputStyles.input, outfit.className, {
            [inputStyles.invalid]: isInvalid,
          })}
          value={answer.text ?? ""}
          onChange={(event) => onChange({ ...answer, text: event.target.value })}
        />
      );

    case "long":
      return (
        <textarea
          className={cn(inputStyles.textarea, outfit.className, {
            [inputStyles.invalid]: isInvalid,
          })}
          value={answer.text ?? ""}
          onChange={(event) => onChange({ ...answer, text: event.target.value })}
        />
      );

    case "choice":
      return (
        <>
          <ChoiceGroup
            options={question.options ?? []}
            value={answer.choice ?? ""}
            onChange={(value) => onChange({ ...answer, choice: value })}
            isInvalid={isInvalid}
          />
          {question.other && <OtherField answer={answer} onChange={onChange} />}
        </>
      );

    case "multi":
      return (
        <>
          <IntakeMultiChoice
            options={question.options ?? []}
            values={answer.multi ?? []}
            onToggle={(value) => {
              const current = answer.multi ?? [];
              const next = current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value];
              onChange({ ...answer, multi: next });
            }}
            isInvalid={isInvalid}
          />
          {question.other && <OtherField answer={answer} onChange={onChange} />}
        </>
      );

    case "scales":
      return (
        <IntakeScales
          questionId={question.id}
          pairs={question.pairs ?? []}
          values={answer.scales ?? {}}
          onChange={(pairIndex, value) =>
            onChange({
              ...answer,
              scales: { ...(answer.scales ?? {}), [pairIndex]: value },
            })
          }
          isInvalid={isInvalid}
        />
      );

    default:
      return null;
  }
};

// Reuses the shared Input component so the "something else" field is styled and
// spaced exactly like every other text field on the site.
const OtherField: React.FC<{
  answer: IntakeAnswer;
  onChange: (next: IntakeAnswer) => void;
}> = ({ answer, onChange }) => (
  <FlexDiv className={styles.otherField} width100>
    <Input
      label="Something else"
      type="text"
      value={answer.other ?? ""}
      onChange={(value) => onChange({ ...answer, other: value.toString() })}
    />
  </FlexDiv>
);
