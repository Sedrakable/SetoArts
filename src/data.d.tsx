import { ICustomImage } from "./components/reuse/SanityImage/SanityImage";

export type ServiceType = "wood" | "digital";
export type DigitalServiceType = "branding" | "website";

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

export interface IExternalLink {
  text: string;
  link: string;
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
  cta1?: ICta;
  cta2?: ICta;
  quote: IQuote;
}

export type ITheme = "light" | "dark" | "yellow" | "wood";

export interface IHero {
  backgroundImage: ICustomImage;
  foregroundImage: ICustomImage;
  subTitle?: string;
  cta1: ICta;
  cta2?: ICta;
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
  featureBlock: IFeatureBlock;
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
  profileImage: ICustomImage;
  title: string;
  subTitle: string;
  desc: any;
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

export type workType = "wood" | "branding" | "website" | "cards" | "gallery"; // From Sanity

export interface IWorkBlock {
  title: string;
  works: IWork[];
  id: LocalTargets; // For anchor scrolling
}

export interface IWork {
  title?: string; // Optional for gallery
  descEN?: string;
  descFR?: string;
  thumbnailImage: ICustomImage; // Sanity image asset
  slug?: ISlug; // Optional for internal links
  workType: "wood" | "branding" | "website" | "cards" | "gallery"; // From Sanity
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
  WOOD = "/wood",
  DIGITAL = "/digital",
  ABOUT = "/about-work",
  CONTACT = "/contact",
  BRANDING = "/branding",
  WEB = "/website",
  LEGAL = "/legal",
}

export enum LocalTargets {
  WOODFORM = "#wood-form",
  DIGITALFORM = "#digital-form",
  WORK = "#work-block",
  WOODSIGNWORK = "#wood-work-block",
  BRANDINGWORK = "#branding-work-block",
  WEBWORK = "#website-work-block",
  CARDSWORK = "#cards-work-block",
  GALLERYWORK = "#gallery-work-block",
  SERVICESBLOCK = "#services-block",
  BRANDINGFAQ = "#branding-faq",
  WEBFAQ = "#web-faq",
  WOODFAQ = "#wood-faq",
}
