import React, { PropsWithChildren } from "react";
import styles from "./Block.module.scss";
import FlexDiv from "../../reuse/FlexDiv";
import Image from "next/image";
import cn from "classnames";
import { Title } from "../../reuse/Title/Title";
import bigStroke from "/public/photos/BigStroke.webp";

export const BlockVariants = ["grid", "dark", "fabric", "fabric-hori"] as const;

export type BlockVariantType = typeof BlockVariants[number];

interface BlockProps {
  title: string;
  variant: BlockVariantType;
  strokes?: boolean;
  shadow?: boolean;
  hero?: boolean;
}
export const Block: React.FC<PropsWithChildren<BlockProps>> = ({
  title,
  variant = "dark",
  shadow = true,
  hero = false,
  strokes,
  children,
}) => {
  return (
    <FlexDiv
      flex={{ direction: "column" }}
      className={cn(styles.block, styles[variant], {
        [styles.light]: variant !== "dark" && shadow,
        [styles.hero]: hero,
      })}
      gapArray={[5, 6, 6, 7]}
      padding={{ top: [6, 7, 7, 8], bottom: [8, 8, 8, 9] }}
      width100
      as="article"
    >
      <Title title={title} color={variant === "dark" ? "white" : "black"} />
      {strokes && variant === "dark" && (
        <div className={styles.strokes}>
          <Image src={bigStroke.src} alt="stroke" width={800} height={200} />
          <Image src={bigStroke.src} alt="stroke" width={800} height={200} />
          <Image src={bigStroke.src} alt="stroke" width={800} height={200} />
        </div>
      )}
      <FlexDiv
        className={styles.content}
        width100
        flex={{ direction: "column" }}
      >
        {children}
      </FlexDiv>
    </FlexDiv>
  );
};
