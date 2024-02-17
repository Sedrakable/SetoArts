import React from "react";
import styles from "./Hero.module.scss";
import { Paragraph } from "./Paragraph";
import { IHero } from "../../data";
import { FlexDiv } from "./FlexDiv";
import { ReactComponent as Logo } from "../../assets/illu/LogoBig.svg";
import { FancyText } from "./FancyText";
import { Button } from "./Button";
import { Quote } from "./Quote";
import { SanityImage } from "./SanityImage/SanityImage";
import { useWindowResize } from "../../helpers/useWindowResize";

export const Hero: React.FC<IHero> = ({
  customImage,
  desc,
  title,
  ctas,
  subTitle,
}) => {
  const { isMobileOrTablet } = useWindowResize();
  return (
    <div className={styles.hero}>
      {!isMobileOrTablet && (
        <div className={styles.quote}>
          <Quote leftText="Organized" rightText="Chaos" />
        </div>
      )}

      <FlexDiv
        className={styles.left}
        padding={{
          horizontal: [3, 8, 0],
          vertical: [0, 5, 0],
          bottom: [4, 5, 0],
        }}
      >
        <Logo />
      </FlexDiv>
      {isMobileOrTablet && (
        <div className={styles.quote}>
          <Quote leftText="Organized" rightText="Chaos" />
        </div>
      )}
      <FlexDiv className={styles.right}>
        <SanityImage
          image={customImage.image}
          alt={customImage.alt}
          fit={false}
        />
        <FlexDiv
          className={styles.container}
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
          padding={{ vertical: [6, 8, 9, 11], horizontal: [5, 7, 8, 10] }}
          gapArray={[3, 4, 4, 5]}
        >
          <FlexDiv
            flex={{ direction: "column", x: "flex-start" }}
            gapArray={[3]}
          >
            {subTitle && <FancyText {...subTitle} paragraph />}
            {title && <FancyText {...title} />}
            <Paragraph
              level="small"
              weight="weak"
              className={styles.description}
            >
              {desc}
            </Paragraph>
          </FlexDiv>
          <FlexDiv
            gapArray={[4]}
            flex={{ direction: "row" }}
            customStyle={{ flexWrap: "wrap" }}
          >
            <Button variant="fancy">{ctas?.cta1.text}</Button>
            {ctas?.cta2 && (
              <Button variant="secondary">{ctas?.cta1.text}</Button>
            )}
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </div>
  );
};
