import React from "react";
import FlexDiv from "../FlexDiv";
import { IExternalLink, ISocials } from "@/data.d";
import { IconType } from "../Icon/Icon";
import { IconButton } from "../IconButton/IconButton";

export const Socials: React.FC<ISocials> = ({ links }) => {
  return (
    <FlexDiv gapArray={[4, 4, 4, 4]} wrap flex={{ x: "flex-start" }} as="ul">
      {links?.map((link: IExternalLink, key) => {
        return (
          <li key={key}>
            <IconButton
              href={link?.link}
              iconProps={{
                icon: link.text as IconType,
                size: "regular",
                color: "yellow",
              }}
              background="white"
              target="_blank"
              aria-label={link.text}
            />
          </li>
        );
      })}
    </FlexDiv>
  );
};
