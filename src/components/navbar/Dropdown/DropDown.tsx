import React, { useEffect, useRef } from "react";
import styles from "./DropDown.module.scss";
import FlexDiv from "../../reuse/FlexDiv";
import { ICta } from "../../../data";
import TabButton from "../TabButton";

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
          console.log("click outside");

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
        gapArray={[1]}
        padding={{ vertical: [3], horizontal: [3] }}
        className={styles.dropdown}
        ref={dropdownRef}
      >
        {dropdown.map((cta, index) => {
          return (
            <FlexDiv key={index} flex={{ x: "space-between" }} width100>
              <TabButton path={`${parentPath}${cta.link!}`}>
                {cta.text}
              </TabButton>
            </FlexDiv>
          );
        })}
      </FlexDiv>
    )
  );
};
