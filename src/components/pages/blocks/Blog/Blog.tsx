import React from "react";
import FlexDiv from "../../../reuse/FlexDiv";
import { IBlog } from "../../../../data.d";
import { useAtom } from "jotai";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";
import { getTranslations } from "../../../../helpers/langUtils";
import { Block } from "../../containers/Block";
import { Article } from "./Article";

export const Blog: React.FC<IBlog> = ({ articles }) => {
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

  return (
    articles && (
      <Block title={translations.blockTitles.blog} variant="grid">
        <FlexDiv
          width100
          flex={{ direction: "column" }}
          gapArray={[6, 7, 7, 8]}
        >
          {articles.map((article, index) => {
            return <Article {...article} key={index} />;
          })}
        </FlexDiv>
      </Block>
    )
  );
};
