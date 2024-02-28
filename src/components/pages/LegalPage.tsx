import React from "react";
import { useFetchPage } from "../../api/useFetchPage";
import { langData } from "../navbar/LangSwitcher/LangSwitcher";
import { useAtom } from "jotai";
import { Block } from "./containers/Block";
import { ILegalPage } from "../../data";
import FlexDiv from "../reuse/FlexDiv";
import { Paragraph } from "../reuse/Paragraph";
import { Heading } from "../reuse/Heading";

export const LegalPage: React.FC<{ path: string }> = ({ path }) => {
  const [lang] = useAtom(langData);
  const legalQuery = `*[_type == 'legalPage' && lang == '${lang}' && path == '${path}'][0]`;

  const legalPageData: ILegalPage = useFetchPage(legalQuery)!;
  console.log("legal", legalPageData);

  return (
    legalPageData && (
      <Block title={legalPageData.title} variant="dark">
        <FlexDiv flex={{ direction: "column", x: "flex-start" }}>
          {legalPageData?.data.map((block) => {
            return (
              <div key={block._key}>
                {block.children.map((child) =>
                  child.marks[0] === "strong" ? (
                    <Heading
                      font="Seto"
                      key={child._key}
                      as="h5"
                      level="5"
                      color="yellow"
                      paddingBottomArray={[1, 2, 2, 3]}
                    >
                      {child.text}
                    </Heading>
                  ) : (
                    <Paragraph
                      key={child._key}
                      level="regular"
                      color="white"
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
    )
  );
};
