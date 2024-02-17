import React from "react";

import {
  IHero,
  IServices,
  IAbout,
  IInspired,
  IValues,
  IWorkSlide,
} from "../../data";
import { Hero } from "../reuse/Hero";
import { Values } from "./home/Values/Values";
import { Services } from "./home/Services/Services";
import { Work } from "./blocks/WorkSlidesBlock/Work";
import { About } from "./blocks/About/About";
import { useFetchPage } from "../../api/useFetchPage";
import { Inspired } from "./blocks/Inspired/Inspired";

export interface HomePageProps {
  hero: IHero;
  services: IServices;
  values: IValues;
  about: IAbout;
  works: IWorkSlide[];
  inspired: IInspired;
}

export const HomePage: React.FC = () => {
  const homeQuery = `*[_type == 'homePage'][0] {
    title,
    lang,
    slug,
    navbar->,
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
    works[]->, // Expand 'works' reference and select specific fields
    inspired->,
    footer->
  }`;
  const homePageData: HomePageProps = useFetchPage(homeQuery)!;

  console.log("home", homePageData);

  return (
    homePageData && (
      <>
        <Hero {...homePageData?.hero} />
        <Services {...homePageData.services} />
        <Values {...homePageData.values} />
        <About {...homePageData.about} />
        <Work works={homePageData.works} />
        <Inspired {...homePageData.inspired} />
      </>
    )
  );
};
