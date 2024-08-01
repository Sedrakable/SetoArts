"use client";
import React, { FC } from "react";
import styles from "./WorkBlock.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { Block } from "../../containers/Block";
import { IWork, IWorkBlock, LocalPaths } from "../../../../data.d";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { getTranslations } from "../../../../helpers/langUtils";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import Link from "next/link";

const Work: FC<IWork> = (work) => {
  const locale = useLocale() as LangType;

  return (
    <Link
      href={`/${locale}${LocalPaths.ABOUT}/${work?.slug.current}`}
      key={work?.slug.current}
      className={styles.container}
      aria-label={work.title}
    >
      <SanityImage
        {...work?.thumbnailImage}
        quality={50}
        sizes="(max-width: 640px) 60vw"
      />

      <FlexDiv
        width100
        height100
        className={styles.content}
        padding={{ horizontal: [4], top: [4], bottom: [5] }}
        gapArray={[3]}
        as="cite"
      >
        <Heading
          font="Seto"
          level="2"
          as="h3"
          color="white"
          textAlign="center"
          className={styles.title}
        >
          {work.title}
        </Heading>
      </FlexDiv>
    </Link>
  );
};

export const WorkBlock: React.FC<IWorkBlock> = ({ works }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <Block title={translations.blockTitles.work} variant="grid" shadow={false}>
      <FlexDiv
        gapArray={[4]}
        flex={{ y: "flex-start" }}
        width100
        className={cn(styles.workBlock)}
        wrap
      >
        {works?.map((work: IWork) => {
          return <Work {...work} key={work.slug.current} />;
        })}
      </FlexDiv>
    </Block>
  );
};
