import { IntakeClient, IntakeQuestion } from "@/lib/intake/questions";
import { IntakeAnswer, IntakeAnswers } from "@/lib/intake/answers";

const NO_ANSWER = "no answer";

const formatAnswer = (
  question: IntakeQuestion,
  answer: IntakeAnswer | undefined,
): string => {
  if (!answer) return NO_ANSWER;

  switch (question.type) {
    case "short":
    case "long":
      return answer.text?.trim() || NO_ANSWER;

    case "choice": {
      const parts = [answer.choice, answer.other?.trim()].filter(
        (part): part is string => Boolean(part),
      );
      return parts.length ? parts.join(", ") : NO_ANSWER;
    }

    case "multi": {
      const picks = [...(answer.multi ?? [])];
      const other = answer.other?.trim();
      if (other) picks.push(`Something else: ${other}`);
      return picks.length ? picks.join(", ") : NO_ANSWER;
    }

    case "scales":
      return (question.pairs ?? [])
        .map((pair, index) => {
          const value = answer.scales?.[index];
          const shown = typeof value === "number" ? `${value}/5` : "not set";
          return `    ${pair.left} — ${pair.right}: ${shown}`;
        })
        .join("\n");

    default:
      return NO_ANSWER;
  }
};

// Readable plain text: section headings, then each question label followed by
// its answer. Scales get one line per pair. This is the source of truth Seto
// reads in the inbox.
export const formatIntakeText = (
  config: IntakeClient,
  answers: IntakeAnswers,
): string => {
  const lines: string[] = [`Branding questionnaire — ${config.name}`, ""];

  config.sections.forEach((section) => {
    lines.push(`## ${section.title.toUpperCase()}`, "");
    section.questions.forEach((question) => {
      const value = formatAnswer(question, answers[question.id]);
      if (question.type === "scales") {
        lines.push(`${question.label}:`, value, "");
      } else {
        lines.push(`${question.label}`, value, "");
      }
    });
    lines.push("");
  });

  return lines.join("\n").trimEnd();
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export const formatIntakeHtml = (
  config: IntakeClient,
  answers: IntakeAnswers,
): string =>
  `<pre style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(
    formatIntakeText(config, answers),
  )}</pre>`;

export const getIntakeSubject = (config: IntakeClient): string =>
  `Branding questionnaire, ${config.name}`;
