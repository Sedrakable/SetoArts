"use client";
import { useEffect, useState } from "react";

export const BREAKPOINTS = {
  DESKTOP: 1680,
  LAPTOP: 1200,
  TABLET_PLUS: 900,
  TABLET: 640,
} as const;

export type ResponsiveView = {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isMobileOrTablet: boolean;
  screenWidth: number;
};

export function useWindowResize(): ResponsiveView {
  // Start with default mobile view
  const [state, setState] = useState<ResponsiveView>({
    isMobile: true,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    isMobileOrTablet: true,
    screenWidth: typeof window !== "undefined" ? window.innerWidth : 0,
  });

  useEffect(() => {
    // Calculate responsive view based on width
    const calculate = (width: number) => {
      const isMobile = width < BREAKPOINTS.TABLET;
      const isTablet =
        width >= BREAKPOINTS.TABLET && width < BREAKPOINTS.LAPTOP;
      const isLaptop =
        width >= BREAKPOINTS.LAPTOP && width < BREAKPOINTS.DESKTOP;
      const isDesktop = width >= BREAKPOINTS.DESKTOP;

      return {
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        isMobileOrTablet: isMobile || isTablet,
        screenWidth: width,
      };
    };

    // Initial calculation
    setState(calculate(window.innerWidth));

    // Efficient resize handler with debounce
    let timeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setState(calculate(window.innerWidth));
      }, 100);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return state;
}
