"use client";
import React, { FC, useState } from "react";
import cn from "classnames";
import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "./TabButton.module.scss";
import Line from "@/assets/vector/Line.svg";
import { ICta, ITheme } from "../../../data.d";
import FlexDiv from "../../reuse/FlexDiv";
import { Icon } from "../../reuse/Icon/Icon";
import { Paragraph } from "../../reuse/Text/Paragraph/Paragraph";
import { DropDown } from "../Dropdown/DropDown";

export interface TabButtonProps {
  children: string;
  path: string;
  className?: string;
  onClick?: () => void;
  dropdown?: ICta[];
  theme?: ITheme;
}

export const TabButton: FC<TabButtonProps> = ({
  children,
  path,
  dropdown,
  onClick,
  className,
  theme = "light",
}) => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Cleanup: Renamed for clarity

  // Cleanup: Consolidated dropdown toggle logic
  const toggleDropdown = () => dropdown && setIsDropdownOpen(!isDropdownOpen);

  // Cleanup: Simplified event handlers
  const handleMouseEnter = () => dropdown && setIsDropdownOpen(true);
  const handleMouseLeave = () => dropdown && setIsDropdownOpen(false);
  const handleClick = () => {
    toggleDropdown();
    onClick?.();
  };

  // Cleanup: Extracted TabContent for reusability
  const TabContent = () => (
    <FlexDiv
      padding={{ bottom: [1], top: [1] }}
      gapArray={[4]}
      className={styles.textWrapper}
    >
      <Paragraph level="regular" color={theme === "light" ? "black" : "white"}>
        {children}
      </Paragraph>
      {dropdown && <Icon icon="arrow" size="extra-small" rotate={90} />}
    </FlexDiv>
  );

  return (
    <FlexDiv
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      flex={{ direction: "column", x: "flex-start" }}
      className={cn(styles.tabButton, className)}
      height100
    >
      <Link href={path} aria-label={children}>
        <TabContent />
      </Link>

      {/* Cleanup: Simplified condition for line display */}
      {pathname.includes(path) && !isDropdownOpen && (
        <Line className={styles.line} />
      )}

      {isDropdownOpen && dropdown && (
        <DropDown
          dropdown={dropdown}
          parentPath={path}
          isOpen={isDropdownOpen}
        />
      )}
    </FlexDiv>
  );
};

export default TabButton;
