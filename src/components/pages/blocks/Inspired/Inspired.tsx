import React from "react";
import styles from "./Inspired.module.scss";
import { Heading } from "../../../reuse/Heading";
import FlexDiv from "../../../reuse/FlexDiv";
import { LocalPaths } from "../../../../data.d";
import { Button } from "../../../reuse/Button";
import { Image } from "../../../reuse/Image";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";
import { useAtom } from "jotai";
import { getTranslations } from "../../../../helpers/langUtils";
const stroke = require("../../../../assets/photos/BigStroke.png");

export const Inspired: React.FC = () => {
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

  return (
    <FlexDiv
      className={styles.block}
      padding={{ vertical: [6, 7, 7, 8] }}
      width100
      as="section"
    >
      <FlexDiv
        className={styles.wrapper}
        flex={{ direction: "column" }}
        gapArray={[4, 5, 5, 5]}
      >
        <Image src={stroke} alt="stroke" />
        <FlexDiv className={styles.title}>
          <Heading font="Seto" as="h1" level="1">
            {translations.blockTitles.inspired}
          </Heading>
          <Heading
            font="Cursive"
            as="h1"
            level="1"
            color="yellow"
            className={styles.question}
          >
            ?
          </Heading>
        </FlexDiv>
        <Button variant="fancy" path={`/${lang}${LocalPaths.CONTACT}`}>
          {translations.buttons.workWithMe}
        </Button>
      </FlexDiv>
    </FlexDiv>
  );
};
