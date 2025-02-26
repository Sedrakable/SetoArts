"use client";
import React, { FC } from "react";
import styles from "./WoodQuote.module.scss";
import cn from "classnames";
import FlexDiv from "@/components/reuse/FlexDiv";
import { WoodForm, WoodFormProps } from "./WoodForm";
import { Block } from "../containers/Block";

export const WoodQuote: FC<WoodFormProps> = ({ title, subTitle }) => {
  return (
    <Block variant="light">
      <FlexDiv
        gapArray={[7, 7, 7, 8]}
        width100
        className={cn(styles.container)}
        flex={{ direction: "column" }}
      >
        <div style={{ background: "var(--yellow)" }}>
          Here will be the 3D sign that will trasport here and hover!
        </div>
        <WoodForm title={title} subTitle={subTitle} />
      </FlexDiv>
    </Block>
  );
};
