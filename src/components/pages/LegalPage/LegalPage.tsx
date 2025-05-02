import React from "react";
import styles from "./LegalPage.module.scss";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { ILegalPage } from "@/data.d";
import { Block } from "../containers/Block";

export const LegalPageComp: React.FC<ILegalPage> = ({ title, data }) => {
  return (
    <Block
      title={{ font: "Cursive", children: title, color: "yellow" }}
      theme="light"
      className={styles.block}
    >
      <FlexDiv flex={{ direction: "column", x: "flex-start" }}>
        {data?.map((block) => {
          return (
            <div key={block._key}>
              {block.children?.map((child) =>
                child.marks[0] === "strong" ? (
                  <Heading
                    font="Outfit"
                    key={child._key}
                    as="h5"
                    level="5"
                    color="black"
                    paddingBottomArray={[1, 2, 2, 3]}
                  >
                    {child.text}
                  </Heading>
                ) : (
                  <Paragraph
                    key={child._key}
                    level="regular"
                    color="black"
                    paddingBottomArray={[2, 3, 3, 4]}
                  >
                    {child.text}
                  </Paragraph>
                )
              )}
            </div>
          );
        })}
      </FlexDiv>
    </Block>
  );
};
