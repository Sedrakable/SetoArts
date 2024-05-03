import React from "react";
import { SEO } from "@/components/SEO";
import { Inspired } from "@/components/pages/blocks/Inspired/Inspired";
import { PriceBlock } from "@/components/pages/blocks/PriceBlock/PriceBlock";
import { WorkSlider } from "@/components/pages/blocks/WorkSlider/WorkSlider";
import { Hero } from "@/components/reuse/Hero/Hero";
import { IService, IHero, IWorkBlock } from "@/data.d";
import { Processes } from "@/components/services/Processes/Processes";
import { Features } from "@/components/services/Features/Features";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";

export interface ServicePageProps extends IService {
  hero: IHero;
  work: IWorkBlock;
}

export default async function ServicePage({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}) {
  const serviceQuery = `*[_type == 'servicePage' && lang == '${locale}' && path == '/${slug}'][0] {
    ...,
    path,
    metatitle,
    lang,
    hero{
      ...,
      quote->,
    },
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
        customImages,
        thumbnailImage,
        title,
        desc,
        primaryLink,
      }
    },
  }`;
  const servicePageData: ServicePageProps = await useFetchPage(
    serviceQuery,
    slug
  );
  return (
    servicePageData && (
      <>
        <SEO
          title={servicePageData.metaTitle}
          description={servicePageData.hero.desc}
          imgUrl="https://i.imgur.com/u9EH6vH.png"
          url="https://www.setoxarts.com/en/home"
        />
        <Hero {...servicePageData?.hero} version={2} />
        <Features
          {...servicePageData?.features}
          variant={servicePageData?.processes ? "dark" : "grid"}
        />
        {servicePageData?.price && (
          <PriceBlock price={servicePageData?.price} />
        )}
        {servicePageData?.processes && (
          <Processes {...servicePageData?.processes} />
        )}
        {servicePageData?.work && <WorkSlider {...servicePageData?.work} />}
        <Inspired />
      </>
    )
  );
}
