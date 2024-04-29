import React from "react";
import { Variants, motion } from "framer-motion";
import { Backdrop } from "./Backdrop";
import styles from "./Modal.module.scss";
import { atom, useAtom } from "jotai";
import { Paragraph } from "./Paragraph";
import { IconButton } from "./IconButton";
import { Button } from "./Button";
import { ICta, IWork, LocalPaths } from "../../data.d";
import FlexDiv from "./FlexDiv";
import { Title } from "./Title/Title";
import { langData } from "../navbar/LangSwitcher/LangSwitcher";
import { useNavigate } from "react-router-dom";
import { ImageGrid } from "../pages/blocks/ImageGrid/ImageGrid";

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
  const [lang] = useAtom(langData);
  const navigate = useNavigate();

  const handleModalClose = () => {
    handleClose();
    const newPath = `/${lang}${LocalPaths.ABOUT}`;
    navigate(newPath);
  };

  return (
    <Backdrop onClick={() => handleModalClose()}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        ref={containerRef}
      >
        <FlexDiv
          className={styles.container}
          padding={{ vertical: [6, 7, 7, 8], horizontal: [5, 7, 7, 8] }}
        >
          <FlexDiv className={styles.text}>
            <Title title={title} />
            <Paragraph level="small" color="black">
              {desc}
            </Paragraph>
          </FlexDiv>
          <FlexDiv
            gapArray={[2, 3, 4, 4]}
            padding={{ bottom: [1, 2, 2, 3] }}
            wrap
            width100
          >
            <Button variant="primary" href={primaryLink?.link} target="_blank">
              {primaryLink?.text}
            </Button>
            {secondaryLinks?.map((cta: ICta, key: number) => {
              return (
                <Button
                  variant="secondary"
                  href={cta?.link}
                  key={key}
                  target="_blank"
                >
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

            {behanceProjectId && (
              <iframe
                title={title}
                src={`https://www.behance.net/embed/project/${behanceProjectId}?ilo0=1`}
                allowFullScreen
                loading="lazy"
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </FlexDiv>
          <ImageGrid customImages={customImages} version={2} />
          <FlexDiv className={styles.close} padding={{ all: [2, 3, 3, 4] }}>
            <IconButton
              onClick={handleModalClose}
              iconProps={{ icon: "close", size: "regular" }}
            />
          </FlexDiv>
        </FlexDiv>
      </motion.div>
    </Backdrop>
  );
};
