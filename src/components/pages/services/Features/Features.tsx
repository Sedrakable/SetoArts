import React from "react";
import styles from "./Features.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { Block, BlockVariantType } from "../../containers/Block";
import { IFeature, IFeatures } from "../../../../data";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { Paragraph } from "../../../reuse/Paragraph";
import { useAtom } from "jotai";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";
import { getTranslations } from "../../../../helpers/langUtils";
import { Heading } from "../../../reuse/Heading";
import { useWindowResize } from "../../../../helpers/useWindowResize";

const Feature: React.FC<IFeature> = ({ title, customImage, desc }) => {
  const { isMobile } = useWindowResize();
  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start" }}
      width100
      className={styles.container}
      as="li"
    >
      <div className={styles.imgWrapper}>
        <SanityImage {...customImage} res={20} />
      </div>
      <FlexDiv
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        width100
        className={styles.content}
        padding={{ all: [3, 3, 3, 4] }}
        gapArray={[1]}
      >
        {isMobile ? (
          <Paragraph level="big" color="black" weight="regular">
            {title}
          </Paragraph>
        ) : (
          <Heading font="Cursive" level="5" as="h3" color="black">
            {title}
          </Heading>
        )}
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
        gapArray={[2, 3, 3, 4]}
        flex={{ y: "flex-start" }}
        width100
        className={cn(styles.features, styles[variant])}
        as="ul"
      >
        {features?.map((feature: IFeature, key) => {
          return <Feature {...feature} key={key} />;
        })}
      </FlexDiv>
    </Block>
  );
};
