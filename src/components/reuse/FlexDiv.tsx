"use client";
import React, {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import {
  useSpacingGenerator,
  SpacingArrayType,
  SpacingType,
} from "../../helpers/SpacingGenerator";

interface FlexProps {
  direction?: CSSProperties["flexDirection"];
  x?: CSSProperties["justifyContent"];
  y?: CSSProperties["justifyContent"];
}
export interface FlexDivProps<T extends ElementType = "div"> {
  gapArray?: SpacingArrayType;
  padding?: PaddingProps;
  flex?: FlexProps;
  height100?: boolean;
  width100?: boolean;
  customStyle?: React.CSSProperties;
  wrap?: boolean;
  as?: T; // Add the 'as' prop
}

interface PaddingProps {
  all?: SpacingArrayType;
  horizontal?: SpacingArrayType;
  vertical?: SpacingArrayType;
  top?: SpacingArrayType;
  bottom?: SpacingArrayType;
  left?: SpacingArrayType;
  right?: SpacingArrayType;
}

const useGenerateSpacing = (
  spaceArray: SpacingArrayType | undefined
): SpacingType => {
  const num = useSpacingGenerator(spaceArray).spacingNum!;
  return num;
};

const FlexDiv = React.forwardRef(
  <T extends ElementType = "div">(
    {
      children,
      gapArray,
      padding = {},
      flex,
      height100,
      width100,
      wrap,
      customStyle,
      as, // Add the 'as' prop to the destructured props
      ...props
    }: PropsWithChildren<FlexDivProps<T>> &
      Omit<HTMLAttributes<HTMLDivElement>, "as">,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const Component = as || "div"; // Use the provided 'as' prop, or fallback to 'div'

    // Calculate paddings outside of the object
    const paddingTop =
      padding.top || padding.vertical || padding.all || undefined;
    const paddingBottom =
      padding.bottom || padding.vertical || padding.all || undefined;
    const paddingLeft =
      padding.left || padding.horizontal || padding.all || undefined;
    const paddingRight =
      padding.right || padding.horizontal || padding.all || undefined;

    //The order is super important here
    const paddings = {
      top: useGenerateSpacing(paddingTop),
      right: useGenerateSpacing(paddingRight),
      bottom: useGenerateSpacing(paddingBottom),
      left: useGenerateSpacing(paddingLeft),
    };

    const { spacingNum: gapNum } = useSpacingGenerator(gapArray);
    const { direction, x, y } = {
      x: "center",
      y: "center",
      ...flex,
    } as FlexProps;

    const paddingString = Object.entries(paddings)
      ?.map(([, value]) => (value ? `var(--pad-${value})` : 0))
      .join(" ");

    return (
      <Component
        ref={ref}
        style={{
          gap: gapNum && `var(--pad-${gapNum})`,
          display: "flex",
          padding: paddingString,
          flexDirection: direction,
          justifyContent: direction === "column" ? y : x,
          alignItems: direction === "column" ? x : y,
          height: height100 ? "100%" : undefined,
          width: width100 ? "100%" : undefined,
          boxSizing: "border-box",
          flexWrap: wrap ? "wrap" : "nowrap",
          ...customStyle,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

FlexDiv.displayName = "FlexDiv";
export default FlexDiv;
