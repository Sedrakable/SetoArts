import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  PropsWithChildren,
} from "react";
import styles from "./IconButton.module.scss";
import { Icon, IconProps } from "./Icon";

export interface IconButtonProps {
  iconProps: IconProps;
}
export const IconButton: FC<PropsWithChildren<
  IconButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>
>> = ({ iconProps, ...props }) => {
  const as = props.href ? "a" : "button";

  return React.createElement(
    as,
    {
      className: styles.button,
      ...props,
    },
    <Icon {...iconProps} />
  );
};
