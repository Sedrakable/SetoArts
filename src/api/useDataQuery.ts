import { useFetchPage } from "./useFetchPage";
import { LangType } from "../components/navbar/LangSwitcher/LangSwitcher";

import { AboutPageProps } from "../components/pages/AboutPage";
import { ContactPageProps } from "../components/pages/ContactPage";
import { HomePageProps } from "../components/pages/HomePage";
import { ServicePageProps } from "../components/pages/ServicePage";
import { IFooter, ILegalPage, INavBar, INotFound } from "../data";
import { BlogPageProps } from "../components/pages/BlogPage";

const { generateQueries } = require("./generateSanityQueries");

const importSequentialJSONFiles = (
  lang: string,
  baseFileName: string
): any[] => {
  const importedJSONFiles = [];
  for (let i = 0; ; i++) {
    try {
      const json = require(`./backups/${lang}/${baseFileName}-${i}.json`);
      importedJSONFiles.push(json);
    } catch (error) {
      // Break the loop if an error occurs (i.e., the file doesn't exist)
      break;
    }
  }
  return importedJSONFiles;
};

// Custom hook for handling form state
export const useDataQuery = (lang: LangType) => {
  // Load JSON data from files using require

  const {
    navbarQuery,
    footerQuery,
    serviceQuery,
    aboutQuery,
    contactQuery,
    homeQuery,
    legalQuery,
    notFoundQuery,
    blogQuery,
  } = generateQueries(lang);

  const navbarData: INavBar =
    useFetchPage(navbarQuery)! ||
    require(`./backups/${lang}/backup-navbar.json`);
  const footerData: IFooter =
    useFetchPage(footerQuery)! ||
    require(`./backups/${lang}/backup-footer.json`);
  const homePageData: HomePageProps =
    useFetchPage(homeQuery)! ||
    require(`./backups/${lang}/backup-homePage.json`);
  const servicePageData: ServicePageProps[] =
    useFetchPage(serviceQuery)! ||
    importSequentialJSONFiles(lang, "backup-servicePage");
  const contactPageData: ContactPageProps =
    useFetchPage(contactQuery)! ||
    require(`./backups/${lang}/backup-contactPage.json`);
  const aboutPageData: AboutPageProps =
    useFetchPage(aboutQuery)! ||
    require(`./backups/${lang}/backup-aboutPage.json`);
  const legalPageData: ILegalPage[] =
    useFetchPage(legalQuery)! ||
    importSequentialJSONFiles(lang, "backup-legalPage");
  const notFoundPageData: INotFound =
    useFetchPage(notFoundQuery)! ||
    require(`./backups/${lang}/backup-notFoundPage.json`);
  const blogPageData: BlogPageProps =
    useFetchPage(blogQuery)! ||
    require(`./backups/${lang}/backup-blogPage.json`);

  return {
    navbarData,
    footerData,
    homePageData,
    servicePageData,
    aboutPageData,
    contactPageData,
    legalPageData,
    notFoundPageData,
    blogPageData,
  };
};
