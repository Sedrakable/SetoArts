interface Titles {
  services: string;
  whatYouGet: string;
  questionTitle1: string;
  questionTitle2: string;
  questionTitle3: string;
  realTitle1: string;
  realTitle2: string;
  values: string;
  process: string;
  features: string;
  inspired: string;
  aboutMe: string;
  work: string;
  contact: string;
  reviews: string;
  blog: string;
}

interface Buttons {
  workWithMe: string;
  view: string;
  contact: string;
  send: string;
}

interface Form {
  name: string;
  email: string;
  companyName: string;
  budget: string;
  message: string;
  sent: string;
}

interface Nav {
  home: string;
  about: string;
  services: string;
}

interface Other {
  startAt: string;
}

export interface Translations {
  buttons: Buttons;
  blockTitles: Titles;
  form: Form;
  nav: Nav;
  other: Other;
}
