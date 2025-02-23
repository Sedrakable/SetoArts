import React, { useEffect, useRef } from "react";
import styles from "./DropDown.module.scss";
import FlexDiv from "../../reuse/FlexDiv";
import { ICta } from "../../../data.d";
import { Paragraph } from "../../reuse/Paragraph/Paragraph";
import { useAtom } from "jotai";
import { sidebarData } from "../Sidebar/Sidebar";
import Link from "next/link";

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
  const [, setSidebar] = useAtom(sidebarData);
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

  if (!isOpen) return null;

  return (
    isOpen && (
      <FlexDiv
        flex={{ direction: "column", x: "flex-start" }}
        gapArray={[3, 3, 2, 2]}
        padding={{ vertical: [3], horizontal: [3] }}
        className={styles.dropdown}
        ref={dropdownRef}
        as="ul"
      >
        {dropdown?.map((cta, index) => {
          return (
            <FlexDiv key={index} flex={{ x: "space-between" }} width100 as="li">
              <Link
                href={`${parentPath}${cta.link!}`}
                onClick={() => setSidebar(false)}
                aria-label={cta.text}
              >
                <Paragraph level="regular">{cta.text}</Paragraph>
              </Link>
            </FlexDiv>
          );
        })}
      </FlexDiv>
    )
  );
};
