import { useFetchPage } from "../api/useFetchPage";
import { IFooter, ILegalPage, INavBar, INotFound } from "../data";
import { langData } from "../components/navbar/LangSwitcher/LangSwitcher";
import { useAtom } from "jotai";
import { AboutPageProps } from "../components/pages/AboutPage";
import { ContactPageProps } from "../components/pages/ContactPage";
import { HomePageProps } from "../components/pages/HomePage";
import { ServicePageProps } from "../components/pages/ServicePage";

// Custom hook for handling form state
export const useDataQuery = () => {
  const [lang] = useAtom(langData);

  const navbarQuery = `*[_type == 'navbar' && lang == '${lang}'][0]`;
  const footerQuery = `*[_type == 'footer' && lang == '${lang}'][0]{
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
  const serviceQuery = `*[_type == 'servicePage' && lang == '${lang}'] {
    path,
    title,
    lang,
    hero,
    features->{
      features[]->,
    },
    processes->{
      processes[]->{
        ...,
        features[]->,
      },
    },
    work->{
      title,
      works[]->{
        slug,
        thumbnailImage,
        title,
        desc,
        primaryLink,
      }
    },
  }`;
  const aboutQuery = `*[_type == 'aboutPage' && lang == '${lang}'][0] {
    about->,
    work->{
      works[]->,
    },
  }`;
  const contactQuery = `*[_type == 'contactPage' && lang == '${lang}'][0] {
    title,
    form->,
  }`;
  const homeQuery = `*[_type == 'homePage' && lang == '${lang}'][0] {
    title,
    lang,
    hero,
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
        title,
        desc,
        primaryLink,
      },
    },
  }`;
  const legalQuery = `*[_type == 'legalPage' && lang == '${lang}']`;
  const notFoundQuery = `*[_type == 'notFoundPage' && lang == '${lang}'][0]`;

  const navbarData: INavBar = useFetchPage(navbarQuery)!;
  const footerData: IFooter = useFetchPage(footerQuery)!;
  const homePageData: HomePageProps = useFetchPage(homeQuery)!;
  const servicePageData: ServicePageProps[] = useFetchPage(serviceQuery)!;
  const contactPageData: ContactPageProps = useFetchPage(contactQuery)!;
  const aboutPageData: AboutPageProps = useFetchPage(aboutQuery)!;
  const legalPageData: ILegalPage[] = useFetchPage(legalQuery)!;
  const notFoundPageData: INotFound = useFetchPage(notFoundQuery)!;

  return {
    navbarData,
    footerData,
    homePageData,
    servicePageData,
    aboutPageData,
    contactPageData,
    legalPageData,
    notFoundPageData,
  };
};
