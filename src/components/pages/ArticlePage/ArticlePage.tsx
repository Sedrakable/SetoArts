"use client";
import styles from "./ArticlePage.module.scss";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { Block } from "@/components/pages/containers/Block";
import { IArticle, IBlock } from "@/data.d";
import { Heading } from "@/components/reuse/Heading";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";

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

export const ArticlePageComp: React.FC<IArticle> = ({
  content,
  date,
  customImage,
  title,
}) => {
  return (
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
          {date}
        </Paragraph>
        <Heading
          level="3"
          as="h1"
          font="Seto"
          color="black"
          paddingBottomArray={[1, 0]}
        >
          {title}
        </Heading>

        <SanityImage {...customImage} />

        <FlexDiv
          flex={{ direction: "column", x: "flex-start" }}
          className={styles.text}
          height100
          as="section"
        >
          {content?.map((block) => {
            return blocks(block);
          })}
        </FlexDiv>
      </FlexDiv>
    </Block>
  );
};
