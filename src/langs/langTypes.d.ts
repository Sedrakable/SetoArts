interface Titles {
  services: string;
  values: string;
  process: string;
  features: string;
  inspired: string;
  aboutMe: string;
  work: string;
  contact: string;
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
}

interface Nav {
  home: string;
  about: string;
  services: string;
}

export interface Translations {
  buttons: Buttons;
  blockTitles: Titles;
  form: Form;
  nav: Nav;
}
