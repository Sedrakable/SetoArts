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
  buildSign: string;
  buildBrand: string;
}

interface Form {
  general: {
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
  cart: {
    province: string;
    city: string;
    postalCode: string;
    postalCodePlaceholder: string;
    delivery: string;
    addressLine: string;
  };
  flash: {
    selectedFlash: string;
    bodyPosition: string;
    bodyPositionPlaceholder: string;
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
