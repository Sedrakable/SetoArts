import { IntakeClient } from "./questions";

// Intro and done screen copy, verbatim from the build plan with the client name
// and counts injected. Kept out of the questions config so it is shared across
// every client without repetition.
export const getIntroCopy = (client: IntakeClient) => ({
  title: `Let's build ${client.name}.`,
  paragraphs: [
    "Before I draw anything, I need to know how you think about your own business. Your answers turn directly into the mood boards, the logo, and the way the brand talks.",
    "There are no wrong answers here, and half-formed ones are still useful. Write like you're texting me.",
  ],
  facts: [
    { label: "Time", value: `About ${client.minutes} minutes` },
    {
      label: "Saving",
      value: "Automatic. Close the tab and come back whenever.",
    },
    {
      label: "Sections",
      value: `${client.sections.length}, and you can go back`,
    },
  ],
});

export const doneCopy = {
  title: "Got it.",
  paragraphs: [
    "Your answers are in. I'll read through them and come back if anything needs a follow-up call. Next thing you'll see from me is mood boards.",
  ],
};
