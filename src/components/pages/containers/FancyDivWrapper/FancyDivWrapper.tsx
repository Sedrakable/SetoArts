"use client";
import React, { forwardRef, PropsWithChildren } from "react";
import styles from "./FancyDivWrapper.module.scss";
import cn from "classnames";
import FlexDiv from "@/components/reuse/FlexDiv";

export interface FancyDivWrapperProps {
  className?: string;
}

// ✅ Add forwardRef to support refs
export const FancyDivWrapper = forwardRef<
  HTMLDivElement,
  PropsWithChildren<FancyDivWrapperProps>
>(({ className, children }, ref) => {
  return (
    <FlexDiv
      ref={ref}
      flex={{ y: "center", x: "center" }}
      width100
      padding={{ all: [5], bottom: [6], top: [4] }}
      className={cn(styles.wrapper, className)}
    >
      {children}
    </FlexDiv>
  );
});

FancyDivWrapper.displayName = "FancyDivWrapper"; // Required for debugging with forwardRef
