import React from "react";
import { Inspired } from "@/components/pages/blocks/Inspired/Inspired";
import { PriceBlock } from "@/components/pages/blocks/PriceBlock/PriceBlock";
import { WorkSlider } from "@/components/pages/blocks/WorkSlider/WorkSlider";
import { Hero } from "@/components/reuse/Hero/Hero";
import { IService, IHero, IWorkBlock, ISeo, LocalPaths } from "@/data.d";
import { Processes } from "@/components/services/Processes/Processes";
import { Features } from "@/components/services/Features/Features";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";

export interface ServicePageProps extends IService {
  meta: ISeo;
  hero: IHero;
  work: IWorkBlock;
}

const getServicePageData = async (locale: LangType, slug: string) => {
  const type = "servicePage";
  const serviceQuery = `*[_type == '${type}' && lang == '${locale}' && path == '/${slug}'][0] {
    meta,
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const servicePageData: ServicePageProps = await useFetchPage(
    serviceQuery,
    `${type}-${slug}`
  );

  return servicePageData;
};

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}): Promise<Metadata> {
  const servicePageData: ServicePageProps = await getServicePageData(
    locale,
    slug
  );
  const { metaTitle, metaDesc, metaKeywords } = servicePageData.meta;
  const path = `${LocalPaths.SERVICE}/${slug}`;
  const crawl = true;

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    metaKeywords,
    path,
    crawl,
  });
}

export default async function ServicePage({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}) {
  const servicePageData = await getServicePageData(locale, slug);
  return (
    servicePageData && (
      <>
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
