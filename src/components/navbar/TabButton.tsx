import React, { useState } from "react";
import { Heading } from "../reuse/Heading";
import { Link } from "../reuse/Link";
import styles from "./TabButton.module.scss";
import cn from "classnames";
import { onClickNavigate } from "../../helpers/useNavigation";
import { ReactComponent as Line } from "../../assets/illu/Line.svg";
import { FlexDiv } from "../reuse/FlexDiv";
import { useLocation } from "react-router-dom";
import { ICta } from "../../data";
import { Icon } from "../reuse/Icon";
import { Paragraph } from "../reuse/Paragraph";
import { useWindowResize } from "../../helpers/useWindowResize";

interface TabButtonProps {
  children: string;
  path: string;
  dropdown?: ICta[];
  className?: string;
}
const TabButton: React.FC<TabButtonProps> = ({
  children,
  path,
  dropdown,
  className,
}) => {
  const { isMobileOrTablet } = useWindowResize();
  const location = useLocation();
  const [dropDownOpen, setDropDownOpen] = useState(false);

  return (
    <div
      onClick={(e) =>
        dropdown ? setDropDownOpen(true) : onClickNavigate(e, path)
      }
      className={cn(styles.tabButton, className)}
    >
      <FlexDiv padding={{ bottom: [1], top: [1] }}>
        <Heading font="Seto" level="5" as="h5" clickable color="black">
          {children}
        </Heading>
        {dropdown && <Icon icon="arrow" size="small" rotate={90} />}
      </FlexDiv>
      {path === location.pathname && <Line className={styles.line} />}
      {dropDownOpen && !isMobileOrTablet && (
        <FlexDiv
          className={styles.dropdown}
          flex={{ direction: "column", x: "flex-start" }}
          padding={{ horizontal: [2], vertical: [2] }}
        >
          {dropdown?.map((cta, key) => {
            return (
              <Link
                key={key}
                onClick={(e) => onClickNavigate(e, cta.link!)}
                href={cta.link!}
              >
                <Paragraph
                  level="regular"
                  clickable
                  color="black"
                  textAlign="start"
                >
                  {cta.text}
                </Paragraph>
              </Link>
            );
          })}
        </FlexDiv>
      )}
    </div>
  );
};

export default TabButton;
