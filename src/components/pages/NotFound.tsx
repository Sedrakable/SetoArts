import React from "react";
import { Button } from "../reuse/Button";
import { useAtom } from "jotai";
import { langData } from "../navbar/LangSwitcher/LangSwitcher";
import { Block } from "./containers/Block";
import { Heading } from "../reuse/Heading";
import { Paragraph } from "../reuse/Paragraph";
import FlexDiv from "../reuse/FlexDiv";
import { INotFound } from "../../data";
import { useFetchPage } from "../../api/useFetchPage";
export const NotFound: React.FC = () => {
  const [lang] = useAtom(langData);

  const notFoundQuery = `*[_type == 'notFoundPage' && lang == '${lang}'][0]`;

  const notFoundPageData: INotFound = useFetchPage(notFoundQuery)!;

  return (
    notFoundPageData && (
      <Block title="404" variant="grid">
        <FlexDiv flex={{ direction: "column" }} gapArray={[3, 4, 4, 5]}>
          <Heading
            as="h1"
            level="1"
            font="Cursive"
            color="black"
            textAlign="center"
          >
            {notFoundPageData.title}
          </Heading>
          <Paragraph
            level="big"
            color="black"
            textAlign="center"
            paddingBottomArray={[4]}
          >
            {notFoundPageData.desc}
          </Paragraph>
          <Button variant="primary" path={`/${lang}/home`}>
            {notFoundPageData.cta.text}
          </Button>
        </FlexDiv>
      </Block>
    )
  );
};
