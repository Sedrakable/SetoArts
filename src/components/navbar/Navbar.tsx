import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import TabButton from "./TabButton";
import { useWindowResize } from "../../helpers/useWindowResize";
import { IconButton } from "../reuse/IconButton";
import cn from "classnames";
import { Link } from "../reuse/Link";
import { onClickNavigate } from "../../helpers/useNavigation";
import FlexDiv from "../reuse/FlexDiv";
import { ReactComponent as Logo } from "../../assets/illu/LogoSmall.svg";
import { Button } from "../reuse/Button";
import { ICta, INavBar, INavLink, LocalPaths } from "../../data.d";
import { LangSwitcher, langData } from "./LangSwitcher/LangSwitcher";
import { useAtom } from "jotai";
import { getTranslations } from "../../helpers/langUtils";

export const isCta = (link: INavLink | ICta): link is ICta => {
  return (link as ICta).link !== undefined;
};

export const Navbar: React.FC<INavBar> = ({ links }) => {
  const { isMobile, isMobileOrTablet } = useWindowResize();
  const [sidebar, setSidebar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const offset = navRef?.current?.clientHeight!;
      const isScrolled = window.scrollY > offset;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navRef]);

  const logoComp = (
    <Link
      onClick={(e) => onClickNavigate(e, `/${lang}${LocalPaths.HOME}`)}
      href=""
      className={styles.logo}
      aria-label={translations.nav.home}
    >
      <Logo />
    </Link>
  );

  const tab = (cta: ICta, key?: number) => {
    return (
      <TabButton key={key} className={styles.tab} path={`/${lang}${cta.link!}`}>
        {cta.text}
      </TabButton>
    );
  };

  const dropDown = (navLink: INavLink, key?: number) => {
    return (
      <TabButton
        key={key}
        className={styles.tab}
        path={`/${lang}${LocalPaths.SERVICE}`}
        dropdown={navLink.ctaArray}
      >
        {navLink.title}
      </TabButton>
    );
  };

  const tabWrapper = (
    child: React.JSX.Element,
    dropDown: boolean = false,
    key?: number
  ) => {
    return (
      <FlexDiv
        key={key}
        className={styles.tabWrapper}
        flex={{ x: "flex-start" }}
        padding={{ horizontal: [4, 6, 0, 0], vertical: [3, 4, 0, 0] }}
        onClick={() => !dropDown && setSidebar(false)}
      >
        {child}
      </FlexDiv>
    );
  };

  const lastLink =
    isCta(links[links.length - 1]) && (links[links.length - 1] as ICta);

  const sidebarComp = (
    <div className={cn(styles.sidebar, { [styles.isOpen]: sidebar })}>
      <FlexDiv
        className={styles.closeTab}
        width100
        flex={{ x: "space-between" }}
        padding={{ horizontal: [4, 5, 0, 0] }}
      >
        {logoComp}
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
              ? tabWrapper(tab(link), false, key)
              : tabWrapper(dropDown(link), true, key);
          }
          return null;
        })}
        {isMobile && tabWrapper(<LangSwitcher />)}
        {lastLink &&
          tabWrapper(
            <Button variant="fancy" path={`/${lang}/contact`}>
              {lastLink.text}
            </Button>
          )}
      </FlexDiv>
    </div>
  );

  return (
    <>
      <div
        className={cn(styles.navbarWrapper, { [styles.scrolled]: scrolled })}
        ref={navRef}
      >
        <FlexDiv
          className={styles.navbar}
          flex={{ x: "space-between", y: "center" }}
          height100
        >
          {logoComp}

          <FlexDiv
            flex={{ x: "space-between", y: "center" }}
            gapArray={[3, 5, 6, 7]}
          >
            {!isMobile && (
              <FlexDiv gapArray={[5, 4, 5, 6]}>
                {links?.map((link: INavLink | ICta, key) => {
                  if (key === links.length - 1 && isCta(link)) {
                    return (
                      <Button
                        variant="fancy"
                        small={isMobile}
                        path={`/${lang}/contact`}
                        key={key}
                      >
                        {link.text}
                      </Button>
                    );
                  }
                  return (
                    !isMobileOrTablet &&
                    (isCta(link) ? tab(link, key) : dropDown(link, key))
                  );
                })}
              </FlexDiv>
            )}
            {!isMobile && <LangSwitcher />}
            {isMobileOrTablet && (
              <IconButton
                onClick={() => setSidebar(true)}
                iconProps={{ icon: "burger", size: "regular" }}
                background="white"
              />
            )}
          </FlexDiv>
        </FlexDiv>
      </div>
      {isMobileOrTablet && sidebarComp}
    </>
  );
};
