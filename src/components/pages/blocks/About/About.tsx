import React from "react";
import styles from "./About.module.scss";
import { Block } from "../../containers/Block";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { FancyText } from "../../../reuse/FancyText";
import { IAbout } from "../../../../data";
import { Paragraph } from "../../../reuse/Paragraph";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { useWindowResize } from "../../../../helpers/useWindowResize";
import { useAtom } from "jotai";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";
import { getTranslations } from "../../../../helpers/langUtils";

export const About: React.FC<IAbout> = ({ content }) => {
  const { isMobileOrTablet } = useWindowResize();
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

  const { customImage, name, title1, desc1, title2, desc2 } = content || {};

  const SecondText = () => {
    return (
      <FlexDiv
        flex={{ direction: "column", x: "center" }}
        gapArray={[3]}
        className={styles.secondText}
      >
        {title2 && desc2 && (
          <FlexDiv
            flex={{ direction: "column", x: "flex-start" }}
            gapArray={[1]}
          >
            <Paragraph level="big" weight="regular" color="black">
              {title2}
            </Paragraph>

            <Paragraph level="regular" color="black">
              {desc2}
            </Paragraph>
          </FlexDiv>
        )}
        {/* {cta && (
          <Button variant="fancy" href={`/${lang}${LocalPaths.CONTACT}`}>
            {translations.buttons.workWithMe}
          </Button>
        )} */}
      </FlexDiv>
    );
  };
  return (
    <Block title={translations.blockTitles.aboutMe} variant="fabric">
      <FlexDiv width100 flex={{ direction: "column" }} gapArray={[2, 3, 3, 4]}>
        <FlexDiv
          width100
          flex={{ direction: "column", y: "center", x: "flex-start" }}
          className={styles.container}
          gapArray={[4, 5, 5, 7]}
        >
          {customImage && (
            <div className={styles.imgWrapper}>
              <SanityImage
                image={customImage?.image}
                alt={customImage?.alt}
                res={30}
              />
            </div>
          )}
          <div className={styles.text}>
            {name && (
              <Heading
                font="Seto"
                as="h2"
                level="2"
                color="black"
                paddingBottomArray={[2, 3, 3, 4]}
              >
                {name}
              </Heading>
            )}
            <FlexDiv
              flex={{ direction: "column", x: "flex-start" }}
              gapArray={[2, 3, 3, 4]}
            >
              <FlexDiv
                flex={{ direction: "column", x: "flex-start" }}
                gapArray={[1]}
              >
                <FancyText {...title1} mode="paragraph" dark />
                <Paragraph
                  level="regular"
                  color="black"
                  paddingBottomArray={[2, 3, 2, 2]}
                >
                  {desc1}
                </Paragraph>
              </FlexDiv>
              {!isMobileOrTablet && <SecondText />}
            </FlexDiv>
          </div>
        </FlexDiv>
        {isMobileOrTablet && <SecondText />}
      </FlexDiv>
    </Block>
  );
};
