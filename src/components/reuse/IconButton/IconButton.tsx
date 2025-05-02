"use client";
import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  PropsWithChildren,
} from "react";
import styles from "./IconButton.module.scss";
import cn from "classnames";
import { IconProps, Icon } from "../Icon/Icon";

export interface IconButtonProps {
  iconProps: IconProps;
  background?: "black" | "white";
}

export const IconButton: FC<PropsWithChildren<
  IconButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>
>> = ({ iconProps, background = "black", ...props }) => {
  const as = props.href ? "a" : "button";

  return React.createElement(
    as,
    {
      className: cn(styles.button, styles[background]),
      ...props,
    },
    <Icon {...iconProps} />
  );
};
