import React, {
  PropsWithChildren,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";
import styles from "./Link.module.scss";
import cn from "classnames";
import { NavLink } from "react-router-dom";

export interface LinkProps {
  children: string | ReactNode;
  href?: string;
  path?: string;
  className?: string;
}
export const Link: React.FC<PropsWithChildren<
  LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
>> = ({ children, href, className, path, ...props }) => {
  const linkProps = {
    className: cn(styles.link, className),
    ...props,
  };

  return path ? (
    <NavLink {...linkProps} to={path}>
      {children}
    </NavLink>
  ) : (
    <a {...linkProps} about="a link">
      {children}
    </a>
  );
};
