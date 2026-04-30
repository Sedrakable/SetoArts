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

export interface LeadFormOption {
  value: string;
  label: string;
}

interface LeadFormStepContent {
  label: string;
  question: string;
}

interface LeadFormTranslations {
  brand: string;
  progressLabel: string;
  progress: (current: number, total: number) => string;
  actions: {
    back: string;
    continue: string;
    submit: string;
    submitting: string;
    returnHome: string;
    edit: string;
  };
  errors: {
    chooseOne: string;
    addShortGoal: string;
    addBusinessType: string;
    addWidthHeight: string;
    chooseRoughSize: string;
    addProjectNote: string;
    addFirstName: string;
    addValidEmail: string;
    addPhone: string;
    chooseContactPreference: string;
    submitFailed: string;
    genericSubmit: string;
    missingRequiredLeadFields: string;
    failedToSubmitLead: string;
    submittedSuccessfully: string;
  };
  steps: {
    goal: LeadFormStepContent & {
      options: LeadFormOption[];
      otherLabel: string;
    };
    businessType: LeadFormStepContent & {
      options: LeadFormOption[];
      otherLabel: string;
      businessNameLabel: string;
    };
    location: LeadFormStepContent & {
      options: LeadFormOption[];
      microcopy: Record<string, string>;
    };
    size: LeadFormStepContent & {
      options: LeadFormOption[];
      roughOptions: LeadFormOption[];
      microcopy: string;
      widthLabel: string;
      heightLabel: string;
      unitLabel: string;
      unitOptions: LeadFormOption[];
    };
    projectInfo: LeadFormStepContent & {
      fieldLabel: string;
      placeholder: string;
    };
    timeline: LeadFormStepContent & {
      options: LeadFormOption[];
    };
    budget: LeadFormStepContent & {
      options: LeadFormOption[];
      microcopy: string;
    };
    files: LeadFormStepContent & {
      options: LeadFormOption[];
      microcopy: string;
      uploadButton: string;
      uploadNote: string;
      noLogoNote: string;
    };
    contact: LeadFormStepContent & {
      companyLabel: string;
      firstNameLabel: string;
      lastNameLabel: string;
      emailLabel: string;
      phoneLabel: string;
      preferenceQuestion: string;
      contactOptions: LeadFormOption[];
    };
    review: LeadFormStepContent & {
      title: string;
      copy: string;
      notProvided: string;
      editLabel: (label: string) => string;
      summaryLabels: {
        goal: string;
        businessType: string;
        location: string;
        size: string;
        timeline: string;
        budget: string;
        contactInfo: string;
        uploadedFiles: string;
      };
      fileCount: (count: number) => string;
      noFiles: string;
    };
  };
  thankYou: {
    brand: string;
    bookedTitle: string;
    bookedCopy: string;
    bookedNote: string;
    completeTitle: string;
    completeCopy: string;
    receivedTitle: string;
    receivedCopy: string;
    nextStepCopy: string;
    callMeMessage: string;
    bookCallTitle: string;
    callMeInstead: string;
  };
  metadata: {
    formTitle: string;
    formDescription: string;
    thankYouTitle: string;
    thankYouDescription: string;
    callBookedTitle: string;
    callBookedDescription: string;
    completeTitle: string;
    completeDescription: string;
  };
  email: {
    copyright: string;
    businessTitle: string;
    businessHeading: string;
    clientInfoHeading: string;
    clientTitle: string;
    clientHeading: string;
    clientThanks: (firstName: string) => string;
    clientIntro: string;
    regards: string;
    teamName: string;
    clientSubject: string;
    businessSubject: (name: string) => string;
    labels: {
      name: string;
      email: string;
      phone: string;
      preferredContact: string;
      locale: string;
      mainGoal: string;
      businessType: string;
      businessName: string;
      installLocation: string;
      approximateSize: string;
      projectInfo: string;
      timeline: string;
      budget: string;
      uploadedFiles: string;
    };
    noFilesUploaded: string;
    filesAttached: (count: number) => string;
  };
}

export interface Translations {
  buttons: Buttons;
  titles: Titles;
  form: Form;
  nav: Nav;
  projects: Work;
  leadForm: LeadFormTranslations;
}
