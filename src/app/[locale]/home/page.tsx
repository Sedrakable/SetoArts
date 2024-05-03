import { SEO } from "@/components/SEO";
import { About } from "@/components/pages/blocks/About/About";
import { Inspired } from "@/components/pages/blocks/Inspired/Inspired";
import { Reviews } from "@/components/pages/blocks/Reviews/Reviews";
import { WorkSlider } from "@/components/pages/blocks/WorkSlider/WorkSlider";
import { Services } from "@/components/pages/home/Services/Services";
import { Values } from "@/components/pages/home/Values/Values";
import { Hero } from "@/components/reuse/Hero/Hero";
import { IHero, IServices, IValues, IAbout, IWorkBlock } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";

export interface HomePageProps {
  title: string;
  hero: IHero;
  services: IServices;
  values: IValues;
  about: IAbout;
  work: IWorkBlock;
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const homeQuery = `*[_type == 'homePage' && lang == '${locale}'][0] {
    ...,
    title,
    lang,
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

  const homePageData: HomePageProps = await useFetchPage(homeQuery, "homePage");

  return (
    homePageData && (
      <>
        <SEO
          title={homePageData.title}
          description={homePageData.hero.desc}
          imgUrl="https://i.imgur.com/u9EH6vH.png"
          url="https://www.setoxarts.com/en/home"
        />
        <Hero {...homePageData?.hero} />
        <WorkSlider {...homePageData?.work} />
        <Services {...homePageData.services} />
        <Values {...homePageData.values} />
        <About content={{ ...homePageData?.about?.content, cta: true }} />
        <Reviews />
        <Inspired />
      </>
    )
  );
}
