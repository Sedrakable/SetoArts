import { IForm, ISeo, LocalPaths } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { contactPageQuery } from "@/app/api/generateSanityQueries";
import { ContactBlock } from "@/components/pages/contact page/ContactBlock";

export interface ContactPageProps extends IForm {
  meta: ISeo;
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
  const contactPageData: ContactPageProps = await getContactPageData(locale);
  return contactPageData && <ContactBlock {...contactPageData} />;
}
