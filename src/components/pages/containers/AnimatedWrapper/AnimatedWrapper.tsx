"use client";
import React, { forwardRef, ReactNode, ElementType } from "react";
import { motion, useInView, MotionProps } from "framer-motion";
import cn from "classnames";
// import styles from "./AnimatedWrapper.module.scss";

export interface AnimatedWrapperProps<T extends ElementType = "div"> {
  from: "left" | "right" | "inside"; // Animation direction
  children: ReactNode; // Wrapped component
  className?: string; // Additional styling
  duration?: number; // Animation duration in seconds (default: 0.5)
  delay?: number; // Animation delay in seconds (default: 0)
  as?: T; // Element type to render
}

// Type helper for the ref based on the element type
type RefType<T extends ElementType> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<
      React.HTMLAttributes<infer R>,
      any
    >
    ? R
    : HTMLElement
  : HTMLElement;

export const AnimatedWrapper = forwardRef(
  <T extends ElementType = "div">(
    {
      from,
      children,
      className,
      duration = 0.5,
      delay = 0,
      as,
      ...props
    }: AnimatedWrapperProps<T> & Omit<MotionProps, "as">,
    ref: React.Ref<RefType<T>>
  ) => {
    const Component = as
      ? (motion[as as keyof typeof motion] as any)
      : motion.div;

    // Use a more generic ref type
    const inViewRef = React.useRef<Element | null>(null);
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

    // Fixed ref handling with useCallback
    const setRefs = React.useCallback(
      (node: any) => {
        inViewRef.current = node; // Assign to inViewRef

        // Handle ref without trying to modify read-only properties
        if (typeof ref === "function") {
          ref(node); // For function refs
        } else if (ref) {
          // Using type assertion to safely assign to ref.current
          (ref as React.MutableRefObject<any>).current = node;
        }
      },
      [ref]
    );

    return (
      <Component
        ref={setRefs}
        className={cn(className)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        style={{ width: "inherit", minWidth: "inherit", display: "inherit" }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

AnimatedWrapper.displayName = "AnimatedWrapper";
