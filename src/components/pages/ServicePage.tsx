import React, { FC } from "react";

import { IHero, IWorkBlock, IService } from "../../data";
import { Hero } from "../reuse/Hero/Hero";
import { Inspired } from "./blocks/Inspired/Inspired";
import { Features } from "./services/Features/Features";
import { Processes } from "./services/Processes/Processes";
import { WorkSlider } from "./blocks/WorkSlider/WorkSlider";
import { PriceBlock } from "./blocks/PriceBlock/PriceBlock";
import { SEO } from "../SEO";

export interface ServicePageProps extends IService {
  hero: IHero;
  work: IWorkBlock;
}

export const ServicePage: FC<ServicePageProps> = (props) => {
  return (
    props && (
      <>
        <SEO
          title={props.title}
          description={props.hero.desc}
          imgUrl="https://i.imgur.com/u9EH6vH.png"
          url="https://www.setoxarts.com/en/home"
        />
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
