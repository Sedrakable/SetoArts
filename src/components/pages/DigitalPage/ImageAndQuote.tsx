"use client";
import { FC } from "react";

import FlexDiv from "@/components/reuse/FlexDiv";
import styles from "./ImageAndQuote.module.scss";
import cn from "classnames";

import { Block } from "../containers/Block";
import { DigitalFormProps, DigitalForm } from "./DigitalForm";
import Image from "next/image";

export const ImageAndQuote: FC<DigitalFormProps> = ({ title, subTitle }) => {
  return (
    <Block theme="light">
      <FlexDiv
        gapArray={[7, 8, 8, 9]}
        className={cn(styles.container)}
        flex={{ direction: "column" }}
      >
        <Image
          src={`/photos/SocialLogo.png`}
          alt="form image"
          width={500}
          height={500}
        />
        <DigitalForm title={title} subTitle={subTitle} />
      </FlexDiv>
    </Block>
  );
};
