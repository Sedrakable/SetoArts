import React from "react";
import styles from "./Hero.module.scss";
import cn from "classnames";
import { Paragraph } from "../Paragraph";
import { IHero } from "../../../data";
import FlexDiv from "../FlexDiv";
import { ReactComponent as Logo } from "../../../assets/illu/LogoBig.svg";
import { FancyText } from "../FancyText";
import { Button } from "../Button";
import { Quote } from "../Quote";
import { SanityImage } from "../SanityImage/SanityImage";
import { useWindowResize } from "../../../helpers/useWindowResize";

export type VersionType = 1 | 2;

interface HeroProps extends IHero {
  version?: VersionType;
}

export const Hero: React.FC<HeroProps> = ({
  customImage,
  desc,
  title,
  ctas,
  subTitle,
  quote,
  version = 1,
}) => {
  const { isMobileOrTablet } = useWindowResize();

  return (
    <div className={cn(styles.hero)}>
      {!isMobileOrTablet && (
        <div className={styles.quote}>
          <Quote {...quote} version={version} />
        </div>
      )}

      {version === 1 && (
        <FlexDiv
          className={styles.left}
          padding={{
            horizontal: [3, 8, 0],
            vertical: [0, 5, 0],
          }}
          id="hero-left"
        >
          <Logo />
        </FlexDiv>
      )}
      {isMobileOrTablet && version === 1 && (
        <div className={styles.quote}>
          <Quote {...quote} version={version} />
        </div>
      )}
      <FlexDiv className={styles.right}>
        <SanityImage image={customImage?.image} alt={customImage?.alt} />
        <FlexDiv
          className={styles.container}
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
          padding={{ vertical: [6, 8, 9, 11], horizontal: [5, 7, 8, 10] }}
          gapArray={[3, 4, 4, 5]}
        >
          <FlexDiv
            flex={{ direction: "column", x: "flex-start" }}
            gapArray={[3]}
            customStyle={{ zIndex: 1 }}
          >
            {subTitle && <FancyText {...subTitle} mode="paragraph" />}
            {title && <FancyText mode="heading" {...title} />}
            <Paragraph
              level="small"
              weight="weak"
              className={styles.description}
            >
              {desc}
            </Paragraph>
          </FlexDiv>
          {ctas && (
            <FlexDiv
              gapArray={[4]}
              flex={{ direction: "row" }}
              customStyle={{ flexWrap: "wrap" }}
            >
              <Button variant="fancy" id="primary">
                {ctas?.cta1.text}
              </Button>
              {ctas?.cta2 && (
                <Button variant="secondary" id="secondary">
                  {ctas?.cta1.text}
                </Button>
              )}
            </FlexDiv>
          )}
        </FlexDiv>
      </FlexDiv>
      {isMobileOrTablet && version === 2 && (
        <div className={styles.quote}>
          <Quote {...quote} version={version} />
        </div>
      )}
    </div>
  );
};
