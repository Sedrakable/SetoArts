import { ICustomImage } from "./components/reuse/SanityImage/SanityImage";
import { FancyText } from "./components/reuse/Text/FancyText/FancyText";

export type ServiceType = "wood" | "digital";
export type DigitalServiceType = "branding" | "website";

export interface ISeo {
  metaTitle: string;
  metaDesc: string;
  metaImage?: string;
}

export interface ICta {
  text: string;
  path?: string;
  scrollTarget?: LocalTargets;
}

export interface IExternalLink {
  text: string;
  link: string;
}

export interface ISlug {
  current: string;
  _type: string;
}

export type ITheme = "light" | "dark" | "dash" | "wood" | "off-white";

export interface IHero {
  backgroundImage: ICustomImage;
  subTitle: FancyText;
  title: FancyText;
  desc: FancyText;
  cta1: ICta;
}

export interface ILandingSide {
  title: string;
  desc: any;
  backgroundImage: ICustomImage;
  exampleImages: ICustomImage[];
  tags: string[];
  cta: ICta;
}

export interface IQuote {
  leftText: string;
  rightText: string;
}

export interface IFeatureBlock {
  features: IFeature[];
  featureStrings?: string[]; // For the feature block Custom Work in the service page
}

export interface IFeature {
  customImage?: ICustomImage; // Optional image field
  svgName?: string; // Optional SVG name
  title: string;
  desc: string;
  titleFR: string; // Optional French title
  descFR: string; // Optional French description
}

export interface IQuestion {
  title: string;
  desc: FancyText;
}

export interface IProcessStep {
  title: string;
  desc: any;
  titleFR?: string;
  descFR?: any;
}

export interface IFrameVideo {
  format: "png" | "webp" | "jpg";
  folder: string;
  firstIndex: number;
  lastIndex: number;
}

export interface IValues {
  values: IValue[];
}

export interface IValue {
  title: string;
  desc: string;
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

export type workType = "signs" | "decor"; // From Sanity

export interface IWorkBlock {
  title: string;
  titleFR?: string;
  works: IWork[];
  id: LocalTargets; // For anchor scrolling
}

export interface IWork {
  title?: string; // Optional for gallery
  descEN?: string;
  descFR?: string;
  thumbnailImage: ICustomImage; // Sanity image asset
  slug?: ISlug; // Optional for internal links
  workType: workType; // From Sanity
  link?: string; // External URL (e.g., Behance, Kickstarter)
  images?: ICustomImage[]; // For modal slider (Wood Signs)
}

export interface INavLink {
  title: string;
  path: string;
  ctaArray: ICta[];
}

export interface INavBar {
  navButton: ICta;
  links: (INavLink | ICta)[];
  theme?: ITheme;
  hideLogo?: boolean;
  socials?: ISocials;
}

export interface IFooterFAQLinks {
  title: string;
  id: string;
}

export interface IFooter {
  legals: { title: string; path: string }[];
  faqs?: IFooterFAQLinks[];
  trademark: string;
  socials: ISocials;
}
export interface ISocials {
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

export interface ICollapsible {
  title?: string;
  id?: string;
  questions: {
    question: string;
    answer: any;
  }[];
}

export interface INotFound {
  title: string;
  desc: string;
}

export enum LocalPaths {
  HOME = "/",
  SERVICES = "/services",
  SIGNS = "/signs",
  DECOR = "/decor",
  WORK = "/work",
  ABOUT = "/about",
  CONTACT = "/contact",
  LEGAL = "/legal",
  TERMS = "/terms-and-conditions",
  POLICIES = "/privacy-policy",
}

export enum LocalTargets {
  SIGNSFORM = "#wood-form",
  WORK = "#work-block",
  SIGNSWORK = "#signs-work-block",
  DECORWORK = "#signs-work-block",
  SERVICESBLOCK = "#services-block",
  SIGNSFAQ = "#wood-faq",
}
