"use client";
import React, { FC, useState } from "react";
import { Heading } from "../../reuse/Heading";
import styles from "./TabButton.module.scss";
import cn from "classnames";
import Line from "@/assets/vector/Line.svg";
import FlexDiv from "../../reuse/FlexDiv";
import { Icon } from "../../reuse/Icon";
import { DropDown } from "../Dropdown/DropDown";
import { ICta } from "../../../data.d";
import { FancyText } from "../../reuse/FancyText";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface TabButtonProps {
  children: string;
  path: string;
  className?: string;
  onClick?: Function;
  dropdown?: ICta[];
}

const FancyHeadingComponent: FC<{ text: string }> = ({ text }) => {
  const [hasFancyText, part1, part2, part3] = useFancyText(text);

  return hasFancyText ? (
    <FancyText mode="tab" part1={part1} part2={part2} part3={part3} dark />
  ) : (
    <Heading font="Seto" level="5" as="h5" color="black">
      {text}
    </Heading>
  );
};

const useFancyText = (text: string) => {
  const parts = text.split("+");
  type FancyTextPartsType = [boolean, string, string, string];
  if (parts.length === 1) {
    return [false, text, "", ""] as FancyTextPartsType;
  } else {
    return [true, parts[0], "+ ", parts[1]] as FancyTextPartsType;
  }
};

const TabButton: FC<TabButtonProps> = ({
  children,
  path,
  dropdown,
  onClick,
  className,
}) => {
  const pathname = usePathname();
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const onTabClick = () => {
    if (dropdown) {
      setDropDownOpen((prevState) => !prevState);
    } else {
      onClick && onClick();
    }
  };

  const TabContent = () => {
    return (
      <FlexDiv
        padding={{ bottom: [1], top: [1] }}
        gapArray={[2]}
        className={styles.textWrapper}
      >
        <FancyHeadingComponent text={children} />
        {dropdown && <Icon icon="arrow" size="small" rotate={90} />}
      </FlexDiv>
    );
  };

  return (
    <li
      onClick={() => onTabClick()}
      className={cn(styles.tabButton, className)}
    >
      {dropdown ? (
        <TabContent />
      ) : (
        <Link href={path}>
          <TabContent />
        </Link>
      )}
      {path === pathname && <Line className={styles.line} />}
      {dropDownOpen && dropdown && (
        <DropDown
          dropdown={dropdown}
          parentPath={path}
          isOpen={dropDownOpen}
          onClose={() => setDropDownOpen(false)}
        />
      )}
    </li>
  );
};

export default TabButton;
