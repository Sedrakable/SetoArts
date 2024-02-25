// useWindowResize.ts
import { useEffect, useState } from "react";
import { useWindowDimensions } from "./useWindowDimensions";

export const DESKTOP_BREAKPOINT_WIDTH = 1680;
export const LAPTOP_BREAKPOINT_WIDTH = 1200;
export const TABLET_BREAKPOINT_WIDTH = 640;

export function useWindowResize() {
  const { width } = useWindowDimensions();

  const [responsiveView, setResponsiveView] = useState<{
    isMobile: boolean;
    isTablet: boolean;
    isLaptop: boolean;
    isDesktop: boolean;
    isMobileOrTablet: boolean;
  }>(() => calculateResponsiveView(width));

  useEffect(() => {
    function handleResize() {
      setResponsiveView(calculateResponsiveView(window.innerWidth));
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return responsiveView;
}

function calculateResponsiveView(width: number | null) {
  const isMobile = width! < TABLET_BREAKPOINT_WIDTH;
  const isTablet =
    width! >= TABLET_BREAKPOINT_WIDTH && width! < LAPTOP_BREAKPOINT_WIDTH;
  const isLaptop =
    width! >= LAPTOP_BREAKPOINT_WIDTH && width! < DESKTOP_BREAKPOINT_WIDTH;
  const isDesktop = width! >= DESKTOP_BREAKPOINT_WIDTH;

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isMobileOrTablet: isMobile || isTablet,
  };
}
