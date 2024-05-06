import React from "react";
import styles from "./ArticlePage.module.scss";
import { useFetchPage } from "@/app/api/useFetchPage";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { Paragraph } from "@/components/reuse/Paragraph";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import { IArticle, IBlock, ISeo, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";

interface ArticlePageProps extends IArticle {
  meta: ISeo;
}
const getArticlePageData = async (locale: LangType, slug: string) => {
  const type = "articlePage";
  const articleQuery = `*[_type == '${type}' && lang == '${locale}' && path == '${slug}'][0]{
    ...,
    meta,
  }`;
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

const blocks = (block: IBlock) => {
  switch (block.style) {
    case "normal":
      return (
        <Paragraph
          key={block._key}
          level="regular"
          color="black"
          paddingBottomArray={[4, 5, 5, 6]}
        >
          {block.children.map((child) => child.text).join("")}
        </Paragraph>
      );
    case "blockquote":
      return (
        <Heading
          font="Cursive"
          key={block._key}
          as="h6"
          level="5"
          color="yellow"
          paddingBottomArray={[2, 3, 3, 4]}
        >
          {block.children.map((child) => child.text).join("")}
        </Heading>
      );
    default:
      return (
        <Heading
          font="Seto"
          key={block._key}
          as={block.style!}
          level={block.style!.substring(1) as "1" | "2" | "3" | "4" | "5"}
          color="black"
          paddingBottomArray={[2]}
        >
          {block.children.map((child) => child.text).join("")}
        </Heading>
      );
  }
};

export default async function ArticlePage({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}) {
  const articleData: ArticlePageProps = await getArticlePageData(locale, slug);
  return (
    articleData && (
      <Block title="Article" variant="grid">
        <FlexDiv
          flex={{
            direction: "column",
          }}
          className={styles.article}
          gapArray={[2, 2, 3, 4]}
          padding={{ all: [2, 3, 3, 4] }}
          as="article"
        >
          <Paragraph level="big" color="yellow" weight="regular">
            {articleData.date}
          </Paragraph>
          <Heading
            level="3"
            as="h1"
            font="Seto"
            color="black"
            paddingBottomArray={[1, 0]}
          >
            {articleData.title}
          </Heading>

          <SanityImage {...articleData.customImage} />

          <FlexDiv
            flex={{ direction: "column", x: "flex-start" }}
            className={styles.text}
            height100
            as="section"
          >
            {articleData.content?.map((block) => {
              return blocks(block);
            })}
          </FlexDiv>
        </FlexDiv>
      </Block>
    )
  );
}
