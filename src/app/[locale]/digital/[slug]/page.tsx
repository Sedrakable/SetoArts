import {
  IWorkBlock,
  ISeo,
  IFeature,
  IHeroV2,
  IProcessStep,
  IFrameVideo,
  ICollapsible,
  LocalPaths,
  LocalTargets,
  ICta,
  ServiceType,
  DigitalServiceType,
} from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n";
import { servicePageQuery } from "@/app/api/generateSanityQueries";
import { Features } from "@/components/pages/blocks/Features/Features";
import NavWrapperServer from "@/components/navbar/NavWrapper/NavWrapperServer";
import { ClientLogger } from "@/helpers/clientLogger";
import { getFormData } from "@/components/reuse/Form/getFormData";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import { Collapsible } from "@/components/pages/blocks/Collapsible/Collapsible";
import { getTranslations } from "@/helpers/langUtils";
import { ProcessAndForm } from "@/components/pages/blocks/ProcessAndForm/ProcessAndForm";
import { HeroV2 } from "@/components/pages/blocks/Hero/Hero";
import { redirect } from "next/navigation";
// import { Processes } from "@/components/blocks/Processes/Processes";

export interface ServicePageProps {
  meta: ISeo;
  hero: IHeroV2;
  featureBlock: { features: IFeature[] };
  processBlock: { processes: IProcessStep[] };
  work: IWorkBlock;
  collapsible: ICollapsible;
}

const getServicePageData = async (locale: LangType, slug: string) => {
  try {
    const serviceQuery = servicePageQuery(locale, slug);
    const servicePageData: ServicePageProps = await fetchPage(serviceQuery);
    return servicePageData;
  } catch (error) {
    console.error(`Error fetching service page data for slug ${slug}:`, error);
    return null;
  }
};

// export async function generateMetadata({
//   params: { locale, slug },
// }: {
//   params: { locale: LangType; slug: string };
// }): Promise<Metadata> {
//   const path = `${LocalPaths.DIGITAL}/${slug}`;
//   const crawl = true;
//   const servicePageData: ServicePageProps = await getServicePageData(
//     locale,
//     slug
//   );
//   const { metaTitle, metaDesc, metaKeywords } = servicePageData.meta;

//   return setMetadata({
//     locale,
//     metaTitle,
//     metaDesc,
//     metaKeywords,
//     path,
//     crawl,
//   });
// }

const videoData: Record<DigitalServiceType, IFrameVideo> = {
  branding: {
    firstIndex: 13,
    lastIndex: 400,
    folder: "branding",
    format: "webp",
  },
  website: {
    firstIndex: 11,
    lastIndex: 400,
    folder: "website",
    format: "webp",
  },
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: LangType; slug: ServiceType }>;
}) {
  const { locale, slug } = await params;
  const translations = getTranslations(locale);
  const data = await getServicePageData(locale, slug);
  const formData: FormTitleProps = await getFormData(slug, locale);

  // Define heroCTAdata inside component to access translations and locale
  const heroCTAdata: Record<DigitalServiceType, ICta> = {
    branding: {
      text: translations.buttons.getQuote,
      path: `/${locale}${LocalPaths.DIGITAL}/${slug}`,
      scrollTarget: LocalTargets.DIGITALFORM,
    },
    website: {
      text: translations.buttons.getQuote,
      path: `/${locale}${LocalPaths.DIGITAL}/${slug}`,
      scrollTarget: LocalTargets.DIGITALFORM,
    },
  };

  // TODO: Add error handling for data fetching
  if (!data) {
    redirect(`/${locale}${LocalPaths.DIGITAL}`);
  }

  return (
    <NavWrapperServer locale={locale} theme="light">
      {data && (
        <>
          <ClientLogger slug={slug} />
          {data.hero && (
            <HeroV2
              {...data.hero}
              cta1={heroCTAdata[slug]}
              cta2={{ text: translations.buttons.viewMyWork }}
            />
          )}
          {data.featureBlock && (
            <Features features={data.featureBlock.features} />
          )}
          {data.processBlock && slug && (
            <ProcessAndForm
              processes={data.processBlock.processes}
              {...formData}
              form="digital"
              video={videoData[slug]}
            />
          )}
          {data.collapsible && <Collapsible {...data.collapsible} />}
        </>
      )}
    </NavWrapperServer>
  );
}
