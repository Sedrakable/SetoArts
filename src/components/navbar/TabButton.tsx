import React, { FC, useState } from "react";
import { Heading } from "../reuse/Heading";
import styles from "./TabButton.module.scss";
import cn from "classnames";
import { onClickNavigate } from "../../helpers/useNavigation";
import { ReactComponent as Line } from "../../assets/illu/Line.svg";
import FlexDiv from "../reuse/FlexDiv";
import { Icon } from "../reuse/Icon";
import { DropDown } from "./Dropdown/DropDown";
import { ICta } from "../../data";
import { useLocation } from "react-router-dom";
import { FancyText } from "../reuse/FancyText";

export interface TabButtonProps {
  children: string;
  path: string;
  className?: string;
  onClick?: Function;
  dropdown?: ICta[];
}

const MyHeadingComponent: FC<{ text: string }> = ({ text }) => {
  // Split the children string based on the '+' sign
  const parts = text.replace(/ /g, "").split("+");
  console.log(parts);
  const normalHead = (head: string) => (
    <Heading font="Seto" level="5" as="h5" color="black">
      {head}
    </Heading>
  );
  return parts.length === 1 ? (
    normalHead(parts[0])
  ) : (
    <FancyText mode="tab" part1={parts[0]} part2="+ " part3={parts[1]} dark />
  );
};

const TabButton: FC<TabButtonProps> = ({
  children,
  path,
  dropdown,
  onClick,
  className,
}) => {
  const location = useLocation();
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const onTabClick = (e: React.MouseEvent<HTMLElement>) => {
    if (dropdown) {
      setDropDownOpen((prevState) => !prevState);
    } else {
      onClick && onClick();
      onClickNavigate(e, path);
    }
  };

  return (
    <nav
      onClick={(e) => onTabClick(e)}
      className={cn(styles.tabButton, className)}
    >
      <FlexDiv
        padding={{ bottom: [1], top: [1] }}
        className={styles.textWrapper}
      >
        {/* <Heading font="Seto" level="5" as="h5" color="black">
          {children}
        </Heading> */}
        <MyHeadingComponent text={children} />
        {dropdown && <Icon icon="arrow" size="small" rotate={90} />}
      </FlexDiv>
      {path === location.pathname && <Line className={styles.line} />}
      {dropDownOpen && dropdown && (
        <DropDown
          dropdown={dropdown}
          parentPath={path}
          isOpen={dropDownOpen}
          onClose={() => setDropDownOpen(false)}
        />
      )}
    </nav>
  );
};

export default TabButton;
