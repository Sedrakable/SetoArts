import { ICustomImage } from "./components/reuse/SanityImage/SanityImage";

export type ServiceType = "wood" | "digital";
export type DigitalServiceType = "branding" | "web-design";

export interface ISeo {
  metaTitle: string;
  metaDesc: string;
  metaKeywords: string[];
}

export interface ICta {
  text: string;
  path?: string;
  scrollTarget?: LocalTargets;
}

export interface ISlug {
  current: string;
  _type: string;
}

export interface IFancyText {
  value: any; // Will store the PortableText content
}

export interface IHeroV2 {
  title: string;
  subTitle?: string;
  desc: any;
  backgroundImage: ICustomImage;
  cta1: ICta;
  cta2?: ICta;
  quote: IQuote;
}

export type ITheme = "light" | "dark" | "wood";

export interface IHero {
  backgroundImage: ICustomImage;
  foregroundImage: ICustomImage;
  subTitle?: string;
  cta: ICta;
  message?: string;
  theme?: ITheme;
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
  svgName: string;
  path?: string;
  featureBlock: { features: IFeature[] };
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
  theme?: ITheme;
}

export interface ITestimonial {
  beforeImage: ICustomImage;
  afterImage: ICustomImage;
  name: string;
  company: string;
  profileImage?: ICustomImage;
  title?: string;
  review: any;
}

export interface IProcessStep {
  title: string;
  desc: any;
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
  path: string;
  ctaArray: ICta[];
}

export interface INavBar {
  navButton: ICta;
  links: (INavLink | ICta)[];
  theme?: ITheme;
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

export enum LocalPaths {
  HOME = "/",
  WOOD = "/wood",
  DIGITAL = "/digital",
  ABOUT = "/about-work",
  BLOG = "/blog",
  CONTACT = "/contact",
  LEGAL = "/legal",
  BRANDING = "/branding",
  WEB = "/web-design",
  PACKAGE = "/total-package",
  CUSTOM = "/custom-work",
}

export enum LocalTargets {
  WOODFORM = "#wood-form",
  DIGITALFORM = "#digital-form",
  BRANDINGFORM = "#branding-form",
  WEBFORM = "#web-form",
  WORK = "#work-block",
}
