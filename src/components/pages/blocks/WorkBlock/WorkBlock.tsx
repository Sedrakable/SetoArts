import React from "react";
import styles from "./WorkBlock.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { Block } from "../../containers/Block";
import { IWork, IWorkBlock } from "../../../../data";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { useAtom } from "jotai";
import { modalData } from "../../../reuse/Modal";
import { useFetchPage } from "../../../../api/useFetchPage";

const Work: React.FC<IWork> = ({ thumbnailImage, title, _id }) => {
  const [, setModalOpen] = useAtom(modalData);
  const workQuery = `*[_type == 'work' && _id == '${_id}'][0]`;

  const workData: IWork = useFetchPage(workQuery)!;

  return (
    <FlexDiv
      width100
      className={styles.container}
      onClick={() =>
        setModalOpen({
          handleClose: () => setModalOpen(null),
          ...workData,
        })
      }
    >
      <div className={styles.imgWrapper}>
        <SanityImage {...thumbnailImage} />
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
          level="3"
          as="h3"
          color="white"
          className={styles.title}
        >
          {title}
        </Heading>
      </FlexDiv>
    </FlexDiv>
  );
};

export const WorkBlock: React.FC<IWorkBlock> = ({ title, works }) => {
  return (
    <Block title={title!} variant="grid" shadow={false}>
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
