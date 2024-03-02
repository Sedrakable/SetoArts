import React, { useEffect, useState } from "react";

import { IAbout, IWorkBlock, IWork, ICustomImage } from "../../data";
import { Inspired } from "./blocks/Inspired/Inspired";
import { About } from "./blocks/About/About";
import { ImageGrid } from "./blocks/ImageGrid/ImageGrid";
import { WorkBlock } from "./blocks/WorkBlock/WorkBlock";

export interface AboutPageProps {
  about: IAbout;
  work: IWorkBlock;
}

export const AboutPage: React.FC<AboutPageProps> = (props) => {
  const [workImages, setWorkImages] = useState<ICustomImage[]>([]);

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
        <About {...props.about} />
        <WorkBlock {...props.work} />
        <ImageGrid customImages={workImages} />
        <Inspired />
      </>
    )
  );
};
