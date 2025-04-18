import { useState, useEffect } from "react";
import { FC, SVGProps } from "react";

export const useSvgComponent = (svgName: string) => {
  const [SvgComponent, setSvgComponent] = useState<FC<
    SVGProps<SVGSVGElement>
  > | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSvg = async () => {
      try {
        const modulee = await import(`@/assets/vector/${svgName}.svg`);
        const Component = modulee.default as FC<SVGProps<SVGSVGElement>>;
        if (isMounted) setSvgComponent(() => Component);
      } catch {
        console.error(`SVG '${svgName}' not found. Falling back to 'Bulb'.`);
        try {
          const fallbackModule = await import(`@/assets/vector/Bulb.svg`);
          const Fallback = fallbackModule.default as FC<
            SVGProps<SVGSVGElement>
          >;
          if (isMounted) setSvgComponent(() => Fallback);
        } catch {
          console.error("Failed to load fallback SVG 'Bulb'.");
          if (isMounted) setSvgComponent(null);
        }
      }
    };

    if (svgName) {
      loadSvg();
    } else {
      setSvgComponent(null);
    }

    return () => {
      isMounted = false;
    };
  }, [svgName]);

  return SvgComponent;
};
