"use client";
import { createPortal } from "react-dom";
import React from "react";

export const Portal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
};
