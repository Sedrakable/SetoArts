// Hardcoded client intake questionnaires. One entry per client slug, edited by
// hand a few times a year and deployed. Deliberately NOT in Sanity — a form
// builder is its own project. If branding ever becomes a product line, move it
// then. Content is transcribed verbatim from the branding intake build plan.

export type IntakeQuestionType =
  | "short"
  | "long"
  | "choice"
  | "multi"
  | "scales";

export interface IntakeScalePair {
  left: string;
  right: string;
}

export interface IntakeQuestion {
  id: string;
  type: IntakeQuestionType;
  label: string;
  help?: string;
  // Defaults to true. Only set false to make a question optional.
  required?: boolean;
  // choice / multi
  options?: readonly string[];
  // choice / multi — render a free-text "something else" field.
  other?: boolean;
  // scales — one bipolar row per pair.
  pairs?: readonly IntakeScalePair[];
}

export interface IntakeSection {
  title: string;
  blurb?: string;
  questions: readonly IntakeQuestion[];
}

export interface IntakeClient {
  name: string;
  // Rough fill time shown on the intro screen.
  minutes: number;
  sections: readonly IntakeSection[];
}

// A question is required unless it explicitly opts out.
export const isQuestionRequired = (question: IntakeQuestion): boolean =>
  question.required !== false;

export const CLIENTS: Record<string, IntakeClient> = {
  "avenir-chez-vous": {
    name: "Avenir Chez Vous",
    minutes: 15,
    sections: [
      {
        title: "The business",
        blurb: "What you actually do, and what the logo has to survive.",
        questions: [
          {
            id: "name",
            type: "short",
            label: "Your business name",
            help: "Exactly as it should appear, accents included.",
          },
          {
            id: "whatyoudo",
            type: "long",
            label: "What do you do, and for who?",
            help:
              "Take as much room as you need. Plain words beat a polished pitch.",
          },
          {
            id: "services",
            type: "long",
            label: "What are your services?",
            help:
              "List them out. If one matters more than the rest, say so. If two or three are equally important, say that too.",
          },
          // {
          //   id: "placements",
          //   type: "multi",
          //   other: true,
          //   label: "Where does the logo need to live?",
          //   help: "Pick everything you can think of. Missing one now means redrawing it later.",
          //   options: [
          //     "Shirts",
          //     "Vehicle",
          //     "Business cards",
          //     "Signage",
          //     "Website",
          //     "Social media",
          //     "Uniforms",
          //     "Print and flyers",
          //   ],
          // },
        ],
      },
      {
        title: "The customer",
        blurb:
          "The person who finds you and pays you is usually not the person receiving the care. Answer for the one who picks up the phone.",
        questions: [
          {
            id: "custAge",
            type: "multi",
            label: "How old are they?",
            help: "Pick every range that fits.",
            options: [
              "Under 35",
              "35 to 44",
              "45 to 54",
              "55 to 64",
              "65 and up",
            ],
          },
          {
            id: "custGender",
            type: "choice",
            label: "Mostly women, mostly men, or an even split?",
            options: [
              "Mostly women",
              "Mostly men",
              "Even split",
              "Not sure yet",
            ],
          },
          {
            id: "custRelation",
            type: "multi",
            label: "Who are they to the person getting care?",
            options: [
              "Daughter",
              "Son",
              "Spouse or partner",
              "Another family member",
              "The person themselves",
              "Not sure yet",
            ],
          },
          {
            id: "custLanguage",
            type: "choice",
            label: "What language do they speak at home?",
            options: [
              "Mostly French",
              "Mostly English",
              "Both about evenly",
              "Not sure yet",
            ],
          },
          {
            id: "custWork",
            type: "short",
            label: "What do they do for work?",
            help:
              "Rough is fine. Teachers, nurses, office jobs, whatever you picture.",
          },
          {
            id: "custWhere",
            type: "short",
            label: "Where do they live?",
            help:
              "Neighborhoods, cities, or just how far you're willing to travel.",
          },
          {
            id: "moment",
            type: "long",
            label:
              "What is going on in their life the week they decide to call?",
          },
          {
            id: "trust",
            type: "long",
            label:
              "What do they need to hear before they trust you with their parent?",
          },
          {
            id: "custKids",
            type: "long",
            required: false,
            label:
              "If the childcare side is a different kind of customer, who are they?",
            help: "Skip it if it's the same people.",
          },
        ],
      },
      {
        title: "Positioning",
        blurb: "Where you sit next to everyone else doing this.",
        questions: [
          {
            id: "whyyou",
            type: "long",
            label:
              "A family is comparing you to Amika and Bien Chez Soi. Why do they pick you?",
          },
          {
            id: "others",
            type: "long",
            required: false,
            label: "Any other competitors besides those two?",
            help: "Links if you have them.",
          },
        ],
      },
      {
        title: "Personality and style",
        blurb:
          "This section does the most work. The mood boards come straight out of it.",
        questions: [
          {
            id: "scales",
            type: "scales",
            label: "Mark where the brand sits on each",
            pairs: [
              { left: "Warm", right: "Professional" },
              { left: "Modern", right: "Timeless" },
              { left: "Playful", right: "Serious" },
              { left: "Soft", right: "Bold" },
              { left: "Personal", right: "Corporate" },
              { left: "Accessible", right: "Premium" },
            ],
          },
          {
            id: "fivewords",
            type: "short",
            label: "Five words you want families using about you",
          },
          {
            id: "loves",
            type: "long",
            label: "Three brands whose look you love, and why",
            help: "Any industry. They do not have to be care companies.",
          },
          {
            id: "hates",
            type: "long",
            label: "What you hate",
            help:
              "Styles, symbols, colors, anything. Be specific. This question saves more time than any other one here.",
          },
          {
            id: "colors",
            type: "long",
            label: "Colors you want, and colors that are off the table",
          },
          // {
          //   id: "photos",
          //   type: "choice",
          //   label: "Will any client or caregiver let you photograph them?",
          //   help:
          //     "If not, I build the brand on illustration and type instead. Either works, I just need to know now rather than in week three.",
          //   options: ["Yes", "No", "Not sure yet"],
          // },
        ],
      },
    ],
  },
};

export const getIntakeClient = (slug: string): IntakeClient | undefined =>
  CLIENTS[slug];
