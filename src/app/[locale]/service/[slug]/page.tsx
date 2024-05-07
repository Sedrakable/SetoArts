import { IService, IHero, IWorkBlock, ISeo, LocalPaths } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { servicePageQuery } from "@/app/api/generateSanityQueries";
import dynamic from "next/dynamic";

export interface ServicePageProps extends IService {
  meta: ISeo;
  hero: IHero;
  work: IWorkBlock;
}

const Hero = dynamic(
  () => import("@/components/reuse/Hero/Hero").then((module) => module.Hero),
  {
    ssr: false,
  }
);

const Features = dynamic(
  () =>
    import("@/components/services/Features/Features").then(
      (module) => module.Features
    ),
  {
    ssr: false,
  }
);

const PriceBlock = dynamic(
  () =>
    import("@/components/pages/blocks/PriceBlock/PriceBlock").then(
      (module) => module.PriceBlock
    ),
  {
    ssr: false,
  }
);

const Processes = dynamic(
  () =>
    import("@/components/services/Processes/Processes").then(
      (module) => module.Processes
    ),
  {
    ssr: false,
  }
);

const WorkSlider = dynamic(
  () =>
    import("@/components/pages/blocks/WorkSlider/WorkSlider").then(
      (module) => module.WorkSlider
    ),
  {
    ssr: false,
  }
);

const Inspired = dynamic(
  () =>
    import("@/components/pages/blocks/Inspired/Inspired").then(
      (module) => module.Inspired
    ),
  {
    ssr: false,
  }
);

const getServicePageData = async (locale: LangType, slug: string) => {
  const type = "servicePage";
  const serviceQuery = servicePageQuery(locale, slug);
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
  const path = `${LocalPaths.SERVICE}/${slug}`;
  const crawl = true;
  const servicePageData: ServicePageProps = await getServicePageData(
    locale,
    slug
  );
  const { metaTitle, metaDesc, metaKeywords } = servicePageData.meta;

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
