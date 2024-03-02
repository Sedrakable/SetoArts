import React, { useEffect } from "react";
import { Variants, motion } from "framer-motion";
import { Backdrop } from "./Backdrop";
import styles from "./Modal.module.scss";
import { Heading } from "./Heading";
import { atom } from "jotai";
import { Paragraph } from "./Paragraph";
import { IconButton } from "./IconButton";
import { Button } from "./Button";
import { Link } from "./Link";
import { ICta, IWork } from "../../data";
import FlexDiv from "./FlexDiv";
import { Title } from "./Title/Title";
import { SanityImage } from "./SanityImage/SanityImage";

export interface ModalProps extends IWork {
  handleClose: () => void;
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
  handleClose,
  title,
  desc,
  customImages,
  primaryLink,
  secondaryLinks,
  behanceProjectId,
  kickstarterProjectlink,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   containerRef.current!.addEventListener("scroll", (event) => {
  //     event.preventDefault();
  //   });
  // }, [containerRef]);

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        // onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        ref={containerRef}
      >
        <FlexDiv
          className={styles.container}
          padding={{ vertical: [6, 7, 7, 8], horizontal: [6, 7, 7, 8] }}
        >
          <FlexDiv className={styles.text}>
            <Title title={title} />
            <Paragraph level="small" color="black">
              {desc}
            </Paragraph>
          </FlexDiv>
          <FlexDiv
            className={styles.ctas}
            gapArray={[4]}
            padding={{ bottom: [1, 2, 2, 3] }}
          >
            <Button variant="primary" disabled href={primaryLink?.link}>
              {primaryLink?.text}
            </Button>
            {secondaryLinks?.map((cta: ICta, key: number) => {
              return (
                <Button variant="secondary" disabled href={cta?.link} key={key}>
                  {cta?.text}
                </Button>
              );
            })}
          </FlexDiv>
          <FlexDiv
            className={styles.embeded}
            gapArray={[4]}
            width100
            wrap
            padding={{ bottom: [2, 3, 3, 4] }}
          >
            {kickstarterProjectlink && (
              <iframe
                title={title}
                src={`${kickstarterProjectlink}/widget/video.html`}
              />
            )}

            <iframe
              title={title}
              src={`https://www.behance.net/embed/project/${behanceProjectId}?ilo0=1`}
              allowFullScreen
              loading="lazy"
              allow="clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </FlexDiv>
          <FlexDiv
            className={styles.imagesWrapper}
            gapArray={[2]}
            width100
            padding={{ all: [2] }}
            wrap
          >
            {customImages?.map((image, key) => {
              return <SanityImage {...image} key={key} />;
            })}
          </FlexDiv>
          <FlexDiv className={styles.close} padding={{ all: [2, 3, 3, 4] }}>
            <IconButton
              onClick={handleClose}
              iconProps={{ icon: "close", size: "regular" }}
            />
          </FlexDiv>
        </FlexDiv>
      </motion.div>
    </Backdrop>
  );
};
