import { useEffect, useState } from "react";
import { useWindowResize } from "./useWindowResize";

//Creating a type for Spacing array
const spacingArrayConst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

export type SpacingType = typeof spacingArrayConst[number];

/**
 *
 * Optional, padding under text, its an array that takes up to 4 string/number values,
 *    those values represent spacing levels, a,b,c and 1 to 14, example: '12' would represent var(--u9-spacing-level-12).
 * The value go in order of Mobile, Tablet, Laptop, Desktop.
 * Example: ["a",12,"c","1"], this transltes to Mobile: var(--u9-spacing-level-a) , Tablet: var(--u9-spacing-level-12) and etc...
 * Example with 3 values: ["a",12,"c"] in this case, its mobile, tablet, laptop.
 *    The desktop value will be the same as the last value of the array, which in this case is Laptop
 * Example with 1 value: [4] this is simple, all sizes of screen will have the padding bottom var(--u9-spacing-level-4)
 * @type {SpacingArrayType}
 */
export type SpacingArrayType = [
  SpacingType,
  SpacingType?,
  SpacingType?,
  SpacingType?
];

export const useSpacingGenerator = (spacingArray?: SpacingArrayType) => {
  const { isMobile, isTablet, isLaptop, isDesktop } = useWindowResize();
  const [spacingNum, setSpacingNum] = useState<SpacingType>();

  useEffect(() => {
    //Only run function of spacingArray is set
    if (!spacingArray) {
      return;
    }

    if (spacingArray.length === 1) {
      spacingArray[1] = spacingArray[0];
    }
    if (spacingArray.length === 2) {
      spacingArray[2] = spacingArray[1];
    }
    if (spacingArray.length === 3) {
      spacingArray[3] = spacingArray[2];
    }

    //Depending on screen size set the proper Spacing size from array
    setSpacingNum(spacingArray[0]);

    if (isTablet) {
      setSpacingNum(spacingArray[1]);
    } else if (isLaptop) {
      setSpacingNum(spacingArray[2]);
    } else if (isDesktop) {
      setSpacingNum(spacingArray[3]);
    }
  }, [isMobile, isTablet, isLaptop, isDesktop, spacingArray]);
  return { spacingNum };
};
