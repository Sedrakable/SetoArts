// src/langs/langTypes.d.ts
interface Titles {
  services: string;
  whatYouGet: string;
  questionTitle1: string;
  questionTitle2: string;
  questionTitle3: string;
  realTitle1: string;
  realTitle2: string;
  process: string;
  quote: string;
  explore: string;
}

interface Buttons {
  submit: string;
  workWithMe: string;
  contact: string;
  send: string;
  getQuote: string;
  buildSign: string;
  view: string;
  viewInstagram: string;
  viewTradeProgram: string;
  viewMyWork: string;
  viewService: string;
  viewCaseStudy: string;
}

interface Form {
  general: {
    select: string;
    service: string;
    servicePlaceholder: string;
    firstName: string;
    firstNamePlaceholder: string;
    lastName: string;
    lastNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    requiredAlert: string;
    emailSent: string;
    emailNotSent: string;
    additionalInfo: string;
    details: string;
    detailsPlaceholder: string;
    referanceImage: string;
    upload: string;
  };

  wood: {
    width: string;
    height: string;
    unit: string;
    budget: string;
    currency: string;
  };
}

interface Nav {
  home: string;
  services: string;
  // signs: string;
  // decor: string;
  projects: string;
  about: string;
}

interface Work {
  signs: string;
  decor: string;
}

export interface Translations {
  buttons: Buttons;
  titles: Titles;
  form: Form;
  nav: Nav;
  projects: Work;
}
