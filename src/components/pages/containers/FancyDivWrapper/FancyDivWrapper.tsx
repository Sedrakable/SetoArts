"use client";
import React, { forwardRef, PropsWithChildren } from "react";
import styles from "./FancyDivWrapper.module.scss";
import cn from "classnames";
import FlexDiv from "@/components/reuse/FlexDiv";

export interface FancyDivWrapperProps {
  className?: string;
  fancyCorners?: boolean;
}

// ✅ Add forwardRef to support refs
export const FancyDivWrapper = forwardRef<
  HTMLDivElement,
  PropsWithChildren<FancyDivWrapperProps>
>(({ className, fancyCorners = true, children }, ref) => {
  return (
    <FlexDiv
      ref={ref}
      flex={{ y: "flex-start", x: "center" }}
      width100
      padding={{ all: [5], bottom: [6], top: [4] }}
      className={cn(
        styles.wrapper,
        { [styles.fancyCorners]: fancyCorners },
        className,
      )}
    >
      {children}
    </FlexDiv>
  );
});

FancyDivWrapper.displayName = "FancyDivWrapper"; // Required for debugging with forwardRef
