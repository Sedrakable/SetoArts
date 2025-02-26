"use client";
import React, { PropsWithChildren, ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";
import cn from "classnames";
import { Heading } from "./Heading";
import ButtonStroke from "@/assets/vector/ButtonStroke.svg";
import Link, { LinkProps } from "next/link";
import { Paragraph } from "./Paragraph/Paragraph";
import { Icon, IconProps } from "./Icon";
import { useWindowResize } from "@/helpers/useWindowResize";

interface ButtonIconProps extends IconProps {
  side?: "left" | "right";
}

export interface ButtonProps {
  variant: "fancy" | "primary" | "black" | "white";
  small?: boolean;
  fit?: "grow" | "shrink";
  iconProps?: ButtonIconProps;
  onClick?: (() => void) | ((event: MouseEvent) => void);
  path?: string;
  href?: string;
  disabled?: boolean;
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
}

export const Button: FC<PropsWithChildren<
  ButtonProps & (ButtonHTMLAttributes<HTMLButtonElement> | LinkProps)
>> = ({
  children,
  variant,
  iconProps,
  path,
  href,
  disabled,
  small,
  fit,
  target,
  onClick,
  ...props
}) => {
  const { isMobile } = useWindowResize();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      if (onClick.length === 0) {
        (onClick as () => void)();
      } else {
        // eslint-disable-next-line no-unused-vars
        (onClick as (event: React.MouseEvent<HTMLButtonElement>) => void)(
          event
        );
      }
    }
  };

  const ButtonHeading: React.FC<{ className?: string }> = ({ className }) => (
    <Paragraph
      level="regular"
      color={variant === "black" ? "white" : "black"}
      className={className}
      textAlign="center"
    >
      {children as string}
    </Paragraph>
  );
  const iconElement = iconProps && <Icon {...iconProps} color="white" />;
  const buttonContent = (
    <>
      {iconProps?.side === "left" && iconElement}
      {children && <ButtonHeading />}
      {(!iconProps?.side || iconProps.side === "right") && iconElement}
    </>
  );

  const buttonStyles = cn(styles.button, styles[variant], {
    [styles.small]: small,
    [styles.onlyIcon]: iconProps && !children,
    [styles.withIcon]: iconProps && children,
    [styles.iconLeft]: iconProps?.side === "left",
    [styles.iconRight]: !iconProps?.side || iconProps.side === "right",
    [styles.disabled]: disabled,
  });

  const buttonProps = {
    className: buttonStyles,
    style: {
      width:
        fit === "shrink"
          ? "auto"
          : fit === "grow" || isMobile
          ? "100%"
          : "auto",
    },
    "aria-label": children ? (children as string) : props["aria-label"],
  };
  const buttonComp = path ? (
    <Link href={path} {...buttonProps} target={target}>
      {buttonContent}
    </Link>
  ) : href ? (
    <a
      {...buttonProps}
      href={href}
      target={target || "_blank"}
      rel="noopener noreferrer"
    >
      {buttonContent}
    </a>
  ) : (
    <button
      {...buttonProps}
      onClick={handleClick}
      // disabled={disabled}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {buttonContent}
    </button>
  );
  return variant === "fancy" ? (
    <div className={styles.container}>
      {<ButtonStroke className={styles.stroke} />}
      {buttonComp}
      {/* {<ButtonHeading className={styles.hoverText} />} */}
    </div>
  ) : (
    buttonComp
  );
};
