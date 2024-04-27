import React from "react";

import { IArticle, IBlock } from "../../data";
import styles from "./ArticlePage.module.scss";
import { SEO } from "../SEO";
import FlexDiv from "../reuse/FlexDiv";
import { SanityImage } from "../reuse/SanityImage/SanityImage";
import { Heading } from "../reuse/Heading";
import { Paragraph } from "../reuse/Paragraph";
import { Block } from "./containers/Block";

export interface ArticlePageProps {
  article: IArticle;
}

const blocks = (block: IBlock) => {
  switch (block.style) {
    case "normal":
      return (
        <Paragraph
          key={block._key}
          level="big"
          color="black"
          paddingBottomArray={[2, 3, 3, 4]}
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
          paddingBottomArray={[2, 3, 3, 4]}
        >
          {block.children.map((child) => child.text).join("")}
        </Heading>
      );
  }
};
export const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
  console.log(article.content);
  return (
    article && (
      <>
        <SEO
          title={article.title}
          description={article.desc}
          imgUrl="https://i.imgur.com/u9EH6vH.png"
          url="https://www.setoxarts.com/en/about-work"
        />
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
              {article.date}
            </Paragraph>
            <Heading
              level="3"
              as="h1"
              font="Seto"
              color="black"
              paddingBottomArray={[1, 0]}
            >
              {article.title}
            </Heading>

            <SanityImage {...article.customImage} />

            <FlexDiv
              flex={{ direction: "column", x: "flex-start" }}
              className={styles.text}
              height100
              gapArray={[1, 2, 2, 3]}
              as="header"
            >
              {article.content?.map((block) => {
                return blocks(block);
              })}
            </FlexDiv>
          </FlexDiv>
        </Block>
      </>
    )
  );
};
