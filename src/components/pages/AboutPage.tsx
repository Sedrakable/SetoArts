import React, { useEffect, useState } from "react";

import { IInspired, IAbout, IWorkBlock, IWork, ICustomImage } from "../../data";
import { useFetchPage } from "../../api/useFetchPage";
import { Inspired } from "./blocks/Inspired/Inspired";
import { About } from "./blocks/About/About";
import { ImageGrid } from "./blocks/ImageGrid/ImageGrid";
import { WorkBlock } from "./blocks/WorkBlock/WorkBlock";
import { useAtom } from "jotai";
import { langData } from "../navbar/LangSwitcher/LangSwitcher";

export interface AboutPageProps {
  about: IAbout;
  work: IWorkBlock;
  inspired: IInspired;
}

export const AboutPage: React.FC = () => {
  const [workImages, setWorkImages] = useState<ICustomImage[]>([]);
  const [lang] = useAtom(langData);

  const aboutQuery = `*[_type == 'aboutPage' && lang == '${lang}'][0] {
    title,
    lang,
    about->,
    work->{
      title,
      works[]->{
        _id,
        slug,
        thumbnailImage,
        customImages,
        title,
      },
    },
    inspired->,
  }`;

  const aboutPageData: AboutPageProps = useFetchPage(aboutQuery)!;
  // console.log("About", aboutPageData);

  useEffect(() => {
    const getAllWorkImages = (works: IWork[]) => {
      const customImages: ICustomImage[] = works.flatMap((work) => {
        return work.customImages;
      });

      return customImages;
    };

    if (aboutPageData?.work?.works) {
      setWorkImages(getAllWorkImages(aboutPageData?.work?.works as IWork[]));
    }
  }, [aboutPageData]);
  return (
    // <>
    //   <iframe
    //     title="Steampunk Dynasty: Gears & Glory"
    //     src="https://www.kickstarter.com/projects/vostokcards/steampunk-dynasty-gears-and-glory/widget/video.html"
    //   />

    //   <iframe
    //     src="https://www.behance.net/embed/project/179677113?ilo0=1"
    //     height="316"
    //     width="404"
    //     allowFullScreen
    //     loading="lazy"
    //     allow="clipboard-write"
    //     referrerPolicy="strict-origin-when-cross-origin"
    //   ></iframe>
    // </>

    aboutPageData && (
      <>
        <About {...aboutPageData.about} />
        <WorkBlock {...aboutPageData.work} />
        <ImageGrid customImages={workImages} />
        <Inspired {...aboutPageData?.inspired} />
      </>
    )
  );
};
