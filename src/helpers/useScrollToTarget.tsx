// helpers/useScrollToTarget.ts
"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "@/navigation";
import { LocalTargets } from "@/data.d";

export const useScrollToTarget = () => {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToTarget = (scrollTarget: LocalTargets, path?: string) => {
    const element = document.getElementById(scrollTarget);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      const fullUrl = `${window.location.pathname}${scrollTarget}`;
      window.history.replaceState(null, "", fullUrl);
      return true;
    }

    if (path && path !== pathname) {
      //@ts-expect-error
      router.push(`${path}${scrollTarget}`);
    }
    return false;
  };

  // Handle URL hash on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && Object.values(LocalTargets).includes(hash as LocalTargets)) {
      // Delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          const cleanUrl = window.location.pathname;
          window.history.replaceState(null, "", cleanUrl);
        }
      }, 100); // Adjust delay if needed
    }
  }, [pathname]);

  return { scrollToTarget };
};
