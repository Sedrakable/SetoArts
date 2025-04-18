"use client";
import React, { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import styles from "./Modal.module.scss";
import cn from "classnames";
import { Variants, motion } from "framer-motion";

import { Backdrop } from "./Backdrop";
import FlexDiv from "../FlexDiv";
import { IconButton } from "../IconButton/IconButton";

export interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
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

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  const handleClose = () => {
    // Navigate back to the parent path
    const parentPath = pathname!.split("/").slice(0, -1).join("/");
    router.push(parentPath);
  };

  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  const close = onClose ? onClose : handleClose;

  return (
    <Backdrop onClick={close}>
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
          padding={{ horizontal: [4, 5, 5, 6], vertical: [3, 4, 4, 5] }}
        >
          {children}
        </FlexDiv>

        <FlexDiv
          padding={{ all: [3, 3, 3, 4] }}
          className={styles.closeButtonWrapper}
        >
          <IconButton
            iconProps={{ icon: "close", size: "regular", color: "black" }}
            onClick={close}
          />
        </FlexDiv>
      </motion.div>
    </Backdrop>
  );
};
