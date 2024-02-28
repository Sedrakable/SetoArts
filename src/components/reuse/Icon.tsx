import React, { ReactNode } from "react";
import styles from "./Icon.module.scss";
import cn from "classnames";
import { ColorType } from "./Heading";

import { ReactComponent as Burger } from "../../assets/illu/Burger.svg";
import { ReactComponent as Close } from "../../assets/illu/X.svg";
import { ReactComponent as Diamond } from "../../assets/illu/Diamond.svg";
import { ReactComponent as Arrow } from "../../assets/illu/Arrow.svg";
import { ReactComponent as Bulb } from "../../assets/illu/Bulb.svg";
import { ReactComponent as Layout } from "../../assets/illu/Layout.svg";
import { ReactComponent as Palette } from "../../assets/illu/ColorPalette.svg";
import { ReactComponent as Package } from "../../assets/illu/Package.svg";
import { ReactComponent as Internet } from "../../assets/illu/Internet.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faInstagram,
  faKickstarter,
  faTiktok,
  faFacebook,
  faBehance,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const icons = {
  kickstarter: faKickstarter,
  instagram: faInstagram,
  tiktok: faTiktok,
  facebook: faFacebook,
  behance: faBehance,
  linkedin: faLinkedin,
  burger: <Burger />,
  diamond: <Diamond />,
  close: <Close />,
  arrow: <Arrow />,
  bulb: <Bulb />,
  layout: <Layout />,
  palette: <Palette />,
  package: <Package />,
  internet: <Internet />,
};

export const IconTypeArray = Object.keys(icons) as Array<keyof typeof icons>;

export type IconType = typeof IconTypeArray[number];

export const isIcon = (x: any): x is IconType => IconTypeArray.includes(x);

export const Rotations = [90, 180, 270] as const;

export type RotateType = typeof Rotations[number];

export type IconSizes = "extra-small" | "small" | "regular" | "big";

export interface IconProps {
  icon: IconType;
  rotate?: RotateType;
  color?: ColorType;
  size?: IconSizes;
  className?: string;
}

const isIconDefinition = (
  icon: IconDefinition | ReactNode
): icon is IconDefinition => {
  return (icon as IconDefinition).iconName !== undefined;
};

export const Icon: React.FC<IconProps> = ({
  icon,
  rotate,
  color = "yellow",
  size = "regular",
  className,
}) => {
  if (!isIcon(icon)) {
    console.error(`Icon ${icon} not found`);
    return null;
  }
  const IconComponent = isIconDefinition(icons[icon]) ? (
    <FontAwesomeIcon icon={icons[icon] as IconDefinition} />
  ) : (
    (icons[icon] as ReactNode)
  );

  return (
    <span
      className={cn(styles.icon, className, {
        [styles[`rotate_${rotate}deg`]]: rotate,
        [styles[`icon_${color}`]]: color,
        [styles[size]]: size,
      })}
    >
      {IconComponent}
    </span>
  );
};
