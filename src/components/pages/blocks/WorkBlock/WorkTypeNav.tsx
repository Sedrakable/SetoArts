"use client";
import React from "react";
import styles from "./WorkTypeNav.module.scss";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { useSvgComponent } from "@/helpers/useSvgComponent";
import { useScrollToTarget } from "@/helpers/useScrollToTarget";
import { LocalTargets } from "@/data.d";
import { getTranslations } from "@/helpers/langUtils";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import GridDiv from "@/components/reuse/GridDiv";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";

interface WorkTypeItemProps {
  title: string;
  svgName: string;
  targetId: LocalTargets;
}

const WorkTypeItem: React.FC<WorkTypeItemProps> = ({
  title,
  svgName,
  targetId,
}) => {
  const SvgComponent = useSvgComponent(svgName);
  const { scrollToTarget } = useScrollToTarget();

  const handleClick = () => {
    scrollToTarget(targetId);
  };

  return (
    <FlexDiv
      flex={{ direction: "column", x: "center" }}
      width100
      className={styles.item}
      as="button"
      gapArray={[2, 3, 3, 4]}
      onClick={handleClick}
      padding={{ all: [4, 5, 5, 6] }}
    >
      {SvgComponent && <SvgComponent className={styles.svg} />}
      {/* <div className={styles.square}>ree</div> */}
      <Heading
        font="Outfit"
        level="5"
        as="h3"
        color="black"
        weight={700}
        textAlign="center"
      >
        {title}
      </Heading>
    </FlexDiv>
  );
};

export interface WorkTypeNavProps {
  theme?: "light" | "dark";
}

export const WorkTypeNav: React.FC<WorkTypeNavProps> = ({
  theme = "light",
}) => {
  const locale = useLocale() as LangType;
  const trans = getTranslations(locale);

  const items: WorkTypeItemProps[] = [
    {
      title: trans.work.branding,
      svgName: "branding-mockups",
      targetId: LocalTargets.BRANDINGWORK,
    },
    {
      title: trans.work.web,
      svgName: "web-ui-ux",
      targetId: LocalTargets.WEBWORK,
    },
    {
      title: trans.work.wood,
      svgName: "wood-magnetic-lid",
      targetId: LocalTargets.WOODSIGNWORK,
    },
    {
      title: trans.work.cards,
      svgName: "cards",
      targetId: LocalTargets.CARDSWORK,
    },
    // {
    //   title: trans.work.gallery,
    //   svgName: "branding-moodboard",
    //   targetId: LocalTargets.GALLERYWORK,
    // },
  ];

  return (
    <Block
      title={{
        children: trans.titles.explore,
        font: "Outfit",
        color: "black",
        weight: 900,
      }}
      theme={theme}
      className={styles.block}
    >
      <GridDiv
        gapArray={[6, 4, 4, 4]}
        columns={[
          [1, 1],
          [2, 2],
          [4, 5],
          [4, 5],
        ]}
        width100
        as="nav"
      >
        {items.map((item, index) => (
          <AnimatedWrapper from="inside" key={index}>
            <WorkTypeItem {...item} />
          </AnimatedWrapper>
        ))}
      </GridDiv>
    </Block>
  );
};
