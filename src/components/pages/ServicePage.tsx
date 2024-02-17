import React from "react";

import { IHero, IInspired, IFeatures, IProcesses } from "../../data";
import { Hero } from "../reuse/Hero";
import { useFetchPage } from "../../api/useFetchPage";
import { Inspired } from "./blocks/Inspired/Inspired";

export interface ServicePageProps {
  hero: IHero;
  features: IFeatures;
  processes: IProcesses;
  inspired: IInspired;
}

export const ServicePage: React.FC = () => {
  const serviceQuery = `*[_type == 'servicePage'][0] {
    title,
    lang,
    slug,
    navbar->,
    hero,
    features->{
      title,
      features[]->,
    },
    processes->{
      title,
      processes[]->{
        ...,
        features[]->,
      },
    },
    inspired->,
    footer->
  }`;

  const servicePageData: ServicePageProps = useFetchPage(serviceQuery)!;
  console.log("service", servicePageData);

  return (
    servicePageData && (
      <>
        <Hero {...servicePageData?.hero} />
        <Inspired {...servicePageData?.inspired} />
      </>
    )
  );
};
