// src/components/reuse/Modal/Backdrop.tsx
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

import styles from "./Backdrop.module.scss";

interface BackdropProps {
  children: ReactNode;
  onClick: () => void;
}

export const Backdrop: React.FC<BackdropProps> = ({ children, onClick }) => {
  return (
    <motion.div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClick(); // only click outside modal
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
