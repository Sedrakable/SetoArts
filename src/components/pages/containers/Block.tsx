import React, { PropsWithChildren, forwardRef } from "react";
import styles from "./Block.module.scss";

import cn from "classnames";
import { ITheme } from "@/data.d";
import FlexDiv from "@/components/reuse/FlexDiv";
import {
  FancyTitle,
  FancyTitleProps,
} from "@/components/reuse/FancyTitle/FancyTitle";
import { AnimatedWrapper } from "./AnimatedWrapper/AnimatedWrapper";

interface BlockProps {
  fancyTitle?: FancyTitleProps;
  theme: ITheme;
  shadow?: boolean;
  contentSize?: "small" | "default";
  className?: string;
  id?: string;
}

// ✅ Add forwardRef to support refs
export const Block = forwardRef<HTMLDivElement, PropsWithChildren<BlockProps>>(
  (
    {
      fancyTitle,
      theme = "dark",
      shadow = false,
      children,
      contentSize = "default",
      id,
      className,
    },
    ref,
  ) => {
    return (
      <FlexDiv
        ref={ref}
        flex={{ direction: "column", y: "flex-start", x: "center" }}
        className={cn(
          styles.block,
          styles[theme],
          styles[`size_${contentSize}`],
          {
            [styles.shadow]: shadow,
          },
          className,
        )}
        gapArray={[7, 7, 7, 8]}
        padding={{
          top: fancyTitle ? [5, 5, 5, 6] : [7, 7, 7, 8],
          bottom: theme === "wood" ? [0] : [8, 9, 9, 10],
          horizontal:
            contentSize === "default" ? [6, 8, 9, 10] : [6, 9, 10, 12],
        }}
        width100
        as="article"
        id={id}
      >
        {fancyTitle && (
          <AnimatedWrapper from="left" className={styles.fancyTitle}>
            <FancyTitle {...fancyTitle} />
          </AnimatedWrapper>
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
  },
);

Block.displayName = "Block"; // Required for debugging with forwardRef
