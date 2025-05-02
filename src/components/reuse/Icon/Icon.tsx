import React, { ReactNode } from "react";
import styles from "./Icon.module.scss";
import cn from "classnames";
import { ColorType } from "../Text/Heading/Heading";

import Burger from "@/assets/vector/Burger.svg";
import Close from "@/assets/vector/X.svg";
import Arrow from "@/assets/vector/Arrow.svg";
import Bulb from "@/assets/vector/Bulb.svg";
import Upload from "@/assets/vector/Upload.svg";

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

const icons: {
  [key: string]: ReactNode | IconDefinition;
} = {
  kickstarter: faKickstarter,
  instagram: faInstagram,
  tiktok: faTiktok,
  facebook: faFacebook,
  behance: faBehance,
  linkedin: faLinkedin,
  burger: <Burger />,
  close: <Close />,
  arrow: <Arrow />,
  bulb: <Bulb />,
  upload: <Upload />,
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
