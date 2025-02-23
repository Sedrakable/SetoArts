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

export const homePageQuery = (locale: LangType): string => {
  return `*[_type == 'homePage' && lang == '${locale}'][0] {
        meta,
        hero{
          ...,
          quote->,
        },
        services-> {
          services[]->{
            path,
            title,
            features->{
              features[]->{
                title,
                customImage,
              }
            },
            processes,
            price
          },
        },
        values->,
        about->,
        work->{
          works[]->{
            slug,
            thumbnailImage,
            customImages,
            title,
            desc,
            primaryLink,
          },
        },
      }`;
};

export const woodPageQuery = (locale: LangType): string => {
  return `*[_type == 'woodPage' && lang == '${locale}'][0] {
        meta,
        hero,
        features[]->,
        questions[]->,
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
    hero{
      ...,
      quote->,
    },
    features->{
      features[]->,
    },
    processes->{
      processes[]->{
        ...,
        features[]->,
      },
    },
    price,
    work->{
      title,
      works[]->{
        slug,
        customImages,
        thumbnailImage,
        title,
        desc,
        primaryLink,
      }
    },
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

export const legalPageQuery = (locale: LangType, slug: string): string => {
  return `*[_type == 'legalPage' && lang == '${locale}' && path == '/${slug}'][0]`;
};

export const notFoundPageQuery = (locale: LangType): string => {
  return `*[_type == 'notFoundPage' && lang == '${locale}'][0]`;
};
