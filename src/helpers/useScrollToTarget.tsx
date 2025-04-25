// helpers/useScrollToTarget.ts
"use client";
import { usePathname, useRouter } from "@/navigation";
import { LocalTargets } from "@/data.d";
import { useEffect } from "react";

export const useScrollToTarget = () => {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToTarget = (scrollTarget: LocalTargets, path?: string) => {
    //In-page scroll
    if (path || path === pathname || !path) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        const fullUrl = `${window.location.pathname}${scrollTarget}`;
        window.history.replaceState(null, "", fullUrl);
        return true;
      }
    }

    //Cross-page scroll
    if (path && path !== pathname) {
      const finalPath = `${path}${scrollTarget}`;
      // @ts-ignore: Unreachable code error
      router.push(finalPath);
      return true;
    }
    return false;
  };

  // Handle hash on page load
  useEffect(() => {
    const hash = window.location.hash as LocalTargets;

    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, [pathname]);

  return { scrollToTarget };
};
