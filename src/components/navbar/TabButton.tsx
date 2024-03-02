import React, { useState } from "react";
import { Heading } from "../reuse/Heading";
import styles from "./TabButton.module.scss";
import cn from "classnames";
import { onClickNavigate } from "../../helpers/useNavigation";
import { ReactComponent as Line } from "../../assets/illu/Line.svg";
import FlexDiv from "../reuse/FlexDiv";
import { Icon } from "../reuse/Icon";
import { useWindowResize } from "../../helpers/useWindowResize";
import { DropDown } from "./Dropdown/DropDown";
import { ICta } from "../../data";
import { useLocation } from "react-router-dom";

export interface TabButtonProps {
  children: string;
  path: string;
  className?: string;
  onClick?: Function;
  dropdown?: ICta[];
}

const TabButton: React.FC<TabButtonProps> = ({
  children,
  path,
  dropdown,
  onClick,
  className,
}) => {
  const location = useLocation();
  const { isMobileOrTablet } = useWindowResize();
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
        <Heading font="Seto" level="5" as="h5" color="black">
          {children}
        </Heading>
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
