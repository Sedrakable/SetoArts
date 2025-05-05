"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import TabButton from "../TabButton/TabButton";
import { useWindowResize } from "../../../helpers/useWindowResize";
import { IconButton } from "../../reuse/IconButton/IconButton";
import cn from "classnames";
import FlexDiv from "../../reuse/FlexDiv";
import Logo from "@/assets/vector/LogoSmall.svg";
import { Button } from "../../reuse/Button/Button";
import { ICta, INavBar, INavLink, ITheme } from "../../../data.d";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import { useAtom } from "jotai";
import { getTranslations } from "../../../helpers/langUtils";
import { sidebarData } from "../Sidebar/Sidebar";
import Link from "next/link";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import dynamic from "next/dynamic";
import { Socials } from "@/components/reuse/Socials/Socials";

const Sidebar = dynamic(
  () => import("../Sidebar/Sidebar").then((module) => module.Sidebar),
  {
    ssr: false,
  }
);

export const isDropDown = (link: INavLink | ICta): link is INavLink => {
  return (link as INavLink).ctaArray !== undefined;
};

export const Navbar: React.FC<INavBar> = ({
  links,
  navButton,
  theme = "light",
  hideLogo = false,
  socials,
}) => {
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
        className={cn(styles.navbarWrapper, styles[theme], {
          [styles.scrolled]: scrolled,
          // [styles.hideLogo]: hideLogo,
        })}
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
            height100
          >
            {!isMobile && (
              <FlexDiv gapArray={[5, 4, 6, 7]} as="ul" height100>
                {links?.map((link: INavLink | ICta, key) => {
                  return (
                    !isMobileOrTablet &&
                    (!isDropDown(link) ? (
                      <li key={key}>
                        <TabButton
                          className={styles.tab}
                          path={`/${locale}${link.path!}`}
                          theme={theme}
                        >
                          {link.text}
                        </TabButton>
                      </li>
                    ) : (
                      <li key={key}>{dropDown(link, locale, theme, key)}</li>
                    ))
                  );
                })}
                <li>
                  <NavButton {...navButton} />
                </li>
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

            {!isMobileOrTablet && socials && <Socials {...socials} />}
          </FlexDiv>
        </FlexDiv>
      </nav>
      {isMobileOrTablet && <Sidebar links={links} socials={socials!} />}
    </>
  );
};

// Helper components
export const LogoLink: React.FC<{ locale: LangType }> = ({ locale }) => {
  const translations = getTranslations(locale);
  const [, setSidebar] = useAtom(sidebarData);
  return (
    <Link
      href={`/${locale}`}
      className={styles.logo}
      aria-label={translations.nav.home}
      onClick={() => setSidebar(false)}
    >
      <Logo />
    </Link>
  );
};

export const dropDown = (
  navLink: INavLink,
  locale: LangType,
  theme: ITheme = "light",
  key?: number
) => (
  <TabButton
    key={key}
    className={styles.tab}
    path={`/${locale}${navLink.path}`}
    dropdown={navLink.ctaArray}
    theme={theme}
  >
    {navLink.title}
  </TabButton>
);

// Helper components
export const NavButton: React.FC<ICta> = ({ text, path, scrollTarget }) => {
  return (
    <Button variant="primary" path={path} scrollTarget={scrollTarget}>
      {text}
    </Button>
  );
};
