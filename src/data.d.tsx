import { ICustomImage } from "./components/reuse/SanityImage/SanityImage";

export interface ISeo {
  metaTitle: string;
  metaDesc: string;
  metaKeywords: string[];
}

export interface ICta {
  text: string;
  link?: string;
}

export interface ISlug {
  current: string;
  _type: string;
}

export interface IFancyText {
  value: any; // Will store the PortableText content
}

export interface IHero {
  subTitle?: IFancyText;
  title: IFancyText;
  desc: string;
  customImage: ICustomImage;
  cta1: ICta;
  cta2?: ICta;
  quote: IQuote;
}

export interface IHeroV2 {
  backgroundImage: ICustomImage;
  foregroundImage: ICustomImage;
  subTitle?: string;
  cta: ICta;
  message?: string;
}

export interface ILandingSide {
  title: string;
  desc: any;
  backgroundImage: ICustomImage;
  tags: string[];
}

export interface IQuote {
  leftText: string;
  rightText: string;
}

export interface IServices {
  services: IService[];
}

export interface IService {
  title: string;
  metaTitle: string;
  path: string;
  features: IFeature[];
  // processes: IProcess;
  price?: string;
}

export interface IFeature {
  customImage?: ICustomImage; // Optional image field
  svgName?: string; // Optional SVG name
  title: string;
  desc: string;
}

export interface IQuestion {
  title: string;
  extraNote?: string;
  desc: any;
}

export interface ITestimonial {
  beforeImage: ICustomImage;
  afterImage: ICustomImage;
  name: string;
  profileImage?: ICustomImage;
  title?: string;
  review: any;
}

export interface IProcessStep {
  title: string;
  desc: any;
}

export interface IValues {
  values: IValue[];
}

export interface IValue {
  title: string;
  desc: string;
}

export interface IAbout {
  customImage: ICustomImage;
  name?: string;

  desc1: string;
  title2?: string;
  desc2?: string;
  cta?: boolean;
}

export interface IWorkBlock {
  works: IWork[];
}

export interface IBlog {
  articles: IArticle[];
}

export interface IArticle {
  path: string;
  customImage: ICustomImage;
  title: string;
  desc: string;
  date: string;
  facebookLink?: string;
  content: IBlock[];
}

export interface IWork {
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

export interface IWoodWork {
  slug: ISlug;
  thumbnailImage: ICustomImage;
  customImages: ICustomImage[];
  title: string;
  desc: string;
}

export interface INavLink {
  title: string;
  ctaArray: ICta[];
}

export interface INavBar {
  links: (INavLink | ICta)[];
}

export interface ISocials {
  title?: string;
  links: ICta[];
}

export interface IBlock {
  _key: string;
  _type: string;
  style: "h1" | "h2" | "h3" | "h4" | "h5" | "normal" | "blockquote";
  children: { _key: string; _type: string; marks: string[]; text: string }[];
}

export interface ILegalPage {
  path: string;
  title: string;
  data: IBlock[];
}
export interface IFooter {
  legals: { title: string; path: string }[];
  trademark: string;
  socials: ISocials;
}

export interface ICollapsible {
  title?: string;
  questions: {
    question: string;
    answer: any;
  }[];
}

export interface INotFound {
  title: string;
  desc: string;
}

/* eslint-disable */
export enum LocalPaths {
  HOME = "/",
  WOOD = "/wood",
  DIGITAL = "/digital",
  ABOUT = "/about-work",
  BLOG = "/blog",
  CONTACT = "/contact",
  LEGAL = "/legal",
  SERVICE = "/service",
  BRANDING = "/branding",
  WEB = "/web-design",
  PACKAGE = "/total-package",
  CUSTOM = "/custom-work",
}
/* eslint-enable */
