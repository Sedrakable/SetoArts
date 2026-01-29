import { LangType } from "@/i18n/request";

export const navbarPageQuery = (locale: LangType, type: string): string => {
  return `*[_type == 'navbar' && lang == '${locale}' && type == '${type}'][0]`;
};

export const footerPageQuery = (locale: LangType): string => {
  return `*[_type == 'footer' && lang == '${locale}'][0]{
    ...,
    legals[]->{
      title,
      path,
    },
    faqs[]->{
      title,
      id,
    },
    socials->{
      ...,
      links[],
    },
  }`;
};

export const homePageQuery = (locale: LangType): string => {
  return `*[_type == 'homePage' && lang == '${locale}'][0] {
        meta,
        hero,
        questionsBlock-> {
          ...
        },
        servicesBlock-> {
          ...,
          services[]->,
        },
        featuresBlock-> {
          ...,
          features[]->,
        },
        testimonialsBlock-> {
          ...,
          testimonials[]->,
        },
        processBlock->,
        aboutBlock->,
        collapsible->,
      }`;
};

export const contactPageQuery = (locale: LangType): string => {
  return `*[_type == 'contactPage' && lang == '${locale}'][0] {
    meta,
    hero,
    collapsible->,
  }`;
};

export const carouselQuery = `
  *[_type == "work" && workType == "wood"] {
    images[]
  }
`;

export const worksPageQuery = (locale: LangType): string => {
  return `*[_type == 'workPage' && lang == '${locale}'][0]{
    meta,
    hero,
    workBlocks[]->{
    ...,
    works[]->,
    },
  }`;
};
export const workPageQuery = (slug: string): string => {
  return `*[_type == 'work' && slug.current == '${slug}'][0]{
    ...,
    meta,
  }`;
};

export const workPageListQuery = (locale: LangType): string => {
  return `*[_type == 'workPage' && lang == '${locale}'][0]{
    "works": workBlocks[]->{
      works[]->{
        "slug": slug,
        title
      }
    }.works[]
  }.works[]`;
};

export const formQuery = (slug: string, locale: LangType): string => {
  return `*[_type == '${slug}Form' && lang == '${locale}'][0]`;
};

export const legalPageQuery = (locale: LangType, slug: string): string => {
  return `*[_type == 'legalPage' && lang == '${locale}' && path == '/${slug}'][0]`;
};

export const notFoundPageQuery = (locale: LangType): string => {
  return `*[_type == 'notFoundPage' && lang == '${locale}'][0]`;
};

export const sitemapWoodWorkQuery: string = `*[_type == 'work' && workType == 'wood']{
  images,
  slug,
  _updatedAt,
  }`;
