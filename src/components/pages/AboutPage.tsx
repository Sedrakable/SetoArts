import React, { useEffect, useState } from "react";

import { IAbout, IWorkBlock, IWork, ICustomImage, IValues } from "../../data";
import { Inspired } from "./blocks/Inspired/Inspired";
import { About } from "./blocks/About/About";
import { ImageGrid } from "./blocks/ImageGrid/ImageGrid";
import { WorkBlock } from "./blocks/WorkBlock/WorkBlock";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { ModalProps, modalData } from "../reuse/Modal";
import { Values } from "./home/Values/Values";
import { getTranslations } from "../../helpers/langUtils";
import { SEO } from "../SEO";
import { langData } from "../navbar/LangSwitcher/LangSwitcher";

export interface AboutPageProps {
  about: IAbout;
  values: IValues;
  work: IWorkBlock;
}

export const AboutPage: React.FC<AboutPageProps> = (props) => {
  const [workImages, setWorkImages] = useState<ICustomImage[]>([]);
  const [, setModalOpen] = useAtom(modalData);
  const { slug } = useParams();
  const [lang] = useAtom(langData);

  useEffect(() => {
    if (slug) {
      setModalOpen({
        ...(props.work.works.find(
          (work) => work.slug.current === slug
        ) as ModalProps),
        handleClose: () => setModalOpen(null),
      });
    }
  }, [slug, setModalOpen, props.work.works]);

  useEffect(() => {
    const getAllWorkImages = (works: IWork[]) => {
      const customImages: ICustomImage[] = works.flatMap((work) => {
        return work.customImages;
      });

      return customImages;
    };

    if (props?.work?.works) {
      setWorkImages(getAllWorkImages(props?.work?.works as IWork[]));
    }
  }, [props]);
  return (
    props && (
      <>
        <SEO
          title={getTranslations(lang).blockTitles.aboutMe}
          description={props.about.content.desc1}
          imgUrl="https://i.imgur.com/u9EH6vH.png"
          url="https://www.setoxarts.com/en/about-work"
        />
        <About {...props.about} />
        <WorkBlock {...props.work} />
        <Values {...props.values} />
        <ImageGrid customImages={workImages} maxImages={24} randomize />
        <Inspired />
      </>
    )
  );
};
