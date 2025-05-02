// hooks/useParallaxScroll.ts
import { useState, useEffect, RefObject } from "react";

interface ParallaxOptions {
  // Optional multiplier to adjust scroll sensitivity
  multiplier?: number;
}

export const useParallaxScroll = (
  elementRef: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { multiplier = 1 } = options;

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();

        // Calculate how far the element is from the top of the viewport
        // and normalize it based on viewport height
        const progress = (-rect.top / window.innerHeight) * multiplier;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementRef, multiplier]);

  return scrollProgress;
};
