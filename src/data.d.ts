export interface ICta {
  text: string;
  link?: string;
}

export interface ICustomImage {
  alt: string;
  image: IImage;
}
export interface IImage {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
}

export interface ISlug {
  current: string;
  _type: string;
}
export interface IFancyText {
  part1: string;
  part2: string;
  part3?: string;
}

export interface IHero {
  subTitle?: IFancyText;
  title: IFancyText;
  desc: string;
  customImage: ICustomImage;
  ctas?: {
    cta1: ICta;
    cta2?: ICta;
  };
  quote: IQuote;
}

export interface IQuote {
  leftText: string;
  rightText: string;
}

export interface IServices {
  title: string;
  services: IService[];
}

export interface IService {
  title: string;
  features: IFeature[];
  ctas: {
    cta1: ICta;
    cta2?: ICta;
  };
  price?: number;
}

export interface IFeatures {
  title: string;
  features: IFeature[];
}

export interface IFeature {
  customImage: ICustomImage;
  title: string;
  desc: string;
}

export interface IProcesses {
  title: string;
  processes: IProcess[];
}

export interface IProcess {
  title: string;
  desc: string;
  features: IFeature[];
}

export interface IValues {
  title: string;
  values: ValueProps[];
}

export interface IValue {
  title: string;
  desc: string;
}

export interface IAboutContent {
  customImage: ICustomImage;
  name?: string;
  title1: FancyTextProps;
  desc1: string;
  title2?: string;
  desc2?: string;
  cta?: ICta;
}

export interface IAbout {
  title: string;
  content: IAboutContent;
}

export interface IWorkBlock {
  title?: string;
  works: IWork[];
}

export interface IWork {
  _id: string;
  slug: ISlug;
  thumbnailImage: ICustomImage;
  customImages: ICustomImage[];
  title: string;
  desc: string;
  primaryLink: ICta;
  secondaryLinks?: ICta[];
  behanceProjectId?: string;
  kickstarterProjectlink?: string;
}

export interface IInspired {
  title: string;
  cta: ICta;
}

export interface INavLink {
  title: string;
  ctaArray: ICta[];
}

export interface INavBar {
  links: (INavLink | ICta)[];
}

export interface IFooter {
  privacyTerms: ICta[];
  trademark: string;
}

export interface IForm {
  desc: IFancyText;
  formFields: IFieldPlaceholders;
  cta: ICta;
}

export interface IFieldPlaceholders {
  name: string;
  email: string;
  companyName: string;
  budget: string;
  message: string;
}
