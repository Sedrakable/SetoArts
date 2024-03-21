import React, { useEffect, useRef } from "react";
import styles from "./DropDown.module.scss";
import FlexDiv from "../../reuse/FlexDiv";
import { ICta } from "../../../data";
import { Link } from "../../reuse/Link";
import { Paragraph } from "../../reuse/Paragraph";

export interface DropDownProps {
  parentPath: string;
  dropdown: ICta[];
  isOpen: boolean;
  onClose: Function;
}
export const DropDown: React.FC<DropDownProps> = ({
  parentPath,
  dropdown,
  isOpen,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      setTimeout(() => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      }, 50);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <FlexDiv
        flex={{ direction: "column", x: "flex-start" }}
        gapArray={[2]}
        padding={{ vertical: [3], horizontal: [3] }}
        className={styles.dropdown}
        ref={dropdownRef}
      >
        {dropdown?.map((cta, index) => {
          return (
            <FlexDiv key={index} flex={{ x: "space-between" }} width100>
              <Link path={`${parentPath}${cta.link!}`}>
                <Paragraph level="regular">{cta.text}</Paragraph>
              </Link>
            </FlexDiv>
          );
        })}
      </FlexDiv>
    )
  );
};
