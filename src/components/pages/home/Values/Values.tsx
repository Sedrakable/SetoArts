import React from "react";
import styles from "./Values.module.scss";
import { FlexDiv } from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { Block } from "../../containers/Block";
import { Paragraph } from "../../../reuse/Paragraph";
import { IValue, IValues } from "../../../../data";

export const tabTexts: string[] = ["home", "services", "about + work"];

const Value: React.FC<IValue & { number: string }> = ({
  number,
  title,
  desc,
}) => {
  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start" }}
      gapArray={[2]}
      width100
    >
      <FlexDiv gapArray={[3]} width100 flex={{ x: "flex-start" }}>
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

export const Values: React.FC<IValues> = ({ title, values }) => {
  return (
    <Block title="Values" variant="dark">
      <FlexDiv
        gapArray={[6]}
        flex={{ y: "flex-start" }}
        width100
        customStyle={{ display: "grid" }}
        className={styles.values}
      >
        {values.map((value: IValue, key) => {
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
