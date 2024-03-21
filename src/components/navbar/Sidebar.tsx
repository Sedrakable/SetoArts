import React from "react";
import styles from "./Sidebar.module.scss";
import { IconButton } from "../reuse/IconButton";
import cn from "classnames";
import FlexDiv from "../reuse/FlexDiv";
import { Button } from "../reuse/Button";
import { ICta, INavLink, LocalPaths } from "../../data.d";
import { LangSwitcher, LangType } from "./LangSwitcher/LangSwitcher";
import { atom, useAtom } from "jotai";
import { getTranslations } from "../../helpers/langUtils";
import { LogoLink, dropDown, isCta } from "./Navbar";
import TabButton from "./TabButton";

export const sidebarData = atom<boolean>(false);

export const Sidebar: React.FC<{
  links: (INavLink | ICta)[];
  lang: LangType;
}> = ({ links, lang }) => {
  const [sidebar, setSidebar] = useAtom(sidebarData);
  const translations = getTranslations(lang);

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
        <LogoLink lang={lang} />

        <IconButton
          onClick={() => setSidebar(false)}
          iconProps={{ icon: "close", size: "regular" }}
        />
      </FlexDiv>

      <FlexDiv
        className={styles.tabs}
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        width100
      >
        {links?.map((link: INavLink | ICta, key) => {
          if (key !== links.length - 1) {
            return isCta(link)
              ? tabWrapper(
                  <TabButton
                    key={key}
                    className={styles.tab}
                    path={`/${lang}${link.link!}`}
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
          <Button variant="fancy" path={`/${lang}${LocalPaths.CONTACT}`}>
            {translations.buttons.workWithMe}
          </Button>,
          () => setSidebar(false)
        )}
      </FlexDiv>
    </div>
  );
};
