// useWindowDimensions.ts
import { useEffect, useState } from "react";

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number | null;
    height: number | null;
  }>(() => getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function getWindowDimensions() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
