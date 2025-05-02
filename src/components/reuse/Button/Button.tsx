"use client";
import React, {
  PropsWithChildren,
  ButtonHTMLAttributes,
  FC,
  MouseEvent,
} from "react";
import styles from "./Button.module.scss";
import cn from "classnames";

import Link, { LinkProps } from "next/link";
import { Paragraph } from "../Text/Paragraph/Paragraph";
import { Icon, IconProps } from "../Icon/Icon";
import { useWindowResize } from "@/helpers/useWindowResize";
import { LocalTargets } from "@/data.d";
import { useScrollToTarget } from "@/helpers/useScrollToTarget";

interface ButtonIconProps extends IconProps {
  side?: "left" | "right";
}

export interface ButtonProps {
  variant: "fancy" | "primary" | "black" | "white";
  small?: boolean;
  fit?: "grow" | "shrink";
  iconProps?: ButtonIconProps;
  path?: string;
  scrollTarget?: LocalTargets; // Use enum for type safety
  target?: React.HTMLAttributeAnchorTarget; // For <a> target (_blank, etc.)
  href?: string;
  disabled?: boolean;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
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
  scrollTarget,
  target,
  onClick,
  ...props
}) => {
  const { isMobile } = useWindowResize();
  const { scrollToTarget: scrollToTargetFn } = useScrollToTarget();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    if (disabled) return;

    // Handle scroll target if available
    if (scrollTarget && scrollToTargetFn(scrollTarget, path)) {
      event.preventDefault();
      return;
    }

    // Execute onClick handler if provided
    if (onClick) {
      onClick(event as React.MouseEvent<HTMLButtonElement>);
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
    <Link href={path} {...buttonProps} onClick={handleClick}>
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
      disabled={disabled}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {buttonContent}
    </button>
  );
  return variant === "fancy" ? (
    <div className={styles.container}>
      {buttonComp}
      {buttonComp}
    </div>
  ) : (
    buttonComp
  );
};
