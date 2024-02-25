import React from "react";

import {
  IHero,
  IServices,
  IAbout,
  IInspired,
  IValues,
  IWorkBlock,
} from "../../data";
import { Hero } from "../reuse/Hero/Hero";
import { Values } from "./home/Values/Values";
import { Services } from "./home/Services/Services";
import { Work } from "./blocks/WorkSlidesBlock/Work";
import { About } from "./blocks/About/About";
import { useFetchPage } from "../../api/useFetchPage";
import { Inspired } from "./blocks/Inspired/Inspired";
import { useAtom } from "jotai";
import { langData } from "../navbar/LangSwitcher/LangSwitcher";

export interface HomePageProps {
  hero: IHero;
  services: IServices;
  values: IValues;
  about: IAbout;
  work: IWorkBlock;
  inspired: IInspired;
}

export const HomePage: React.FC = () => {
  const [lang] = useAtom(langData);
  const homeQuery = `*[_type == 'homePage' && lang == '${lang}'][0] {
    title,
    lang,
    hero,
    services {
      services[]->{
        ...,
        features[]->,
      },
      title,
    },
    values,
    about->,
    work->{
      works[]->{
        slug,
        thumbnailImage,
        title,
        desc,
        primaryLink,
      },
    }, // Expand 'works' reference and select specific fields
    inspired->,
  }`;
  const homePageData: HomePageProps = useFetchPage(homeQuery)!;

  // console.log("home", homePageData);

  return (
    homePageData && (
      <>
        <Hero {...homePageData?.hero} />
        <Services {...homePageData.services} />
        <Values {...homePageData.values} />
        <About {...homePageData.about} />
        <Work {...homePageData.work} />
        <Inspired {...homePageData.inspired} />
      </>
    )
  );
};
