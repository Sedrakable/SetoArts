import React, { FC } from "react";

import { IHero, IWorkBlock, IService } from "../../data";
import { Hero } from "../reuse/Hero/Hero";
import { Inspired } from "./blocks/Inspired/Inspired";
import { Features } from "./services/Features/Features";
import { Processes } from "./services/Processes/Processes";
import { WorkSlider } from "./blocks/WorkSlider/WorkSlider";
import { PriceBlock } from "./blocks/PriceBlock/PriceBlock";

export interface ServicePageProps extends IService {
  hero: IHero;
  work: IWorkBlock;
}

export const ServicePage: FC<ServicePageProps> = (props) => {
  return (
    props && (
      <>
        <Hero {...props?.hero} version={2} />
        <Features
          {...props?.features}
          variant={props?.processes ? "dark" : "grid"}
        />
        {props?.price && <PriceBlock price={props?.price} />}
        {props?.processes && <Processes {...props?.processes} />}
        {props?.work && <WorkSlider {...props?.work} />}
        <Inspired />
      </>
    )
  );
};
