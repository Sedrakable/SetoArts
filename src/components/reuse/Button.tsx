"use client";
import React, { PropsWithChildren, ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";
import cn from "classnames";
import { Heading } from "./Heading";
import ButtonStroke from "@/assets/vector/ButtonStroke.svg";
import Link, { LinkProps } from "next/link";

export interface ButtonProps {
  variant: "fancy" | "primary" | "secondary";
  small?: boolean;
  fit?: "grow" | "shrink";
  onClick?: () => void;
  path?: string;
  disabled?: boolean;
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
}

export const Button: FC<PropsWithChildren<
  ButtonProps & (ButtonHTMLAttributes<HTMLButtonElement> | LinkProps)
>> = ({ children, variant, path, disabled, small, fit, target, ...props }) => {
  const onClick = () => {
    if (props?.onClick) {
      props.onClick();
    }
  };

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
      {path ? (
        <Link
          href={path}
          className={cn(styles.button, styles[variant], {
            [styles.small]: small,
          })}
          style={{ width: fit === "grow" ? "100%" : "auto" }}
          target={target}
        >
          <ButtonHeading />
        </Link>
      ) : (
        <button
          className={cn(styles.button, styles[variant], {
            [styles.small]: small,
          })}
          style={{ width: fit === "grow" ? "100%" : "auto" }}
          onClick={() => onClick()}
          disabled={disabled}
          aria-label={children as string}
        >
          <ButtonHeading />
        </button>
      )}
      {variant === "fancy" && <ButtonHeading className={styles.hoverText} />}
    </div>
  );
};
