import React, { PropsWithChildren } from "react";
import styles from "./Tag.module.scss";
import cn from "classnames";
import { Paragraph } from "../Paragraph/Paragraph";
import FlexDiv from "../FlexDiv";

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
      padding={{ horizontal: [4], top: [2], bottom: [2] }}
      onClick={onClick}
    >
      <Paragraph level="small" color="black" aria-label={children} weight={600}>
        {children}
      </Paragraph>
    </FlexDiv>
  );
};
