import React from "react";

import { useFetchPage } from "@/app/api/useFetchPage";
import { IArticle, ISeo, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import dynamic from "next/dynamic";
import { articlePageQuery } from "@/app/api/generateSanityQueries";

const ArticlePageComp = dynamic(
  () =>
    import("@/components/pages/ArticlePage/ArticlePage").then(
      (module) => module.ArticlePageComp
    ),
  {
    ssr: false,
  }
);

interface ArticlePageProps extends IArticle {
  meta: ISeo;
}

const getArticlePageData = async (locale: LangType, slug: string) => {
  const type = "articlePage";
  const articleQuery = articlePageQuery(locale, slug);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const articleData: ArticlePageProps = await useFetchPage(
    articleQuery,
    `${type}-${slug}`
  );

  return articleData;
};

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}): Promise<Metadata> {
  const articlePageData: ArticlePageProps = await getArticlePageData(
    locale,
    slug
  );
  const { metaTitle, metaDesc, metaKeywords } = articlePageData.meta;
  const path = `${LocalPaths.BLOG}/${slug}`;
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

export default async function ArticlePage({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}) {
  const articleData: ArticlePageProps = await getArticlePageData(locale, slug);
  return articleData && <ArticlePageComp {...articleData} />;
}
