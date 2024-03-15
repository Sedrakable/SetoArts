import React, {
  PropsWithChildren,
  ButtonHTMLAttributes,
  FC,
  AnchorHTMLAttributes,
} from "react";
import styles from "./Button.module.scss";
import cn from "classnames";
import { Heading } from "./Heading";
import { onClickNavigate } from "../../helpers/useNavigation";
import { ReactComponent as ButtonStroke } from "../../assets/illu/ButtonStroke.svg";

export interface ButtonProps {
  variant: "fancy" | "primary" | "secondary";
  small?: boolean;
  fit?: "grow" | "shrink";
  onClick?: () => void;
  path?: string;
  disabled?: boolean;
  className?: string;
}

export const Button: FC<PropsWithChildren<
  ButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>
>> = ({ children, variant, path, disabled, small, fit, ...props }) => {
  const onClick = (e: React.MouseEvent) => {
    if (path) {
      return onClickNavigate(e, path);
    }

    if (props?.onClick) {
      props.onClick();
    }
  };

  const as = props.href ? "a" : "button";

  const ButtonHeading: React.FC<{ className?: string }> = ({ className }) => (
    <Heading
      font="Seto"
      level={small ? "5" : "5"}
      as="h5"
      color={variant === "secondary" ? "yellow" : "white"}
      className={className}
    >
      {children as string}
    </Heading>
  );

  return (
    <div className={styles.container}>
      {variant === "fancy" && <ButtonStroke className={styles.stroke} />}
      {React.createElement(
        as,
        {
          className: cn(styles.button, styles[variant], {
            [styles.small]: small,
          }),
          style: { width: fit === "grow" && "100%" },
          ...props,
          onClick,
          disabled,
          "aria-label": children as string,
        },
        <ButtonHeading />
      )}
      {variant === "fancy" && <ButtonHeading className={styles.hoverText} />}
    </div>
  );
};
