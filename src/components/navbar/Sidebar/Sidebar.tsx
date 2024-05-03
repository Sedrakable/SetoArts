import React from "react";
import styles from "./Sidebar.module.scss";
import { IconButton } from "../../reuse/IconButton";
import cn from "classnames";
import FlexDiv from "../../reuse/FlexDiv";
import { Button } from "../../reuse/Button";
import { ICta, INavLink, LocalPaths } from "../../../data.d";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import { atom, useAtom } from "jotai";
import { getTranslations } from "../../../helpers/langUtils";
import { LogoLink, dropDown, isCta } from "../Navbar/Navbar";
import TabButton from "../TabButton/TabButton";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";

export const sidebarData = atom<boolean>(false);

export const Sidebar: React.FC<{
  links: (INavLink | ICta)[];
  lang: LangType;
}> = ({ links, lang }) => {
  const [sidebar, setSidebar] = useAtom(sidebarData);
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  const tabWrapper = (
    child: React.ReactNode,
    onClick?: Function,
    key?: number
  ) => (
    <FlexDiv
      key={key}
      className={styles.tabWrapper}
      flex={{ x: "flex-start" }}
      padding={{ horizontal: [4, 6, 0, 0], vertical: [3, 4, 0, 0] }}
      onClick={() => onClick && onClick()}
      as="li"
    >
      {child}
    </FlexDiv>
  );

  const langSwitcherWrapper = tabWrapper(
    <LangSwitcher onClick={() => setSidebar(false)} />
  );

  return (
    <div className={cn(styles.sidebar, { [styles.isOpen]: sidebar })}>
      <FlexDiv
        className={styles.closeTab}
        width100
        flex={{ x: "space-between" }}
        padding={{ horizontal: [4, 5, 0, 0], vertical: [3, 4, 0, 0] }}
      >
        <LogoLink locale={locale} />

        <IconButton
          onClick={() => setSidebar(false)}
          iconProps={{ icon: "close", size: "regular" }}
        />
      </FlexDiv>

      <FlexDiv
        className={styles.tabs}
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        width100
        as="ul"
      >
        {links?.map((link: INavLink | ICta, key) => {
          if (key !== links.length - 1) {
            return isCta(link)
              ? tabWrapper(
                  <TabButton
                    key={key}
                    className={styles.tab}
                    path={`/${locale}${link.link!}`}
                    onClick={() => setSidebar(false)}
                  >
                    {link.text}
                  </TabButton>,
                  undefined,
                  key
                )
              : tabWrapper(dropDown(link, lang), undefined, key);
          }
          return null;
        })}
        {langSwitcherWrapper}
        <div className={styles.overlay} onClick={() => setSidebar(false)} />
        {tabWrapper(
          <Button variant="fancy" path={`/${locale}${LocalPaths.CONTACT}`}>
            {translations.buttons.workWithMe}
          </Button>,
          () => setSidebar(false)
        )}
      </FlexDiv>
    </div>
  );
};
