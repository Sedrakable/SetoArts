import { IFancyText, ISeo, LocalPaths } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { Form } from "@/components/pages/contact page/Form";
import { Block } from "@/components/pages/containers/Block";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";

export interface ContactPageProps {
  meta: ISeo;
  desc: IFancyText;
}

const getContactPageData = async (locale: LangType) => {
  const type = "contactPage";
  const contactQuery = `*[_type == '${type}' && lang == '${locale}'][0] {
    meta,
    desc,
  }`;
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
  const contactPageData = await getContactPageData(locale);
  return (
    contactPageData && (
      <Block variant="dark" strokes title={translations.blockTitles.contact}>
        <Form desc={contactPageData.desc} />
      </Block>
    )
  );
}
