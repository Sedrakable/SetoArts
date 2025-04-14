"use client";
import React, { useState, useEffect } from "react";
import styles from "./WorkBlock.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { Block } from "../../containers/Block";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { useScrollToTarget } from "@/helpers/useScrollToTarget";
import { ITheme, IWork, IWorkBlock, LocalTargets } from "../../../../data.d";
import { useWindowResize } from "@/helpers/useWindowResize";
import Link from "next/link";
import { getOptimalColumnCount } from "@/helpers/getOptimalColumnCount";
// import { ImageSlider } from "@/components/reuse/ImageSlider";

// Define image widths for each column count at each breakpoint
const imageWidthsByColumns = {
  1: { mobile: "100vw", tablet: 600, laptop: 800, desktop: 1000 }, // Full-width
  2: { mobile: "50vw", tablet: 300, laptop: 400, desktop: 600 },
  3: { mobile: "33vw", tablet: 200, laptop: 300, desktop: 400 },
  4: { mobile: "25vw", tablet: 150, laptop: 250, desktop: 350 },
  5: { mobile: "20vw", tablet: 120, laptop: 200, desktop: 300 },
};

const getImageSizes = (columnCount: number) => {
  const widths =
    imageWidthsByColumns[columnCount as keyof typeof imageWidthsByColumns] ||
    imageWidthsByColumns[1];
  return `(max-width: 640px) ${widths.mobile}, (max-width: 1200px) ${widths.tablet}px, (max-width: 1680px) ${widths.laptop}px, ${widths.desktop}px`;
};

const Work: React.FC<IWork & { columnCount: number }> = ({
  title,
  thumbnailImage,
  link,
  images,
  workType,
  columnCount,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inferAction = (): "link" | "modal" | "none" => {
    switch (workType) {
      case "wood":
        return "modal";
      case "branding":
      case "website":
      case "cards":
        return "link";
      case "gallery":
        return "none";
      default:
        return "none";
    }
  };

  const action = inferAction();
  const handleClick = () => {
    if (action === "modal" && images) setIsModalOpen(true);
  };

  const content = (
    <FlexDiv
      width100
      className={styles.card}
      onClick={action === "modal" ? handleClick : undefined}
    >
      <SanityImage
        {...thumbnailImage}
        quality={90}
        sizes={getImageSizes(columnCount)}
        figureclassname={styles.image} // Note: Kept your prop name as-is
      />
      {title && (
        <Heading
          font="Outfit"
          level="3"
          as="h3"
          color="white"
          textAlign="start"
          className={styles.title}
          weight={800}
        >
          {title}
        </Heading>
      )}
      {/* {action === "modal" && images && isModalOpen && (
        <ImageSlider images={images} onClose={() => setIsModalOpen(false)} />
      )} */}
    </FlexDiv>
  );

  return action === "link" && link ? (
    <Link href={link} className={styles.link}>
      {content}
    </Link>
  ) : (
    content
  );
};

interface WorkBlockProps extends IWorkBlock {
  theme: ITheme;
}
export const WorkBlock: React.FC<WorkBlockProps> = ({
  works,
  title,
  id,
  theme,
}) => {
  const { isMobile, isTablet, isLaptop } = useWindowResize();
  const { scrollToTarget } = useScrollToTarget();

  useEffect(() => {
    if (window.location.hash === `#${id}`) {
      scrollToTarget(id as LocalTargets);
    }
  }, [id, scrollToTarget]);

  const getColumnRange = () => {
    if (isMobile) return { min: 1, max: 1 };
    if (isTablet) return { min: 2, max: 3 };
    if (isLaptop) return { min: 3, max: 4 };
    return { min: 4, max: 5 }; // Desktop
  };

  const { min, max } = getColumnRange();
  const columnCount =
    works.length === 1
      ? 1 // Full-width for single item (e.g., Branding)
      : getOptimalColumnCount(works.length, min, max);

  return (
    <Block
      title={{ font: "Outfit", children: title, color: "black", weight: 900 }}
      theme={theme}
      id={id}
    >
      <FlexDiv
        id={id}
        gapArray={[4]}
        flex={{ y: "flex-start" }}
        width100
        className={cn(styles.workBlock, styles[theme])}
        wrap
        customStyle={{ ["--columns" as any]: columnCount }}
      >
        {works.map((work, index) => (
          <FlexDiv
            key={index}
            style={{
              flex: `1 1 ${works.length === 1 ? 100 : 100 / columnCount}%`,
            }}
          >
            <Work {...work} columnCount={columnCount} />
          </FlexDiv>
        ))}
      </FlexDiv>
    </Block>
  );
};
