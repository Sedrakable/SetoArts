import React from "react";
import { Article } from "./Article";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import FlexDiv from "@/components/reuse/FlexDiv";
import { IBlog } from "@/data.d";
import { Block } from "../../containers/Block";
import { getTranslations } from "@/helpers/langUtils";

export const Blog: React.FC<IBlog> = ({ articles }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
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
