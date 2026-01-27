import React, { useRef } from "react";
import styles from "./DropDown.module.scss";
import cn from "classnames";
import FlexDiv from "../../reuse/FlexDiv";
import { ICta } from "../../../data.d";
import { Paragraph } from "../../reuse/Text/Paragraph/Paragraph";
import { useAtom } from "jotai";
import { sidebarData } from "../Sidebar/Sidebar";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export interface DropDownProps {
  parentPath: string;
  dropdown: ICta[];
  isOpen: boolean;
}
export const DropDown: React.FC<DropDownProps> = ({
  parentPath,
  dropdown,
  isOpen,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [, setSidebar] = useAtom(sidebarData);
  const pathname = usePathname();
  const locale = useLocale();

  if (!isOpen) return null;

  return (
    isOpen && (
      <FlexDiv
        flex={{ direction: "column", x: "flex-start" }}
        gapArray={[3, 3, 2, 2]}
        padding={{ vertical: [3] }}
        className={styles.dropdown}
        ref={dropdownRef}
        as="ul"
      >
        {dropdown?.map((cta, index) => {
          const isActive =
            `/${locale}${pathname}` === `${parentPath}${cta.path}`;
          return (
            <Link
              href={`${parentPath}${cta.path!}`}
              onClick={() => setSidebar(false)}
              aria-label={cta.text}
              key={index}
              className={styles.link}
            >
              <FlexDiv
                flex={{ x: "space-between" }}
                width100
                as="li"
                padding={{ vertical: [4, 4, 3], horizontal: [2, 2, 4, 4] }}
                className={cn(styles.tab, { [styles.selected]: isActive })}
              >
                <Paragraph level="regular" color="black">
                  {cta.text}
                </Paragraph>
              </FlexDiv>
            </Link>
          );
        })}
      </FlexDiv>
    )
  );
};
