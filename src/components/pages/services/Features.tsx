import React from "react";
import styles from "./Services.module.scss";
import { FlexDiv } from "../../reuse/FlexDiv";
import { Heading } from "../../reuse/Heading";
import { Block } from "../containers/Block";
import { IFeature, IFeatures } from "../../../data";
import { SanityImage } from "../../reuse/SanityImage/SanityImage";

const Feature: React.FC<IFeature> = ({ title, customImage, desc }) => {
  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start" }}
      width100
      className={styles.container}
    >
      <SanityImage {...customImage} />
      <Heading font="Seto" level="5" as="h5">
        {title}
      </Heading>
    </FlexDiv>
  );
};

export const Features: React.FC<IFeatures> = ({ title, features }) => {
  return (
    <Block title={title} variant="grid">
      <FlexDiv
        gapArray={[4]}
        flex={{ y: "flex-start" }}
        width100
        className={styles.services}
      >
        {features?.map((feature: IFeature, key) => {
          return <Feature {...feature} key={key} />;
        })}
      </FlexDiv>
    </Block>
  );
};
