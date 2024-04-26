import React, { FC } from "react";
import { Button } from "../reuse/Button";
import { useAtom } from "jotai";
import { langData } from "../navbar/LangSwitcher/LangSwitcher";
import { Block } from "./containers/Block";
import { Heading } from "../reuse/Heading";
import { Paragraph } from "../reuse/Paragraph";
import FlexDiv from "../reuse/FlexDiv";
import { INotFound, LocalPaths } from "../../data.d";
import { getTranslations } from "../../helpers/langUtils";
import { Helmet } from "react-helmet-async";

export const NotFound: FC<INotFound> = (props) => {
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

  return (
    props && (
      <>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Block title="404" variant="grid">
          <FlexDiv flex={{ direction: "column" }} gapArray={[3, 4, 4, 5]}>
            <Heading
              as="h1"
              level="1"
              font="Cursive"
              color="black"
              textAlign="center"
            >
              {props.title}
            </Heading>
            <Paragraph
              level="big"
              color="black"
              textAlign="center"
              paddingBottomArray={[4]}
            >
              {props.desc}
            </Paragraph>
            <Button variant="primary" path={`/${lang}${LocalPaths.HOME}`}>
              {translations.nav.home}
            </Button>
          </FlexDiv>
        </Block>
      </>
    )
  );
};
