import React, {
  useState,
  FC,
  PropsWithChildren,
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
} from "react";
import styles from "./Alert.module.scss";
import cn from "classnames";
import { Icon } from "../Icon";
import FlexDiv from "../FlexDiv";
import { josefin } from "../Heading";
import { Paragraph } from "../Paragraph/Paragraph";

export interface AlertProps {
  children: ReactNode;
  arrow?: "left" | "right" | "top" | "bottom";
  width100?: boolean;
}

export const Alert: FC<PropsWithChildren<AlertProps>> = ({
  children,
  arrow,
  width100,
}) => {
  return (
    <span
      className={styles.wrapper}
      style={{ width: width100 ? "100%" : "auto" }}
    >
      <FlexDiv
        padding={{ horizontal: [4] }}
        className={cn(styles.alert, {
          [styles[`arrow_${arrow}`]]: arrow,
          [styles.arrow]: arrow,
        })}
        width100={width100}
      >
        <Paragraph level="regular" color="burgundy" textAlign="center">
          {children}
        </Paragraph>
      </FlexDiv>
    </span>
  );
};
