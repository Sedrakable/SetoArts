"use client";
import { useEffect, useState, useMemo } from "react";
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
  const { isMobile, isTablet, isLaptop, isDesktop } = useWindowResize();
  const [spacingNum, setSpacingNum] = useState<SpacingType>();

  // Memoize the normalized spacing array
  const normalizedSpacingArray = useMemo(() => {
    if (!spacingArray) return undefined;

    const normalized = [...spacingArray];
    if (normalized.length === 1) normalized[1] = normalized[0];
    if (normalized.length === 2) normalized[2] = normalized[1];
    if (normalized.length === 3) normalized[3] = normalized[2];

    return normalized as [SpacingType, SpacingType, SpacingType, SpacingType];
  }, [spacingArray]);

  useEffect(() => {
    if (!normalizedSpacingArray) return;

    if (isDesktop) {
      setSpacingNum(normalizedSpacingArray[3]);
    } else if (isLaptop) {
      setSpacingNum(normalizedSpacingArray[2]);
    } else if (isTablet) {
      setSpacingNum(normalizedSpacingArray[1]);
    } else {
      setSpacingNum(normalizedSpacingArray[0]);
    }
  }, [isMobile, isTablet, isLaptop, isDesktop, normalizedSpacingArray]);

  return { spacingNum };
};
