"use client";
import { useEffect, useState } from "react";

export const DESKTOP_BREAKPOINT_WIDTH = 1680;
export const LAPTOP_BREAKPOINT_WIDTH = 1200;
export const TABLET_PLUS_BREAKPOINT_WIDTH = 900;
export const TABLET_BREAKPOINT_WIDTH = 640;

const hasWindow = typeof window !== "undefined";

export function useWindowResize() {
  const [responsiveView, setResponsiveView] = useState<{
    isMobile: boolean;
    isTablet: boolean;
    isTabletPlus: boolean;
    isLaptop: boolean;
    isDesktop: boolean;
    isMobileOrTablet: boolean;
  }>({
    isMobile: true,
    isTablet: false,
    isTabletPlus: false,
    isLaptop: false,
    isDesktop: false,
    isMobileOrTablet: false,
  });

  useEffect(() => {
    if (hasWindow) {
      setResponsiveView(calculateResponsiveView(window.innerWidth));
      const handleResize = () => {
        setResponsiveView(calculateResponsiveView(window.innerWidth));
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return responsiveView;
}

function calculateResponsiveView(width: number | undefined) {
  const isMobile = width! < TABLET_BREAKPOINT_WIDTH;
  const isTablet =
    width! >= TABLET_BREAKPOINT_WIDTH && width! < LAPTOP_BREAKPOINT_WIDTH;
  const isTabletPlus =
    width! >= TABLET_PLUS_BREAKPOINT_WIDTH && width! < LAPTOP_BREAKPOINT_WIDTH;
  const isLaptop =
    width! >= LAPTOP_BREAKPOINT_WIDTH && width! < DESKTOP_BREAKPOINT_WIDTH;
  const isDesktop = width! >= DESKTOP_BREAKPOINT_WIDTH;

  return {
    isMobile,
    isTablet,
    isTabletPlus,
    isLaptop,
    isDesktop,
    isMobileOrTablet: isMobile || isTablet,
  };
}
