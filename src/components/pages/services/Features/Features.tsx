import React from "react";
import styles from "./Features.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { Block, BlockVariantType } from "../../containers/Block";
import { IFeature, IFeatures } from "../../../../data";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { Paragraph } from "../../../reuse/Paragraph";
import { useAtom } from "jotai";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";
import { getTranslations } from "../../../../helpers/langUtils";

const Feature: React.FC<IFeature> = ({ title, customImage, desc }) => {
  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start" }}
      width100
      className={styles.container}
    >
      <div className={styles.imgWrapper}>
        <SanityImage {...customImage} />
      </div>
      <FlexDiv
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        width100
        className={styles.content}
        padding={{ horizontal: [4], top: [4], bottom: [5] }}
        gapArray={[3]}
      >
        <Heading font="Seto" level="4" as="h4" color="black">
          {title}
        </Heading>
        <Paragraph level="small" color="black">
          {desc}
        </Paragraph>
      </FlexDiv>
    </FlexDiv>
  );
};

export interface FeaturesProps extends IFeatures {
  variant: BlockVariantType;
}

export const Features: React.FC<FeaturesProps> = ({
  features,
  variant = "dark",
}) => {
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

  return (
    <Block title={translations.blockTitles.features} variant={variant} strokes>
      <FlexDiv
        gapArray={[4]}
        flex={{ y: "flex-start" }}
        width100
        className={cn(styles.features, styles[variant])}
      >
        {features?.map((feature: IFeature, key) => {
          return <Feature {...feature} key={key} />;
        })}
      </FlexDiv>
    </Block>
  );
};
