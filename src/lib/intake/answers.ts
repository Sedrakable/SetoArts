import {
  IntakeClient,
  IntakeQuestion,
  isQuestionRequired,
} from "./questions";

// One answer per question, keyed by question id. The shape is loose on purpose
// so a single record covers every question type; the type decides which fields
// are meaningful.
export interface IntakeAnswer {
  // short / long
  text?: string;
  // choice — the selected option
  choice?: string;
  // multi — the selected options
  multi?: string[];
  // choice / multi with `other` — the "something else" text
  other?: string;
  // scales — value 1..5 per pair index
  scales?: Record<number, number>;
}

export type IntakeAnswers = Record<string, IntakeAnswer>;

export const emptyAnswer: IntakeAnswer = {};

// Whether a single question has enough to count as answered. Shared by the
// client (to gate Continue) and the server (to never trust the client).
export const isQuestionAnswered = (
  question: IntakeQuestion,
  answer: IntakeAnswer | undefined,
): boolean => {
  if (!answer) return false;

  switch (question.type) {
    case "short":
    case "long":
      return Boolean(answer.text?.trim());
    case "choice":
      return Boolean(answer.choice) || Boolean(answer.other?.trim());
    case "multi":
      return (
        (answer.multi?.length ?? 0) > 0 || Boolean(answer.other?.trim())
      );
    case "scales":
      return (question.pairs ?? []).every(
        (_, index) => typeof answer.scales?.[index] === "number",
      );
    default:
      return false;
  }
};

// Ids of every required question in a section that is still unanswered, in the
// order they appear. The first entry is the one to highlight and scroll to.
export const getUnansweredRequiredIds = (
  questions: readonly IntakeQuestion[],
  answers: IntakeAnswers,
): string[] =>
  questions
    .filter(
      (question) =>
        isQuestionRequired(question) &&
        !isQuestionAnswered(question, answers[question.id]),
    )
    .map((question) => question.id);

// Server-side completeness check across the whole questionnaire.
export const getMissingRequiredIds = (
  client: IntakeClient,
  answers: IntakeAnswers,
): string[] =>
  client.sections.flatMap((section) =>
    getUnansweredRequiredIds(section.questions, answers),
  );
