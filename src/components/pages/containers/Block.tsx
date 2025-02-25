import React, { PropsWithChildren } from "react";
import styles from "./Block.module.scss";
import FlexDiv from "../../reuse/FlexDiv";
import cn from "classnames";
import { Title } from "../../reuse/Title/Title";

export const BlockVariants = ["light", "dark", "wood"] as const;

export type BlockVariantType = typeof BlockVariants[number];

interface BlockProps {
  title?: string;
  variant: BlockVariantType;
  shadow?: boolean;
  contentSize?: "small" | "default";
}
export const Block: React.FC<PropsWithChildren<BlockProps>> = ({
  title,
  variant = "dark",
  shadow = false,
  children,
  contentSize = "default",
}) => {
  return (
    <FlexDiv
      flex={{ direction: "column" }}
      className={cn(
        styles.block,
        styles[variant],
        styles[`size_${contentSize}`],
        {
          [styles.shadow]: shadow,
        }
      )}
      gapArray={[5, 6, 6, 7]}
      padding={{
        top: [4, 5, 5, 6],
        bottom: variant === "wood" ? [0] : [8, 9, 9, 10],
        horizontal: contentSize === "default" ? [6, 8, 9, 10] : [6, 9, 10, 12],
      }}
      width100
      as="article"
    >
      {title && (
        <Title title={title} color={variant === "dark" ? "white" : "black"} />
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
