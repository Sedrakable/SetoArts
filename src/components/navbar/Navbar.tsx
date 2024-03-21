import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import TabButton from "./TabButton";
import { useWindowResize } from "../../helpers/useWindowResize";
import { IconButton } from "../reuse/IconButton";
import cn from "classnames";
import { Link } from "../reuse/Link";
import FlexDiv from "../reuse/FlexDiv";
import { ReactComponent as Logo } from "../../assets/illu/LogoSmall.svg";
import { Button } from "../reuse/Button";
import { ICta, INavBar, INavLink, LocalPaths } from "../../data.d";
import { LangSwitcher, LangType, langData } from "./LangSwitcher/LangSwitcher";
import { useAtom } from "jotai";
import { getTranslations } from "../../helpers/langUtils";
import { Sidebar, sidebarData } from "./Sidebar";

export const isCta = (link: INavLink | ICta): link is ICta => {
  return (link as ICta).link !== undefined;
};

export const Navbar: React.FC<INavBar> = ({ links }) => {
  const { isMobile, isMobileOrTablet } = useWindowResize();

  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [lang] = useAtom(langData);
  const [, setSidebar] = useAtom(sidebarData);

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
          <LogoLink lang={lang} />

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
                        path={`/${lang}${LocalPaths.CONTACT}`}
                        key={key}
                      >
                        {link.text}
                      </Button>
                    );
                  }
                  return (
                    !isMobileOrTablet &&
                    (isCta(link) ? (
                      <TabButton
                        key={key}
                        className={styles.tab}
                        path={`/${lang}${link.link!}`}
                      >
                        {link.text}
                      </TabButton>
                    ) : (
                      dropDown(link, lang, key)
                    ))
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
      {isMobileOrTablet && <Sidebar links={links} lang={lang} />}
    </>
  );
};

// Helper components
export const LogoLink: React.FC<{ lang: LangType }> = ({ lang }) => {
  const translations = getTranslations(lang);
  const [, setSidebar] = useAtom(sidebarData);
  return (
    <Link
      path={`/${lang}${LocalPaths.HOME}`}
      className={styles.logo}
      aria-label={translations.nav.home}
      onClick={() => setSidebar(false)}
    >
      <Logo />
    </Link>
  );
};

export const dropDown = (navLink: INavLink, lang: LangType, key?: number) => (
  <TabButton
    key={key}
    className={styles.tab}
    path={`/${lang}${LocalPaths.SERVICE}`}
    dropdown={navLink.ctaArray}
  >
    {navLink.title}
  </TabButton>
);
