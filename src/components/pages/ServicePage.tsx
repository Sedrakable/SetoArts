import React from "react";

import {
  IHero,
  IInspired,
  IFeatures,
  IProcesses,
  IWorkBlock,
} from "../../data";
import { Hero } from "../reuse/Hero/Hero";
import { useFetchPage } from "../../api/useFetchPage";
import { Inspired } from "./blocks/Inspired/Inspired";
import { Features } from "./services/Features/Features";
import { Processes } from "./services/Processes/Processes";
import { Work } from "./blocks/WorkSlidesBlock/Work";
import { langData } from "../navbar/LangSwitcher/LangSwitcher";
import { useAtom } from "jotai";

export interface ServicePageProps {
  hero: IHero;
  features: IFeatures;
  processes: IProcesses;
  work: IWorkBlock;
  inspired: IInspired;
}

export const ServicePage: React.FC<{ path: string }> = ({ path }) => {
  const [lang] = useAtom(langData);
  const serviceQuery = `*[_type == 'servicePage' && lang == '${lang}' && path == '${path}'][0] {
    title,
    lang,
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
    inspired->,
  }`;

  const servicePageData: ServicePageProps = useFetchPage(serviceQuery)!;
  console.log("service", servicePageData);

  return (
    servicePageData && (
      <>
        <Hero {...servicePageData?.hero} version={2} />
        <Features
          {...servicePageData?.features}
          variant={servicePageData?.processes ? "dark" : "grid"}
        />
        {servicePageData?.processes && (
          <Processes {...servicePageData?.processes} />
        )}
        {servicePageData?.work && <Work {...servicePageData?.work} />}
        <Inspired {...servicePageData?.inspired} />
      </>
    )
  );
};
