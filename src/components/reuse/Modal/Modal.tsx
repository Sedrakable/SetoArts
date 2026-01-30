// Modal.tsx
"use client";
import React, { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import styles from "./Modal.module.scss";
import cn from "classnames";
import { Variants, motion } from "framer-motion";

import { Backdrop } from "./Backdrop";
import FlexDiv from "../FlexDiv";
import { IconButton } from "../IconButton/IconButton";
import { IWork } from "@/data.d";
import { useWindowResize } from "@/helpers/useWindowResize";

export interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  currentSlug?: string;
  allWorks?: IWork[];
}

const dropIn: Variants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.01,
      type: "spring",
      damping: 100,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  currentSlug,
  allWorks = [],
}) => {
  const { isMobile } = useWindowResize();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleClose = () => {
    const parentPath = pathname!.split("/").slice(0, -1).join("/");
    router.push(parentPath);
  };

  // Find current index and calculate next/prev
  const currentIndex = allWorks.findIndex(
    (work) => work.slug?.current === currentSlug,
  );
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allWorks.length - 1;

  const prevSlug = hasPrev ? allWorks[currentIndex - 1]?.slug?.current : null;
  const nextSlug = hasNext ? allWorks[currentIndex + 1]?.slug?.current : null;

  const handlePrev = () => {
    if (prevSlug) {
      const parentPath = pathname!.split("/").slice(0, -1).join("/");
      router.push(`${parentPath}/${prevSlug}`);
    }
  };

  const handleNext = () => {
    if (nextSlug) {
      const parentPath = pathname!.split("/").slice(0, -1).join("/");
      router.push(`${parentPath}/${nextSlug}`);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrev) handlePrev();
      if (e.key === "ArrowRight" && hasNext) handleNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [hasPrev, hasNext, prevSlug, nextSlug]);

  const close = onClose ? onClose : handleClose;

  return (
    <Backdrop onClick={close}>
      {/* Previous Arrow */}
      {hasPrev && (
        <IconButton
          className={cn(styles.navArrow, styles.prevArrow)}
          onClick={handlePrev}
          aria-label="Previous work"
          iconProps={{
            icon: "arrow",
            size: isMobile ? "extra-small" : "small",
            rotate: 180,
            color: "white",
          }}
          background="black"
        />
      )}

      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={cn(styles.modal)}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        ref={containerRef}
      >
        <FlexDiv
          className={cn(styles.modalContainer)}
          padding={{
            horizontal: [3, 4, 4, 5],
            vertical: [3, 4, 4, 5],
            top: [3, 3, 3, 4],
          }}
          flex={{ x: "center", y: "center" }}
          width100
          height100
        >
          {children}
        </FlexDiv>

        <FlexDiv
          padding={{ all: [3, 3, 3, 4] }}
          className={styles.closeButtonWrapper}
        >
          <IconButton
            iconProps={{
              icon: "close",
              size: isMobile ? "extra-small" : "small",
              color: "black",
            }}
            onClick={close}
          />
        </FlexDiv>
      </motion.div>

      {/* Next Arrow */}
      {hasNext && (
        <IconButton
          className={cn(styles.navArrow, styles.nextArrow)}
          onClick={handleNext}
          aria-label="Next work"
          iconProps={{
            icon: "arrow",
            size: isMobile ? "extra-small" : "small",
            color: "white",
          }}
          background="black"
        />
      )}
    </Backdrop>
  );
};
