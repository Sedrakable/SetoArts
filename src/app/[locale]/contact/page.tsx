import { SEO } from "@/components/SEO";
import { IFancyText } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { Form } from "@/components/pages/contact page/Form";
import { Block } from "@/components/pages/containers/Block";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n";

export interface ContactPageProps {
  title: string;
  metaDesc: string;
  desc: IFancyText;
}

export default async function Contact({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const translations = getTranslations(locale);
  const contactQuery = `*[_type == 'contactPage' && lang == '${locale}'][0] {
    ...,
    title,
    metaDesc,
    desc,
  }`;
  const contactPageData: ContactPageProps = await useFetchPage(
    contactQuery,
    "contactPage"
  );
  return (
    contactPageData && (
      <>
        <SEO
          title={contactPageData.title}
          description={contactPageData.metaDesc}
          imgUrl="https://i.imgur.com/u9EH6vH.png"
          url="https://www.setoxarts.com/en/home"
        />
        <Block variant="dark" strokes title={translations.blockTitles.contact}>
          <Form desc={contactPageData.desc} />
        </Block>
      </>
    )
  );
}
