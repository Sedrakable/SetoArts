import {
  IHero,
  LocalPaths,
  ISeo,
  IQuestion,
  IService,
  ITestimonial,
  LocalTargets,
} from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { digitalPageQuery } from "@/app/api/generateSanityQueries";

import { Services } from "@/components/pages/blocks/Services/Services";
import NavWrapperServer from "@/components/navbar/NavWrapper/NavWrapperServer";
import { getTranslations } from "@/helpers/langUtils";
import { Questions } from "@/components/pages/blocks/Questions/Questions";
import {
  SolutionBlock,
  SolutionBlockProps,
} from "@/components/pages/blocks/SolutionBlock/SolutionBlock";
import { Testimonials } from "@/components/pages/blocks/Testimonials/Testimonials";
import { Hero } from "@/components/pages/blocks/Hero/Hero";

export interface DigitalPageProps {
  meta: ISeo;
  hero: IHero;
  questions: IQuestion[];
  solutionBlock: SolutionBlockProps;
  testimonials: ITestimonial[];
  services: IService[];
}

export const getDigitalPageData = async (locale: LangType) => {
  const digitalQuery = digitalPageQuery(locale);

  const digitalPageData: DigitalPageProps = await fetchPage(digitalQuery);
  return digitalPageData;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = `${LocalPaths.DIGITAL}`;
  const crawl = true;
  const digitalPageData: DigitalPageProps = await getDigitalPageData(locale);
  const { metaTitle, metaDesc } = digitalPageData.meta;

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    path,
    crawl,
  });
}

export default async function DigitalPage(props: {
  params: Promise<{ locale: LangType }>;
}) {
  const params = await props.params;

  const { locale } = params;

  const data = await getDigitalPageData(locale);
  // const workData: IWork[] = await fetchPage(worksQuery);
  const translations = getTranslations(locale);

  return (
    <NavWrapperServer locale={locale} theme="dark" hideLogo>
      {data && (
        <Hero
          {...data.hero}
          cta1={{
            text: translations.buttons.buildBrand,
            path: LocalPaths.DIGITAL,
            scrollTarget: LocalTargets.SERVICESBLOCK,
          }}
          cta2={{
            text: translations.buttons.viewMyWork,
            // path: `/${locale}${LocalPaths.ABOUT}`,
            path: LocalPaths.ABOUT,
            scrollTarget: LocalTargets.BRANDINGWORK,
          }}
          theme="dark"
        />
      )}
      {/* {workData && <WorkSlider works={workData} />} */}
      {data.questions && <Questions questions={data.questions} theme="dark" />}
      {data.solutionBlock && (
        <SolutionBlock {...data.solutionBlock} theme="wood" />
      )}
      {data.testimonials && (
        <Testimonials testimonials={data.testimonials} theme="light" />
      )}
      {data.services && <Services services={data.services} />}
    </NavWrapperServer>
  );
}
