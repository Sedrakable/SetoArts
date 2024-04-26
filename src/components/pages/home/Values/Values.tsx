import React from "react";
import styles from "./Values.module.scss";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { Block } from "../../containers/Block";
import { Paragraph } from "../../../reuse/Paragraph";
import { IValue, IValues } from "../../../../data";
import { useAtom } from "jotai";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";
import { getTranslations } from "../../../../helpers/langUtils";

const Value: React.FC<IValue & { number: string }> = ({
  number,
  title,
  desc,
}) => {
  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
      gapArray={[2]}
      className={styles.value}
      as="li"
    >
      <FlexDiv
        gapArray={[3]}
        width100
        flex={{ x: "flex-start" }}
        className={styles.head}
      >
        <Heading font="Seto" level="3" as="h3" color="yellow">
          {number}
        </Heading>
        <Heading font="Seto" level="4" as="h4" className={styles.title}>
          {title}
        </Heading>
      </FlexDiv>

      <Paragraph level="small" textAlign="left" className={styles.desc}>
        {desc}
      </Paragraph>
    </FlexDiv>
  );
};

export const Values: React.FC<IValues> = ({ values }) => {
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

  return (
    <Block title={translations.blockTitles.values} variant="dark">
      <FlexDiv
        gapArray={[6]}
        flex={{ x: "flex-start", y: "space-between" }}
        width100
        className={styles.values}
        wrap
        as="ul"
      >
        {values?.map((value: IValue, key) => {
          return (
            <Value
              title={value.title}
              desc={value.desc}
              key={key}
              number={(key + 1).toString()}
            />
          );
        })}
      </FlexDiv>
    </Block>
  );
};
