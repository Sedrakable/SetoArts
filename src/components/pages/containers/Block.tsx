import React, { PropsWithChildren, forwardRef } from "react";
import styles from "./Block.module.scss";
import FlexDiv from "../../reuse/FlexDiv";
import cn from "classnames";
import { Heading, HeadingProps } from "@/components/reuse/Heading";
import { ITheme } from "@/data.d";

interface BlockProps {
  title?: Omit<HeadingProps, "level" | "as">;
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
      title,
      theme = "dark",
      shadow = false,
      children,
      contentSize = "default",
      id,
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
          styles[theme],
          styles[`size_${contentSize}`],
          {
            [styles.shadow]: shadow,
          },
          className
        )}
        gapArray={[7, 7, 7, 8]}
        padding={{
          top: [6, 5, 5, 6],
          bottom: theme === "wood" ? [0] : [8, 9, 9, 10],
          horizontal:
            contentSize === "default" ? [6, 8, 9, 10] : [6, 9, 10, 12],
        }}
        width100
        as="article"
        id={id}
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
