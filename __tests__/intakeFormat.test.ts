import { writeFileSync } from "fs";
import { getIntakeClient } from "@/lib/intake/questions";
import { IntakeAnswers } from "@/lib/intake/answers";
import {
  formatIntakeHtml,
  formatIntakeText,
} from "@/app/api/intake/formatIntake";

describe("intake email formatting", () => {
  const config = getIntakeClient("avenir-chez-vous")!;
  const answers: IntakeAnswers = {
    name: { text: "Avenir Chez Vous" },
    whatyoudo: {
      text: "Home care for seniors — companionship, personal care, and light housekeeping so families can keep a parent at home.",
    },
    services: { text: "Companionship, personal care, childcare" },
    custAge: { multi: ["45 to 54", "55 to 64"] },
    custGender: { choice: "Mostly women" },
    custRelation: { multi: ["Daughter", "Son", "Another family member"] },
    custLanguage: { choice: "Mostly French" },
    custWork: { text: "Nurses, teachers, office jobs" },
    custWhere: { text: "West Island, up to 40 min away" },
    moment: {
      text: "A parent had a fall and can't be left alone anymore.\nThe family is scrambling.",
    },
    scales: { scales: { 0: 4, 1: 2, 2: 3, 3: 5, 4: 1 } },
    fivewords: { text: "Warm, trusted, calm, local, dependable" },
  };

  it("plain text: headings, answers, scales, 'no answer'", () => {
    const text = formatIntakeText(config, answers);
    expect(text).toContain("## THE BUSINESS");
    expect(text).toContain("Warm — Professional: 4/5");
    expect(text).toContain("no answer");
  });

  it("html: writes a styled preview to the scratchpad", () => {
    const html = formatIntakeHtml(config, answers);
    expect(html).toContain("Avenir Chez Vous");
    expect(html).toContain("<table");
    writeFileSync(
      "C:/Users/Seto/AppData/Local/Temp/claude/C--Users-Seto-SetoArts/840c9b75-c2fa-4602-b88b-d4674b36fffc/scratchpad/intake-email.html",
      `<!doctype html><html><body style="margin:0">${html}</body></html>`,
    );
  });
});
