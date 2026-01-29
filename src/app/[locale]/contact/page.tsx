import { ICollapsible, ISeo, LocalPaths } from "@/data.d";
import { fetchPage } from "@/app/api/fetchPage";
import { LangType } from "@/i18n/request";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { contactPageQuery } from "@/app/api/generateSanityQueries";

import NavWrapperServer from "@/components/navbar/NavWrapper/NavWrapperServer";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import { getFormData } from "@/components/reuse/Form/getFormData";
import { ImageAndForm } from "@/components/pages/blocks/ImageAndForm/ImageAndForm";
import { Collapsible } from "@/components/pages/blocks/Collapsible/Collapsible";
import { Hero, HeroProps } from "@/components/pages/blocks/Hero/Hero";
// import { HeroV2 } from "@/components/pages/blocks/Hero/Hero";

export interface ContactPageProps {
  meta: ISeo;
  hero: HeroProps;
  collapsible: ICollapsible;
}

const getContactPageData = async (locale: LangType) => {
  const contactQuery = contactPageQuery(locale);
  const contactPageData: ContactPageProps = await fetchPage(contactQuery);

  return contactPageData;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = LocalPaths.CONTACT;
  const crawl = true;
  const contactPageData = await getContactPageData(locale);
  const { metaTitle, metaDesc } = contactPageData.meta;

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    path,
    crawl,
  });
}

export default async function Contact(props: {
  params: Promise<{ locale: LangType }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const data = await getContactPageData(locale);
  const formData: FormTitleProps = await getFormData("contact", locale);

  return (
    <NavWrapperServer locale={locale} theme="light">
      {data.hero && <Hero {...data.hero} version={2} />}
      {formData && <ImageAndForm {...formData} />}
      {data.collapsible && <Collapsible {...data.collapsible} />}
    </NavWrapperServer>
  );
}
