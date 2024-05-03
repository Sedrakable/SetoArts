import React from "react";
import { IconType } from "../reuse/Icon";
import { Heading } from "../reuse/Heading";
import { IconButton } from "../reuse/IconButton";
import FlexDiv from "../reuse/FlexDiv";
import { ICta, ISocials } from "../../data.d";

export const Socials: React.FC<ISocials> = ({ title, links }) => {
  return (
    <FlexDiv gapArray={[2]} wrap flex={{ x: "flex-start" }}>
      {title && (
        <Heading font="Cursive" as="h3" level="3" color="white">
          {title}
        </Heading>
      )}
      <FlexDiv gapArray={[3]} wrap flex={{ x: "flex-start" }}>
        {links?.map((link: ICta, key) => {
          return (
            true && (
              <IconButton
                key={key}
                href={link?.link}
                iconProps={{
                  icon: link.text as IconType,
                  size: "regular",
                }}
                target="_blank"
              />
            )
          );
        })}
      </FlexDiv>
    </FlexDiv>
  );
};
