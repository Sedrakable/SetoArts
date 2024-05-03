import React from "react";
import { ILegalPage } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { Paragraph } from "@/components/reuse/Paragraph";
import { LangType } from "@/i18n";

export default async function LegalPage({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}) {
  const legalQuery = `*[_type == 'legalPage' && lang == '${locale}' && path == '/${slug}'][0]`;
  const legalPageData: ILegalPage = await useFetchPage(legalQuery, slug);
  return (
    legalPageData && (
      <>
        {/* FIX */}
        {/* <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet> */}
        <Block title={legalPageData.title} variant="dark">
          <FlexDiv flex={{ direction: "column", x: "flex-start" }}>
            {legalPageData?.data?.map((block) => {
              return (
                <div key={block._key}>
                  {block.children?.map((child) =>
                    child.marks[0] === "strong" ? (
                      <Heading
                        font="Seto"
                        key={child._key}
                        as="h5"
                        level="5"
                        color="yellow"
                        paddingBottomArray={[1, 2, 2, 3]}
                      >
                        {child.text}
                      </Heading>
                    ) : (
                      <Paragraph
                        key={child._key}
                        level="regular"
                        color="white"
                        paddingBottomArray={[2, 3, 3, 4]}
                      >
                        {child.text}
                      </Paragraph>
                    )
                  )}
                </div>
              );
            })}
          </FlexDiv>
        </Block>
      </>
    )
  );
}
