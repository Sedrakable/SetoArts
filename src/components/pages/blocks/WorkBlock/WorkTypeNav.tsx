"use client";
import React from "react";
import styles from "./WorkTypeNav.module.scss";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Heading";
import { useSvgComponent } from "@/helpers/useSvgComponent";
import { useWindowResize } from "@/helpers/useWindowResize";
import { getOptimalColumnCount } from "@/helpers/getOptimalColumnCount";
import { useScrollToTarget } from "@/helpers/useScrollToTarget";
import { LocalTargets } from "@/data.d";
import { getTranslations } from "@/helpers/langUtils";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";

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
  const { isMobile, isTablet, isLaptop } = useWindowResize();
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
      svgName: "Cards",
      targetId: LocalTargets.CARDSWORK,
    },
    {
      title: trans.work.gallery,
      svgName: "branding-moodboard",
      targetId: LocalTargets.GALLERYWORK,
    },
  ];

  const getColumnRange = () => {
    if (isMobile) return { min: 1, max: 1 };
    if (isTablet) return { min: 2, max: 3 };
    if (isLaptop) return { min: 3, max: 4 };
    return { min: 4, max: 5 }; // Desktop
  };

  const { min, max } = getColumnRange();
  const columnCount = getOptimalColumnCount(items.length, min, max);

  return (
    <Block
      title={{
        children: "Explore My Work",
        font: "Outfit",
        color: "black",
        weight: 900,
      }}
      theme={theme}
      className={styles.block}
    >
      <FlexDiv
        customStyle={{ ["--columns" as any]: columnCount }}
        gapArray={[2, 3, 3, 4]}
        flex={{ y: "flex-start" }}
        width100
        className={styles.nav}
        as="nav"
        wrap
      >
        {items.map((item, index) => (
          <WorkTypeItem {...item} key={index} />
        ))}
      </FlexDiv>
    </Block>
  );
};
