import { ICollapsible, IHeroV2, ISeo, LocalPaths } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { contactPageQuery } from "@/app/api/generateSanityQueries";

import NavWrapperServer from "@/components/pages/NavWrapper/NavWrapperServer";
import { getTranslations } from "@/helpers/langUtils";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import { getFormData } from "@/components/reuse/Form/getFormData";
import { ImageAndQuote } from "@/components/pages/DigitalPage/ImageAndQuote";
import { HeroV2 } from "@/components/reuse/Hero/Hero";
import { Collapsible } from "@/components/reuse/Collapsible/Collapsible";

export interface ContactPageProps {
  meta: ISeo;
  hero: IHeroV2;
  collapsibles: ICollapsible[];
}

const getContactPageData = async (locale: LangType) => {
  const type = "contactPage";
  const contactQuery = contactPageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contactPageData: ContactPageProps = await useFetchPage(
    contactQuery,
    type
  );
  return contactPageData;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const contactPageData = await getContactPageData(locale);
  const { metaTitle, metaDesc, metaKeywords } = contactPageData.meta;
  const path = LocalPaths.CONTACT;
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

export default async function Contact({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const translations = getTranslations(locale);
  const data = await getContactPageData(locale);
  const formData: FormTitleProps = await getFormData("digital", locale);
  return (
    <NavWrapperServer locale={locale} theme="dark">
      {data.hero && <HeroV2 {...data.hero} />}
      {formData && <ImageAndQuote {...formData} />}

      {data.collapsibles?.map((collapsible: ICollapsible, key) => {
        return <Collapsible {...collapsible} key={key} />;
      })}
    </NavWrapperServer>
  );
}
