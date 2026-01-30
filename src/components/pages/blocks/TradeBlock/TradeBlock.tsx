"use client";
import React from "react";
import styles from "./TradeBlock.module.scss";
import FlexDiv from "../../../reuse/FlexDiv";
import { Block } from "../../containers/Block";
import { LocalTargets } from "../../../../data.d";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";
import { FancyText } from "@/components/reuse/Text/FancyText/FancyText";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { PortableTextContent } from "@/components/reuse/Text/Paragraph/PortableTextContent";
import { TradeForm } from "@/components/reuse/Form/TradeForm";
import { useWindowResize } from "@/helpers/useWindowResize";
import cn from "classnames";

export interface TradeBlockProps {
  subTitle: string;
  title: FancyText;
  desc: FancyText;
  backgroundImage: ICustomImage;
}

export const TradeBlock: React.FC<TradeBlockProps> = ({
  subTitle,
  title,
  desc,
  backgroundImage,
}) => {
  const { isMobileOrTablet } = useWindowResize();

  return (
    <Block theme="off-white" id={LocalTargets.TRADEBLOCK}>
      <FlexDiv
        flex={{
          direction: isMobileOrTablet ? "column" : "row",
          x: "flex-start",
          y: "flex-start",
        }}
        width100
        className={cn(styles.tradeBlock, {
          [styles.mobile]: isMobileOrTablet,
        })}
        padding={{
          horizontal: [4, 5, 6, 7],
          vertical: [4, 5, 6, 7],
        }}
        gapArray={[2, 3, 8, 9]}
      >
        <FlexDiv
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
          className={styles.content}
          width100
          gapArray={[1, 2, 2, 3]}
        >
          {subTitle && (
            <Heading
              font="Cursive"
              as="h4"
              level="5"
              textAlign="start"
              color="dark-grey"
              weight={400}
              capitalise={false}
            >
              {subTitle}
            </Heading>
          )}

          <FancyText
            font="Outfit"
            level="2"
            as="h2"
            color="white"
            textAlign="start"
            weight={300}
            paddingBottomArray={[0, 2, 2, 3]}
            value={title}
          />

          <PortableTextContent
            level="regular"
            textAlign="start"
            value={desc}
            color="black"
            className={styles.desc}
            differentColorForStrongText={false}
          />
          <SanityImage
            figureclassname={styles.backgroundImage}
            {...backgroundImage}
            priority={true}
            quality={100}
            sizes={["100vw", "100vw", "75vw", "90vw"]}
          />
        </FlexDiv>
        <TradeForm />
      </FlexDiv>
    </Block>
  );
};
