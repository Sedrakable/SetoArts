"use client";
import { useMemo } from "react";
import { useWindowResize } from "./useWindowResize";

const _SPACINGARRAYCONST = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
] as const;

export type SpacingType = typeof _SPACINGARRAYCONST[number];

export type SpacingArrayType = [
  SpacingType,
  SpacingType?,
  SpacingType?,
  SpacingType?
];

export const useSpacingGenerator = (spacingArray?: SpacingArrayType) => {
  const { isTablet, isLaptop, isDesktop } = useWindowResize();

  const normalizedSpacingArray = useMemo(() => {
    if (!spacingArray) return undefined;

    const normalized = [...spacingArray];
    if (normalized.length === 1) normalized[1] = normalized[0];
    if (normalized.length === 2) normalized[2] = normalized[1];
    if (normalized.length === 3) normalized[3] = normalized[2];

    return normalized as [SpacingType, SpacingType, SpacingType, SpacingType];
  }, [spacingArray]);

  // Instead of useState + useEffect — calculate directly
  const spacingNum = useMemo(() => {
    if (!normalizedSpacingArray) return undefined;
    if (isDesktop) return normalizedSpacingArray[3];
    if (isLaptop) return normalizedSpacingArray[2];
    if (isTablet) return normalizedSpacingArray[1];
    return normalizedSpacingArray[0];
  }, [isTablet, isLaptop, isDesktop, normalizedSpacingArray]);

  return { spacingNum };
};
