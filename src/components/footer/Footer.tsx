"use client";
import React from "react";
import styles from "./Footer.module.scss";
import { Paragraph } from "../reuse/Paragraph/Paragraph";

import FlexDiv from "../reuse/FlexDiv";
import LogoHori from "@/assets/vector/LogoHorizontal.svg";
import { useWindowResize } from "../../helpers/useWindowResize";
import { IFooter, INavBar, LocalPaths } from "../../data.d";
import { isCta } from "../navbar/Navbar/Navbar";
import { Socials } from "./Socials";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import Link from "next/link";

const Line: React.FC = () => {
  return <div className={styles.line} />;
};
const Nav: React.FC<INavBar> = ({ links }) => {
  const locale = useLocale() as LangType;

  return (
    <FlexDiv
      className={styles.links}
      gapArray={[5]}
      flex={{ x: "center" }}
      wrap
      as="ul"
    >
      {links?.map((link, key) => {
        if (isCta(link)) {
          return (
            <li key={key}>
              <Link href={`/${locale}${link?.link}`} aria-label={link?.text}>
                <Paragraph level="regular" capitalise clickable>
                  {link?.text}
                </Paragraph>
              </Link>
            </li>
          );
        } else {
          const subLinks = link.ctaArray?.map((link, key) => {
            return (
              <li key={key}>
                <Link
                  href={`/${locale}${LocalPaths.SERVICE}${link?.link}`}
                  aria-label={link?.link}
                >
                  <Paragraph level="regular" capitalise clickable>
                    {link?.text}
                  </Paragraph>
                </Link>
              </li>
            );
          });
          return subLinks;
        }
      })}
    </FlexDiv>
  );
};

const Logo: React.FC<{ trademark: string }> = ({ trademark }) => {
  return (
    <FlexDiv
      className={styles.logo}
      flex={{ direction: "column" }}
      gapArray={[5]}
      padding={{ bottom: [0, 0, 2] }}
    >
      <LogoHori />
      <Paragraph level="small" color="grey" textAlign="center">
        {trademark}
      </Paragraph>
    </FlexDiv>
  );
};

const Legal: React.FC<{ legals: { title: string; path: string }[] }> = ({
  legals,
}) => {
  const locale = useLocale() as LangType;
  return (
    <FlexDiv
      className={styles.legal}
      gapArray={[5]}
      wrap
      flex={{ x: "flex-start" }}
    >
      {legals?.map((cta, key) => {
        return (
          <Link
            href={`/${locale}${LocalPaths.LEGAL}${cta?.path!}`}
            key={key}
            aria-label={cta?.title}
          >
            <Paragraph level="small" color="grey" clickable>
              {cta?.title}
            </Paragraph>
          </Link>
        );
      })}
    </FlexDiv>
  );
};

const DesktopFooter: React.FC<FooterProps> = ({
  links,
  legals,
  trademark,
  socials,
}) => {
  return (
    <FlexDiv
      className={styles.container}
      flex={{ y: "stretch" }}
      padding={{ vertical: [7] }}
    >
      <Nav links={links} />
      <Line />
      <Logo trademark={trademark} />
      <Line />
      <FlexDiv
        flex={{ direction: "column", y: "center", x: "flex-start" }}
        customStyle={{ flex: 1, minHeight: "100%" }}
        padding={{ vertical: [4] }}
        gapArray={[5]}
      >
        <Legal legals={legals} />
        <Socials {...socials} />
      </FlexDiv>
    </FlexDiv>
  );
};

const TabletFooter: React.FC<FooterProps> = ({
  links,
  legals,
  trademark,
  socials,
}) => {
  return (
    <FlexDiv
      className={styles.container}
      flex={{ y: "stretch" }}
      padding={{ top: [7], bottom: [7] }}
    >
      <Logo trademark={trademark} />
      <Line />
      <FlexDiv flex={{ direction: "column" }} gapArray={[4]}>
        <Nav links={links} />
        <FlexDiv flex={{ x: "center" }} gapArray={[4]} wrap width100>
          <Legal legals={legals} />
          <Socials {...socials} />
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  );
};
const MobileFooter: React.FC<FooterProps> = ({
  links,
  legals,
  trademark,
  socials,
}) => {
  return (
    <FlexDiv
      className={styles.container}
      flex={{ direction: "column" }}
      padding={{ top: [6], bottom: [7] }}
      gapArray={[6]}
    >
      <Socials {...socials} />
      <Nav links={links} />
      <Logo trademark={trademark} />
      <Legal legals={legals} />
    </FlexDiv>
  );
};

type FooterProps = IFooter & INavBar;
export const Footer: React.FC<FooterProps> = (props) => {
  const { isMobile, isTablet } = useWindowResize();

  return (
    <footer className={styles.footer}>
      {isMobile ? (
        <MobileFooter {...props} />
      ) : isTablet ? (
        <TabletFooter {...props} />
      ) : (
        <DesktopFooter {...props} />
      )}
    </footer>
  );
};
