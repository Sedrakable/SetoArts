import React from "react";
import { Variants, motion } from "framer-motion";
import { Backdrop } from "./Backdrop";
import styles from "./Modal.module.scss";
import { Heading } from "./Heading";
import { atom } from "jotai";
import { Splider, SpliderProps } from "../pages/containers/Splider";
import { Paragraph } from "./Paragraph";
import { IconButton } from "./IconButton";
import { Button } from "./Button";
import { Link } from "./Link";
import { ICta } from "../../data";

export interface ModalProps {
  handleClose: () => void;
  spliderData: SpliderProps[];
  title: string;
  description: string;
  ctas?: ICta[];
}

export const modalData = atom<ModalProps | null>(null);

const dropIn: Variants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
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

const linkedButton = (title: string, link: string) => {
  return link ? (
    <Link href={link} target="_blank">
      <Button variant="fancy">{title}</Button>
    </Link>
  ) : (
    <Button variant="fancy" disabled>
      {title}
    </Button>
  );
};
export const Modal: React.FC<ModalProps> = ({
  handleClose,
  spliderData,
  title,
  description,
  ctas,
}) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.left}>
          <Splider slides={spliderData} />
        </div>
        <div className={styles.right}>
          <div className={styles.text}>
            <Heading font="Cursive" level="2" as="h2" textAlign="left">
              {title}
            </Heading>
            <Paragraph level="small">{description}</Paragraph>
          </div>
          <div className={styles.ctas}>
            <Paragraph level="small" textAlign="center" weight="regular">
              Coming soon to:
            </Paragraph>
            {/* <div className={styles.buttons}>
              {linkedButton("Amazon", ctas?.amazon!)}
              {linkedButton("Etsy", ctas?.etsy!)}
            </div> */}
          </div>
          <div className={styles.close}>
            <IconButton
              onClick={handleClose}
              iconProps={{ icon: "close", size: "small" }}
            />
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};
