import React, { FC } from "react";
import { IHero, IServices, IAbout, IValues, IWorkBlock } from "../../data.d";
import { Hero } from "../reuse/Hero/Hero";
import { Values } from "./home/Values/Values";
import { Services } from "./home/Services/Services";
import { WorkSlider } from "./blocks/WorkSlider/WorkSlider";
import { About } from "./blocks/About/About";
import { Inspired } from "./blocks/Inspired/Inspired";
import { SEO } from "../SEO";

export interface HomePageProps {
  hero: IHero;
  services: IServices;
  values: IValues;
  about: IAbout;
  work: IWorkBlock;
}

export const HomePage: FC<HomePageProps> = (props) => {
  return (
    props && (
      <>
        <SEO
          title={
            props.hero.title.part1 +
            " " +
            props.hero.title.part2 +
            " " +
            props.hero.title.part3
          }
          description={props.hero.desc}
          imgUrl="https://i.imgur.com/u9EH6vH.png"
          url="https://www.setoxarts.com/en/home"
        />
        <Hero {...props?.hero} />
        <WorkSlider {...props?.work} />
        <Services {...props.services} />
        <Values {...props.values} />
        <About content={{ ...props?.about?.content, cta: true }} />
        <Inspired />
      </>
    )
  );
};
