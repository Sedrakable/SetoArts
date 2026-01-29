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
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const normalize = (p: string) => p.replace(/\/$/, "");
  const normalizedPath = normalize(path);
  const normalizedPathname = normalize(pathname);

  const locale = `/${useLocale() as LangType}`;

  const isActive =
    normalizedPath === locale // Check if we're on the home page for current locale
      ? normalizedPathname === locale
      : normalizedPathname === normalizedPath ||
        normalizedPathname.startsWith(normalizedPath + "/");

  const hasDropdown = !!dropdown?.length;

  const openDropdown = () => hasDropdown && setIsDropdownOpen(true);
  const closeDropdown = () => hasDropdown && setIsDropdownOpen(false);
  const toggleDropdown = () => hasDropdown && setIsDropdownOpen((v) => !v);

  const handleClick = () => {
    if (hasDropdown) toggleDropdown();
    onClick?.();
  };

  const TabContent = () => (
    <FlexDiv
      padding={{ bottom: [1], top: [1] }}
      gapArray={[4]}
      className={styles.textWrapper}
    >
      <Paragraph level="regular" color={theme === "light" ? "black" : "white"}>
        {children}
      </Paragraph>
      {hasDropdown && <Icon icon="arrow" size="extra-small" rotate={90} />}
    </FlexDiv>
  );

  return (
    <FlexDiv
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
      flex={{ direction: "column", x: "flex-start" }}
      className={cn(styles.tabButton, className)}
      height100
    >
      {/* If dropdown exists: NOT a link. Only toggles dropdown */}
      {hasDropdown ? (
        <button
          type="button"
          className={styles.tabButtonTrigger} // create this class (or reuse)
          aria-label={children}
          aria-haspopup="menu"
          aria-expanded={isDropdownOpen}
          onClick={handleClick}
        >
          <TabContent />
        </button>
      ) : (
        <Link href={path} aria-label={children} onClick={onClick}>
          <TabContent />
        </Link>
      )}

      {isActive && <Line className={styles.line} />}

      {isDropdownOpen && hasDropdown && (
        <div onClick={(e) => e.stopPropagation()}>
          <DropDown
            dropdown={dropdown!}
            parentPath={path}
            isOpen={isDropdownOpen}
          />
        </div>
      )}
    </FlexDiv>
  );
};
