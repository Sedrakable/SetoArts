"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styles from "./BudgetGateModal.module.scss";
import { Backdrop } from "@/components/reuse/Modal/Backdrop";
import { IconButton } from "@/components/reuse/IconButton/IconButton";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { Button } from "@/components/reuse/Button/Button";
import { LeadFormTranslationCopy } from "./steps/LeadStepProps";

const etsySemiCustomUrl =
  process.env.NEXT_PUBLIC_ETSY_SEMI_CUSTOM_URL ||
  "https://setoarts.etsy.com/listing/4526919270";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 26, stiffness: 320 },
  },
  exit: { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.15 } },
};

const MotionDiv = motion.div as React.ComponentType<
  React.HTMLAttributes<HTMLDivElement> &
    import("framer-motion").MotionProps &
    React.RefAttributes<HTMLDivElement>
>;

interface BudgetGateModalProps {
  open: boolean;
  onClose: () => void;
  translations: LeadFormTranslationCopy;
}

export const BudgetGateModal = ({
  open,
  onClose,
  translations,
}: BudgetGateModalProps) => {
  const copy = translations.semiCustom;

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <Backdrop onClick={onClose}>
          <MotionDiv
            className={styles.card}
            onClick={(event) => event.stopPropagation()}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
          >
            <FlexDiv className={styles.closeButton}>
              <IconButton
                type="button"
                iconProps={{ icon: "close", size: "small", color: "black" }}
                onClick={onClose}
                aria-label={copy.back}
              />
            </FlexDiv>

            <FlexDiv
              flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
              gapArray={[4]}
              width100
            >
              <FlexDiv
                className={styles.header}
                flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
                gapArray={[2]}
                width100
              >
                <Paragraph color="dark-grey" level="regular" weight={600}>
                  {copy.eyebrow}
                </Paragraph>
                <Heading
                  as="h2"
                  color="black"
                  font="Outfit"
                  level="3"
                  weight={600}
                >
                  {copy.title}
                </Heading>
              </FlexDiv>
              <FlexDiv
                flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
                gapArray={[3, 3, 3, 4]}
                width100
              >
                <Paragraph color="black" level="regular">
                  {copy.copy}
                </Paragraph>
                <Paragraph color="dark-grey" level="small">
                  {copy.note}
                </Paragraph>
              </FlexDiv>

              <FlexDiv
                className={styles.actions}
                flex={{ direction: "column", x: "stretch" }}
                gapArray={[3]}
                width100
              >
                <Button href={etsySemiCustomUrl} type="button" variant="black">
                  {copy.cta}
                </Button>
                <Button onClick={onClose} type="button" variant="white" outline>
                  {copy.back}
                </Button>
              </FlexDiv>
            </FlexDiv>
          </MotionDiv>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};
