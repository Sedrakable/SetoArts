import { FancyTextProps } from "./components/reuse/FancyText";
// @ts-ignore
import { ICustomImage } from "./components/reuse/SanityImage/SanityImage";

export interface ICta {
  text: string;
  link?: string;
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
  services: IService[];
}

export interface IService {
  title: string;
  metaTitle: string;
  path: string;
  features: IFeatures;
  processes: IProcesses;
  price?: string;
}

export interface IFeatures {
  features: IFeature[];
}

export interface IFeature {
  customImage: ICustomImage;
  title: string;
  desc: string;
}

export interface IProcesses {
  processes: IProcess[];
}

export interface IProcess {
  title: string;
  desc: string;
  features: IFeature[];
}

export interface IValues {
  values: IValue[];
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
  cta?: boolean;
}

export interface IAbout {
  content: IAboutContent;
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

export interface IForm {
  desc: IFancyText;
}

export interface INotFound {
  title: string;
  desc: string;
}

/* eslint-disable */
export enum LocalPaths {
  HOME = "/home",
  ABOUT = "/about-work",
  BLOG = "/blog",
  WORK = "/work",
  CONTACT = "/contact",
  LEGAL = "/legal",
  SERVICE = "/service",
  BRANDING = "/branding",
  WEB = "/web-design",
  PACKAGE = "/total-package",
  CUSTOM = "/custom-work",
}
/* eslint-enable */
