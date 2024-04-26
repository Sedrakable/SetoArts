import React from "react";
import styles from "./Reviews.module.scss";
import FlexDiv from "../../../reuse/FlexDiv";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";
import { useAtom } from "jotai";
import { getTranslations } from "../../../../helpers/langUtils";
import { ElfsightWidget } from "react-elfsight-widget";
import { Block } from "../../containers/Block";

export const Reviews: React.FC = () => {
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

  return (
    <Block title={translations.blockTitles.reviews} variant="grid">
      <FlexDiv
        className={styles.reviews}
        gapArray={[4]}
        width100
        as="section"
        padding={{ top: [2, 3, 3, 4] }}
      >
        {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d178787.81912808729!2d-73.7118733!3d45.5591827!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa70e8c729916bbff%3A0x6f3d76a4741d1d78!2sSeto%20x%20Arts!5e0!3m2!1sen!2sca!4v1714102360199!5m2!1sen!2sca"
        width="600"
        height="450"
        loading="lazy"
        title="google maps"
        className={styles.map}
      /> */}
        <ElfsightWidget
          widgetId="0d315c90-cc18-4c1f-bf61-14fff00b69f4"
          style={{ fontFamily: `"Anek Gurmukhi", sans-serif` }}
        />
      </FlexDiv>
    </Block>
  );
};
