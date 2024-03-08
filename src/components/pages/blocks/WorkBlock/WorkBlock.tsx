import React, { FC } from "react";
import styles from "./WorkBlock.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { Block } from "../../containers/Block";
import { IWork, IWorkBlock, LocalPaths } from "../../../../data.d";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { useAtom } from "jotai";
import { modalData } from "../../../reuse/Modal";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";
import { getTranslations } from "../../../../helpers/langUtils";
import { useNavigate } from "react-router-dom";

const Work: FC<IWork> = (props) => {
  const [, setModalOpen] = useAtom(modalData);
  const [lang] = useAtom(langData);
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setModalOpen({
      handleClose: () => setModalOpen(null),
      ...props,
    });
    // Update the URL programmatically when opening the modal
    const newPath = `/${lang}${LocalPaths.ABOUT}/${props.slug.current}`;
    navigate(newPath);
  };

  return (
    <FlexDiv width100 className={styles.container} onClick={handleModalOpen}>
      <div className={styles.imgWrapper}>
        <SanityImage {...props?.thumbnailImage} />
      </div>
      <FlexDiv
        width100
        height100
        className={styles.content}
        padding={{ horizontal: [4], top: [4], bottom: [5] }}
        gapArray={[3]}
      >
        <Heading
          font="Seto"
          level="2"
          as="h3"
          color="white"
          textAlign="center"
          className={styles.title}
        >
          {props.title}
        </Heading>
      </FlexDiv>
    </FlexDiv>
  );
};

export const WorkBlock: React.FC<IWorkBlock> = ({ works }) => {
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

  return (
    <Block title={translations.blockTitles.work} variant="grid" shadow={false}>
      <FlexDiv
        gapArray={[4]}
        flex={{ y: "flex-start" }}
        width100
        className={cn(styles.workBlock)}
        wrap
      >
        {works?.map((work: IWork, key: number) => {
          return <Work {...work} key={key} />;
        })}
      </FlexDiv>
    </Block>
  );
};
