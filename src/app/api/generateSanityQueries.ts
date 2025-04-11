import { LangType } from "@/i18n";

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
    socials->{
      ...,
      links[],
    },
  }`;
};

export const landingPageQuery = (locale: LangType): string => {
  return `*[_type == 'landingPage' && lang == '${locale}'][0] {
    meta,
    leftSide->,
    rightSide->,
  }`;
};

export const digitalPageQuery = (locale: LangType): string => {
  return `*[_type == 'digitalPage' && lang == '${locale}'][0] {
        meta,
        hero,
        work->{
          works[]->,
        },
        questions[]->,
        solutionBlock->,
        testimonials[]->,
        services[]-> {
          ...,
          featureBlock->{
            features[]->,
          }
        },
      }`;
};

export const woodPageQuery = (locale: LangType): string => {
  return `*[_type == 'woodPage' && lang == '${locale}'][0] {
        meta,
        hero,
        featureBlock->{
          features[]->,
        },
        questions[]->,
        solutionBlock->,
        testimonials[]->,
        processBlock->,
        collapsible->,
      }`;
};

export const carouselQuery = `
  *[_type == "woodWork"] {
    customImages[]
  }
`;

export const servicePageQuery = (locale: LangType, slug: string): string => {
  return `*[_type == 'servicePage' && lang == '${locale}' && path == '/${slug}'][0] {
    meta,
    hero,
    featureBlock->{
      features[]->,
    },
    processBlock->,
    collapsible->,
  }`;
};

export const aboutPageQuery = (locale: LangType): string => {
  return `*[_type == 'aboutPage' && lang == '${locale}'][0] {
    meta,
    about->,
    values->,
    work->{
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

export const blogPageQuery = (locale: LangType): string => {
  return `*[_type == 'blogPage' && lang == '${locale}'][0]{
    meta,
    blog ->{
      articles[]->{
        path,
        title,
        desc,
        date,
        customImage
      }
    }
}`;
};

export const articlePageQuery = (locale: LangType, slug: string): string => {
  return `*[_type == 'articlePage' && lang == '${locale}' && path == '${slug}'][0]{
    ...,
    meta,
  }`;
};

export const contactPageQuery = (locale: LangType): string => {
  return `*[_type == 'contactPage' && lang == '${locale}'][0] {
    meta,
    desc,
  }`;
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
