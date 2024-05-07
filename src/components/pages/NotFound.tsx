import React from "react";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { Paragraph } from "@/components/reuse/Paragraph";
import { Button } from "../reuse/Button";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n";
import { INotFound, LocalPaths } from "@/data.d";
import { Block } from "./containers/Block";

export const NotFoundComp: React.FC<{ data: INotFound; locale: LangType }> = ({
  data,
  locale,
}) => {
  const translations = getTranslations(locale);
  return (
    data && (
      <>
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
