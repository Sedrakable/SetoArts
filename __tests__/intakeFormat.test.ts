import { getIntakeClient } from "@/lib/intake/questions";
import { IntakeAnswers } from "@/lib/intake/answers";
import { formatIntakeText } from "@/app/api/intake/formatIntake";

describe("intake email formatting", () => {
  it("renders section headings, all answers, scales, and 'no answer'", () => {
    const config = getIntakeClient("avenir-chez-vous")!;
    const answers: IntakeAnswers = {
      name: { text: "Avenir Chez Vous" },
      placements: { multi: ["Signage", "Website"], other: "Fridge magnets" },
      custGender: { choice: "Mostly women" },
      scales: { scales: { 0: 4, 1: 2 } },
      // custKids/others intentionally left blank (optional)
    };

    const text = formatIntakeText(config, answers);
    console.log("\n----- EMAIL BODY -----\n" + text + "\n----------------------\n");

    expect(text).toContain("## THE BUSINESS");
    expect(text).toContain("Avenir Chez Vous");
    expect(text).toContain("Signage, Website, Something else: Fridge magnets");
    expect(text).toContain("Warm — Professional: 4/5");
    expect(text).toContain("Modern — Timeless: 2/5");
    expect(text).toContain("Playful — Serious: not set");
    // an untouched optional/required question prints "no answer"
    expect(text).toContain("no answer");
  });
});
