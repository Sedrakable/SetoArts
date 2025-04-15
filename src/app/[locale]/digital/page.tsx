import {
  IHero,
  IWorkBlock,
  LocalPaths,
  ISeo,
  IQuestion,
  IService,
  ITestimonial,
} from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { digitalPageQuery } from "@/app/api/generateSanityQueries";

import { Hero } from "@/components/reuse/Hero/Hero";
import { WorkSlider } from "@/components/pages/blocks/WorkSlider/WorkSlider";
import { Services } from "@/components/pages/home/Services/Services";
import NavWrapperServer from "@/components/pages/NavWrapper/NavWrapperServer";
import { getTranslations } from "@/helpers/langUtils";
import { Questions } from "@/components/services/Questions/Questions";
import {
  SolutionBlock,
  SolutionBlockProps,
} from "@/components/pages/blocks/SolutionBlock/SolutionBlock";
import { Testimonials } from "@/components/services/Testimonials/Testimonials";

export interface DigitalPageProps {
  meta: ISeo;
  hero: IHero;
  questions: IQuestion[];
  solutionBlock: SolutionBlockProps;
  testimonials: ITestimonial[];
  services: IService[];
  work: IWorkBlock;
}

export const getDigitalPageData = async (locale: LangType) => {
  const digitalQuery = digitalPageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const digitalPageData: DigitalPageProps = await useFetchPage(digitalQuery);
  return digitalPageData;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const digitalPageData = await getDigitalPageData(locale);
  const { metaTitle, metaDesc, metaKeywords } = digitalPageData.meta;
  const path = LocalPaths.HOME;
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

export default async function DigitalPage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const data = await getDigitalPageData(locale);
  const translations = getTranslations(locale);

  return (
    <NavWrapperServer locale={locale} theme="dark">
      {data && (
        <Hero
          {...data.hero}
          cta={{ text: translations.buttons.buildBrand }}
          theme="dark"
        />
      )}
      {/* {data.work && <WorkSlider {...data?.work} />} */}
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
