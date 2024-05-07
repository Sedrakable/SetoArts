"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import TabButton from "../TabButton/TabButton";
import { useWindowResize } from "../../../helpers/useWindowResize";
import { IconButton } from "../../reuse/IconButton";
import cn from "classnames";
import FlexDiv from "../../reuse/FlexDiv";
import Logo from "@/assets/vector/LogoSmall.svg";
import { Button } from "../../reuse/Button";
import { ICta, INavBar, INavLink, LocalPaths } from "../../../data.d";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import { useAtom } from "jotai";
import { getTranslations } from "../../../helpers/langUtils";
import { sidebarData } from "../Sidebar/Sidebar";
import Link from "next/link";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import dynamic from "next/dynamic";

const Sidebar = dynamic(
  () => import("../Sidebar/Sidebar").then((module) => module.Sidebar),
  {
    ssr: false,
  }
);

export const isCta = (link: INavLink | ICta): link is ICta => {
  return (link as ICta).link !== undefined;
};

export const Navbar: React.FC<INavBar> = ({ links }) => {
  const { isMobile, isMobileOrTablet } = useWindowResize();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const locale = useLocale() as LangType;
  const [, setSidebar] = useAtom(sidebarData);

  useEffect(() => {
    const handleScroll = () => {
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
      <nav
        className={cn(styles.navbarWrapper, { [styles.scrolled]: scrolled })}
        ref={navRef}
      >
        <FlexDiv
          className={styles.navbar}
          flex={{ x: "space-between", y: "center" }}
          height100
        >
          <LogoLink locale={locale} />

          <FlexDiv
            flex={{ x: "space-between", y: "center" }}
            gapArray={[3, 5, 6, 7]}
          >
            {!isMobile && (
              <FlexDiv gapArray={[5, 4, 5, 6]} as="ul">
                {links?.map((link: INavLink | ICta, key) => {
                  if (key === links.length - 1 && isCta(link)) {
                    return (
                      <li key={key}>
                        <Button
                          variant="fancy"
                          small={isMobile}
                          path={`/${locale}${LocalPaths.CONTACT}`}
                        >
                          {link.text}
                        </Button>
                      </li>
                    );
                  }
                  return (
                    !isMobileOrTablet &&
                    (isCta(link) ? (
                      <li key={key}>
                        <TabButton
                          className={styles.tab}
                          path={`/${locale}${link.link!}`}
                        >
                          {link.text}
                        </TabButton>
                      </li>
                    ) : (
                      <li key={key}>{dropDown(link, locale, key)}</li>
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
                aria-label="burger menu"
              />
            )}
          </FlexDiv>
        </FlexDiv>
      </nav>
      {isMobileOrTablet && <Sidebar links={links} lang={locale} />}
    </>
  );
};

// Helper components
export const LogoLink: React.FC<{ locale: LangType }> = ({ locale }) => {
  const translations = getTranslations(locale);
  const [, setSidebar] = useAtom(sidebarData);
  return (
    <Link
      href={`/${locale}${LocalPaths.HOME}`}
      className={styles.logo}
      aria-label={translations.nav.home}
      onClick={() => setSidebar(false)}
    >
      <Logo />
    </Link>
  );
};

export const dropDown = (navLink: INavLink, locale: LangType, key?: number) => (
  <TabButton
    key={key}
    className={styles.tab}
    path={`/${locale}${LocalPaths.SERVICE}`}
    dropdown={navLink.ctaArray}
  >
    {navLink.title}
  </TabButton>
);
