import { Block } from "@/components/pages/containers/Block";
import { Button } from "@/components/reuse/Button";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { Paragraph } from "@/components/reuse/Paragraph";
import { INotFound, LocalPaths } from "@/data.d";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n";
import { useFetchPage } from "../api/useFetchPage";

export const NotFoundComp: React.FC<{ data: INotFound; locale: LangType }> = ({
  data,
  locale,
}) => {
  const translations = getTranslations(locale);
  return (
    data && (
      <>
        {/* FIX */}
        {/* <Helmet>
              <meta name="robots" content="noindex, nofollow" />
            </Helmet> */}
        <Block title="404" variant="grid">
          <FlexDiv flex={{ direction: "column" }} gapArray={[3, 4, 4, 5]}>
            <Heading
              as="h1"
              level="1"
              font="Cursive"
              color="black"
              textAlign="center"
            >
              {data.title}
            </Heading>
            <Paragraph
              level="big"
              color="black"
              textAlign="center"
              paddingBottomArray={[4]}
            >
              {data.desc}
            </Paragraph>
            <Button variant="primary" path={`/${locale}${LocalPaths.HOME}`}>
              {translations.nav.home}
            </Button>
          </FlexDiv>
        </Block>
      </>
    )
  );
};

export default async function NotFound({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const type = "notFoundPage";
  const notFoundQuery = `*[_type == '${type}' && lang == '${locale}'][0]`;
  const notFoundPageData: INotFound = await useFetchPage(notFoundQuery, type);
  return <NotFoundComp data={notFoundPageData} locale={locale} />;
}
