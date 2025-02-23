"use client";

import { useEffect } from "react";

export function ClientLogger({ slug }: { slug: any }) {
  useEffect(() => {
    setTimeout(() => {
      console.log(`slug (client-side): ${slug}`);
    }, 0);
  }, [slug]);

  return null;
}
