import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent, MotionValue } from "framer-motion";

interface UseProcessMotionScrollOptions {
  centerThreshold?: number; // how close to center we must get to lock
}

export function useProcessScroll(
  ref: React.RefObject<HTMLElement>,
  emblaApi: any, // Accept Embla API
  { centerThreshold = 0.1 }: UseProcessMotionScrollOptions = {}
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const [isLocked, setIsLocked] = useState(false);
  const [lockedCoord, setLockedCoord] = useState(0);
  const { scrollY } = useScroll();
  const lastScrollTime = useRef(0); // Track last scroll event time

  // Define min/max threshold for centering
  const MIN = 0.5 - centerThreshold;
  const MAX = 0.5 + centerThreshold;

  // Throttle function to limit scroll events
  const throttle = (func: () => void, limit: number) => {
    let inThrottle: boolean;
    return () => {
      if (!inThrottle) {
        func();
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  // When element is near center, lock the scroll position
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!isLocked && progress > MIN && progress < MAX) {
      const current = scrollY.get();
      setLockedCoord(current);
      setIsLocked(true);
      window.scrollTo({ top: current }); // Instantly lock the position
    }
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isLocked) {
      const now = Date.now();

      // Clamp scroll position if trying to scroll down
      if (latest > lockedCoord + 2) {
        window.scrollTo({ top: lockedCoord });
      }

      // Allow unlocking if scrolled up significantly
      if (latest < lockedCoord - 50) {
        setIsLocked(false);
      }

      // Throttle carousel scrolling to prevent rapid advances
      if (emblaApi && now - lastScrollTime.current > 300) {
        lastScrollTime.current = now;

        // Check if carousel can scroll to the next step
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          // If carousel cannot scroll further, unlock the scroll
          setIsLocked(false);
        }
      }
    }
  });

  return { isLocked };
}
