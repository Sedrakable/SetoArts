import React, { PropsWithChildren } from "react";
import styles from "./Tag.module.scss";
import cn from "classnames";
import FlexDiv from "./FlexDiv";
import { Paragraph } from "./Paragraph";

interface TagProps {
  chosen?: boolean;
  children: string;
  onClick?: () => void;
}
export const Tag: React.FC<PropsWithChildren<TagProps>> = ({
  chosen,
  children,
  onClick,
}) => {
  return (
    <FlexDiv
      className={cn(styles.tag, { [styles.chosen]: chosen })}
      padding={{ horizontal: [3], top: [2], bottom: [1] }}
      onClick={onClick}
    >
      <Paragraph
        level="small"
        weight="regular"
        color={chosen ? "yellow" : "grey"}
        aria-label={children}
      >
        {children}
      </Paragraph>
    </FlexDiv>
  );
};
