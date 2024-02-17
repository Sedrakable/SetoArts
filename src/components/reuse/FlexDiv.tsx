import React, { PropsWithChildren } from "react";
import {
  useSpacingGenerator,
  SpacingArrayType,
  SpacingType,
} from "../../helpers/SpacingGenerator";

type Justify =
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch";
interface FlexProps {
  direction?: "row" | "column";
  x?: Justify;
  y?: Justify;
}
export interface FlexDivProps {
  gapArray?: SpacingArrayType;
  padding?: PaddingProps;
  flex?: FlexProps;
  height100?: boolean;
  width100?: boolean;
  customStyle?: React.CSSProperties;
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

export const FlexDiv: React.FC<PropsWithChildren<
  FlexDivProps & React.HTMLAttributes<HTMLDivElement>
>> = ({
  children,
  gapArray,
  padding = {},
  flex,
  height100,
  width100,
  customStyle,
  ...props
}) => {
  // Calculate paddings outside of the object
  const paddingTop =
    padding.top || padding.vertical || padding.all || undefined;
  const paddingBottom =
    padding.bottom || padding.vertical || padding.all || undefined;
  const paddingLeft = padding.left || padding.horizontal || undefined;
  const paddingRight = padding.right || padding.horizontal || undefined;

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
    .map(([_key, value]) => (value ? `var(--pad-${value})` : 0))
    .join(" ");

  return (
    <div
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
        ...customStyle,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
