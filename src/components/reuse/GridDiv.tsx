"use client";
import React, { ElementType, HTMLAttributes, PropsWithChildren } from "react";
import {
  useSpacingGenerator,
  SpacingArrayType,
  SpacingType,
} from "../../helpers/SpacingGenerator";
import { useWindowResize } from "../../helpers/useWindowResize";
import { getOptimalColumnCount } from "../../helpers/getOptimalColumnCount";
import { PaddingProps } from "./FlexDiv";

type ColumnRange = [number, number];

export interface GridDivProps<T extends ElementType = "div"> {
  gapArray?: SpacingArrayType;
  rowGapArray?: SpacingArrayType; // Optional row gap override
  padding?: PaddingProps;
  columns?: [ColumnRange, ColumnRange, ColumnRange, ColumnRange]; // [[min,max], ...] for mobile, tablet, laptop, desktop
  fill?: boolean; // New prop to cap columns at itemCount
  height100?: boolean;
  width100?: boolean;
  customStyle?: React.CSSProperties;
  as?: T;
  onColumnCountChange?: (columnCount: number) => void; // New callback prop
}

const useGenerateSpacing = (
  spaceArray: SpacingArrayType | undefined
): SpacingType => {
  const num = useSpacingGenerator(spaceArray).spacingNum!;
  return num;
};

const GridDiv = React.forwardRef(
  <T extends ElementType = "div">(
    {
      children,
      gapArray,
      rowGapArray,
      padding = {},
      columns,
      fill = false,
      height100,
      width100,
      customStyle,
      onColumnCountChange,
      as,
      ...props
    }: PropsWithChildren<GridDivProps<T>> &
      Omit<HTMLAttributes<HTMLDivElement>, "as">,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const Component = as || "div";
    const { isMobile, isTablet, isLaptop, isDesktop } = useWindowResize();

    // Calculate paddings
    const paddingTop =
      padding.top || padding.vertical || padding.all || undefined;
    const paddingBottom =
      padding.bottom || padding.vertical || padding.all || undefined;
    const paddingLeft =
      padding.left || padding.horizontal || padding.all || undefined;
    const paddingRight =
      padding.right || padding.horizontal || padding.all || undefined;

    const paddings = {
      top: useGenerateSpacing(paddingTop),
      right: useGenerateSpacing(paddingRight),
      bottom: useGenerateSpacing(paddingBottom),
      left: useGenerateSpacing(paddingLeft),
    };

    const paddingString = Object.entries(paddings)
      ?.map(([, value]) => (value ? `var(--pad-${value})` : 0))
      .join(" ");

    // Calculate gaps
    const columnGapNum = useGenerateSpacing(gapArray);
    const rowGapNum = useGenerateSpacing(rowGapArray || gapArray); // Fallback to gapArray

    // Determine column count
    const getColumnRange = (): ColumnRange => {
      if (!columns) return [1, 1]; // Default
      const [mobile, tablet, laptop, desktop] = columns;
      if (isMobile) return mobile;
      if (isTablet) return tablet;
      if (isLaptop) return laptop;
      if (isDesktop) return desktop;
      return desktop; // Fallback
    };

    const [min, max] = getColumnRange(); // Fixed destructuring
    const itemCount = React.Children.count(children);
    const columnCount = getOptimalColumnCount(itemCount, min, max);
    const finalColumnCount =
      fill && itemCount < columnCount ? itemCount : columnCount;

    // Call the callback with finalColumnCount
    React.useEffect(() => {
      if (onColumnCountChange) {
        onColumnCountChange(finalColumnCount);
      }
    }, [finalColumnCount, onColumnCountChange]);

    return (
      <Component
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${finalColumnCount}, 1fr)`,
          columnGap: columnGapNum ? `var(--pad-${columnGapNum})` : undefined,
          rowGap: rowGapNum ? `var(--pad-${rowGapNum})` : undefined,
          padding: paddingString,
          height: height100 ? "100%" : undefined,
          width: width100 ? "100%" : undefined,
          boxSizing: "border-box",
          ...customStyle,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

GridDiv.displayName = "GridDiv";
export default GridDiv;
