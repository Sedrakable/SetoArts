"use client";
import React, { FC, useState } from "react";
// import { Heading } from "../../reuse/Heading";
import styles from "./TabButton.module.scss";
import cn from "classnames";
import Line from "@/assets/vector/Line.svg";
import FlexDiv from "../../reuse/FlexDiv";
import { Icon } from "../../reuse/Icon";
import { DropDown } from "../Dropdown/DropDown";
import { ICta, ITheme } from "../../../data.d";
// import { FancyText } from "../../reuse/FancyText";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { useWindowResize } from "@/helpers/useWindowResize";

export interface TabButtonProps {
  children: string;
  path: string;
  className?: string;
  onClick?: () => void;
  dropdown?: ICta[];
  theme?: ITheme;
}

// const FancyHeadingComponent: FC<{ text: string }> = ({ text }) => {
//   const [hasFancyText, part1, part2, part3] = useFancyText(text);

//   return hasFancyText ? (
//     <FancyText mode="tab" part1={part1} part2={part2} part3={part3} dark />
//   ) : (
//     <Paragraph font="Outfit" level="5" as="h5" color="black">
//       {text}
//     </Heading>
//   );
// };

// const useFancyText = (text: string) => {
//   const parts = text.split("+");
//   type FancyTextPartsType = [boolean, string, string, string];
//   if (parts.length === 1) {
//     return [false, text, "", ""] as FancyTextPartsType;
//   } else {
//     return [true, parts[0], "+ ", parts[1]] as FancyTextPartsType;
//   }
// };

const TabButton: FC<TabButtonProps> = ({
  children,
  path,
  dropdown,
  onClick,
  className,
  theme = "light",
}) => {
  const pathname = usePathname();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { isMobileOrTablet } = useWindowResize();

  const handleDropdownToggle = () => {
    if (dropdown) {
      setDropDownOpen(!dropDownOpen);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobileOrTablet && dropdown) {
      setDropDownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobileOrTablet && dropdown) {
      setDropDownOpen(false);
    }
  };

  const handleClick = () => {
    if (isMobileOrTablet) {
      handleDropdownToggle();
    }
    if (onClick) {
      onClick();
    }
  };

  const TabContent = () => {
    return (
      <FlexDiv
        padding={{ bottom: [1], top: [1] }}
        gapArray={[3]}
        className={styles.textWrapper}
      >
        <Paragraph
          level="regular"
          color={theme === "light" ? "black" : "white"}
        >
          {children}
        </Paragraph>
        {dropdown && <Icon icon="arrow" size="extra-small" rotate={90} />}
      </FlexDiv>
    );
  };

  return (
    <FlexDiv
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      flex={{ direction: "column", x: "flex-start" }}
      className={cn(styles.tabButton, className)}
      height100
    >
      <Link href={path} aria-label={path}>
        <TabContent />
      </Link>

      {pathname.includes(path) && !dropDownOpen && (
        <Line className={styles.line} />
      )}

      {dropDownOpen && dropdown && (
        <DropDown dropdown={dropdown} parentPath={path} isOpen={dropDownOpen} />
      )}
    </FlexDiv>
  );
};

export default TabButton;
