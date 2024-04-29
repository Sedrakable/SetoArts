import React from "react";
import styles from "./Article.module.scss";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { IArticle, LocalPaths } from "../../../../data.d";
import { Paragraph } from "../../../reuse/Paragraph";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { useWindowResize } from "../../../../helpers/useWindowResize";
import { Link } from "../../../reuse/Link";
import { useAtom } from "jotai";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";

export const Article: React.FC<IArticle> = (article) => {
  const { isMobileOrTablet } = useWindowResize();
  const [lang] = useAtom(langData);
  return (
    <Link path={`/${lang}${LocalPaths.BLOG}/${article.slug.current}`}>
      <FlexDiv
        flex={{
          direction: isMobileOrTablet ? "column" : "row",
          y: "stretch",
        }}
        className={styles.article}
        gapArray={[2, 2, 5, 6]}
        padding={{ all: [2, 3, 3, 4] }}
        as="article"
      >
        <div className={styles.imgWrapper}>
          <SanityImage {...article.customImage} />
        </div>
        <FlexDiv
          flex={{ direction: "column" }}
          className={styles.text}
          height100
          gapArray={[1, 2, 2, 3]}
          as="header"
        >
          <Heading
            level="4"
            as="h1"
            font="Seto"
            color="black"
            paddingBottomArray={[1, 0]}
          >
            {article.title}
          </Heading>
          <Paragraph level="regular" color="black">
            {article.desc}
          </Paragraph>
          <Paragraph level="big" color="yellow" weight="regular">
            {article.date}
          </Paragraph>
        </FlexDiv>
      </FlexDiv>
    </Link>
  );
};