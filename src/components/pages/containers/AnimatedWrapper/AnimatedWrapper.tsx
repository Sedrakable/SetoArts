"use client";
import React, { forwardRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import cn from "classnames";
// import styles from "./AnimatedWrapper.module.scss";

export interface AnimatedWrapperProps {
  from: "left" | "right" | "inside"; // Animation direction
  children: ReactNode; // Wrapped component
  className?: string; // Additional styling
  duration?: number; // Animation duration in seconds (default: 0.5)
  delay?: number; // Animation delay in seconds (default: 0)
}

export const AnimatedWrapper = forwardRef<HTMLDivElement, AnimatedWrapperProps>(
  ({ from, children, className, duration = 0.5, delay = 0 }, ref) => {
    // Explicitly type inViewRef to fix type mismatch
    const inViewRef = React.useRef<HTMLDivElement | null>(null);
    const isInView = useInView(inViewRef, {
      once: true, // Animation triggers once
      amount: 0.1, // Trigger when 10% of element is visible
    });

    // Define animation variants based on `from` prop
    const variants = {
      hidden: {
        opacity: 0,
        x: from === "left" ? -150 : from === "right" ? 150 : 0,
        scale: from === "inside" ? 0.6 : 1,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: from === "inside" ? [0.4, 0, 0.2, 1] : "easeOut",
        },
      },
    };

    // Simplified ref handling with useCallback
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        inViewRef.current = node; // Assign to inViewRef
        if (typeof ref === "function") {
          ref(node); // Handle callback ref
        } else if (ref) {
          ref.current = node; // Handle MutableRefObject
        }
      },
      [ref]
    );

    return (
      <motion.div
        ref={setRefs}
        className={cn(className)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        style={{ width: "inherit", minWidth: "inherit", display: "inherit" }}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedWrapper.displayName = "AnimatedWrapper";
