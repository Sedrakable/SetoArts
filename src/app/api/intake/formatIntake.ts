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

// Brand palette, inlined because email clients don't support external CSS.
const C = {
  text: "#1C1814",
  amber: "#F5B912",
  accent: "#A87700",
  paper: "#FCFBF8",
  hairline: "#E5DFD2",
  muted: "#6E6355",
  faint: "#B9B2A6",
  pillBg: "#FCF3D6",
};

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const noAnswerHtml = `<span style="color:${C.faint};font-style:italic">no answer</span>`;

const pill = (label: string) =>
  `<span style="display:inline-block;background:${C.pillBg};color:${C.accent};border:1px solid ${C.amber};border-radius:999px;padding:3px 11px;margin:0 6px 6px 0;font-size:13px;line-height:1.2">${escapeHtml(
    label,
  )}</span>`;

const scaleRow = (left: string, right: string, value: number | undefined) => {
  const dots = [1, 2, 3, 4, 5]
    .map((dot) => {
      const on = typeof value === "number" && dot <= value;
      return `<span style="display:inline-block;width:11px;height:11px;border-radius:50%;margin:0 3px;background:${
        on ? C.amber : "transparent"
      };border:1px solid ${on ? C.amber : C.hairline};vertical-align:middle"></span>`;
    })
    .join("");

  return `<tr>
    <td style="padding:6px 10px 6px 0;font-size:14px;color:${C.text};white-space:nowrap">${escapeHtml(
      left,
    )}</td>
    <td style="padding:6px 0;text-align:center">${dots}</td>
    <td style="padding:6px 0 6px 10px;font-size:14px;color:${C.text};white-space:nowrap;text-align:right">${escapeHtml(
      right,
    )}</td>
  </tr>`;
};

const answerHtml = (
  question: IntakeQuestion,
  answer: IntakeAnswer | undefined,
): string => {
  const base = `font-size:15px;color:${C.text};line-height:1.5`;

  switch (question.type) {
    case "short":
    case "long": {
      const text = answer?.text?.trim();
      if (!text) return noAnswerHtml;
      return `<div style="${base};white-space:pre-wrap">${escapeHtml(text)}</div>`;
    }

    case "choice": {
      const parts = [answer?.choice, answer?.other?.trim()].filter(
        (part): part is string => Boolean(part),
      );
      return parts.length
        ? `<div style="${base}">${escapeHtml(parts.join(", "))}</div>`
        : noAnswerHtml;
    }

    case "multi": {
      const picks = [...(answer?.multi ?? [])];
      const other = answer?.other?.trim();
      if (!picks.length && !other) return noAnswerHtml;
      return `<div>${picks.map(pill).join("")}${
        other ? pill(`Something else: ${other}`) : ""
      }</div>`;
    }

    case "scales": {
      const rows = (question.pairs ?? [])
        .map((pair, index) => scaleRow(pair.left, pair.right, answer?.scales?.[index]))
        .join("");
      return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${rows}</table>`;
    }

    default:
      return noAnswerHtml;
  }
};

export const formatIntakeHtml = (
  config: IntakeClient,
  answers: IntakeAnswers,
): string => {
  const sections = config.sections
    .map((section) => {
      const questions = section.questions
        .map(
          (question) => `<tr><td style="padding:14px 0;border-bottom:1px solid ${C.hairline}">
            <div style="font-size:13px;color:${C.muted};margin-bottom:5px">${escapeHtml(
              question.label,
            )}</div>
            ${answerHtml(question, answers[question.id])}
          </td></tr>`,
        )
        .join("");

      return `<div style="margin-top:30px">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.text};padding-bottom:8px;border-bottom:2px solid ${C.amber}">${escapeHtml(
          section.title,
        )}</div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${questions}</table>
      </div>`;
    })
    .join("");

  return `<div style="background:#EFEBE1;padding:24px 12px;font-family:${FONT}">
    <div style="max-width:640px;margin:0 auto;background:${C.paper};border:1px solid ${C.hairline};border-radius:14px;overflow:hidden">
      <div style="padding:24px 28px;background:${C.text}">
        <div style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${C.amber};margin-bottom:4px">Branding questionnaire</div>
        <div style="font-size:22px;font-weight:700;color:${C.paper}">${escapeHtml(
          config.name,
        )}</div>
      </div>
      <div style="padding:4px 28px 30px">${sections}</div>
    </div>
  </div>`;
};

export const getIntakeSubject = (config: IntakeClient): string =>
  `Branding questionnaire, ${config.name}`;
