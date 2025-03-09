import React, { PropsWithChildren, forwardRef } from "react";
import styles from "./Block.module.scss";
import FlexDiv from "../../reuse/FlexDiv";
import cn from "classnames";
import { Title } from "../../reuse/Title/Title";
import { Heading, HeadingProps } from "@/components/reuse/Heading";

export const BlockVariants = ["light", "dark", "wood"] as const;

export type BlockVariantType = typeof BlockVariants[number];

interface BlockProps {
  title?: Omit<HeadingProps, "level" | "as">;
  variant: BlockVariantType;
  shadow?: boolean;
  contentSize?: "small" | "default";
  className?: string;
}

// ✅ Add forwardRef to support refs
export const Block = forwardRef<HTMLDivElement, PropsWithChildren<BlockProps>>(
  (
    {
      title,
      variant = "dark",
      shadow = false,
      children,
      contentSize = "default",
      className,
    },
    ref
  ) => {
    return (
      <FlexDiv
        ref={ref}
        flex={{ direction: "column" }}
        className={cn(
          styles.block,
          styles[variant],
          styles[`size_${contentSize}`],
          {
            [styles.shadow]: shadow,
          },
          className
        )}
        gapArray={[5, 6, 6, 7]}
        padding={{
          top: [4, 5, 5, 6],
          bottom: variant === "wood" ? [0] : [8, 9, 9, 10],
          horizontal:
            contentSize === "default" ? [6, 8, 9, 10] : [6, 9, 10, 12],
        }}
        width100
        as="article"
      >
        {title && (
          <Heading {...title} as="h2" level="2" textAlign="center">
            {title.children}
          </Heading>
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
  }
);

Block.displayName = "Block"; // Required for debugging with forwardRef
