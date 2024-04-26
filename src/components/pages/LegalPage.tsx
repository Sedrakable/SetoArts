import React from "react";
import { Block } from "./containers/Block";
import { ILegalPage } from "../../data";
import FlexDiv from "../reuse/FlexDiv";
import { Paragraph } from "../reuse/Paragraph";
import { Heading } from "../reuse/Heading";
import { Helmet } from "react-helmet-async";

export const LegalPage: React.FC<ILegalPage> = (props) => {
  return (
    props && (
      <>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Block title={props.title} variant="dark">
          <FlexDiv flex={{ direction: "column", x: "flex-start" }}>
            {props?.data?.map((block) => {
              return (
                <div key={block._key}>
                  {block.children?.map((child) =>
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
      </>
    )
  );
};
