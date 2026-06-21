// src/components/JsonLd/JsonLd.tsx
import React from "react";

/**
 * Renders a JSON-LD structured-data <script> tag.
 * Safe to render inside a Server Component anywhere in the tree.
 */
export const JsonLd: React.FC<{ data: object | object[] }> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped enough for ld+json; we additionally
      // guard against "</script>" injection from any user/CMS-sourced strings.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
};
