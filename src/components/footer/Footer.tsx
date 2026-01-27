"use client";
import React from "react";
import styles from "./Footer.module.scss";
import { Paragraph } from "../reuse/Text/Paragraph/Paragraph";

import FlexDiv from "../reuse/FlexDiv";
import LogoHori from "@/assets/vector/LogoHorizontal.svg";
import { useWindowResize } from "../../helpers/useWindowResize";
import {
  ICta,
  IFooter,
  IFooterFAQLinks,
  INavBar,
  LocalPaths,
} from "../../data.d";
import { isDropDown, NavButton } from "../navbar/Navbar/Navbar";
import { Socials } from "../reuse/Socials/Socials";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import Link from "next/link";

const Line: React.FC = () => {
  return <div className={styles.line} />;
};

const linkComp = (
  locale: LangType,
  cta: ICta,
  key: number,
  linkPath?: string,
) => {
  return (
    <li key={key}>
      <Link
        href={`/${locale}${linkPath ? linkPath : ""}${cta.path}`}
        aria-label={cta.path}
      >
        <Paragraph level="regular" capitalise clickable>
          {cta?.text}
        </Paragraph>
      </Link>
    </li>
  );
};
const Nav: React.FC<INavBar> = ({ links, navButton }) => {
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
        if (!isDropDown(link)) {
          return linkComp(locale, link as ICta, key);
        } else {
          const subLinks = link.ctaArray?.map((cta, key) => {
            return linkComp(locale, cta, key, link.path);
          });
          return subLinks;
        }
      })}
      <li key="button">
        <NavButton {...navButton} />
      </li>
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
      <Paragraph level="small" color="light-grey" textAlign="center">
        {trademark}
      </Paragraph>
    </FlexDiv>
  );
};

const LegalAndFaq: React.FC<{
  legals: { title: string; path: string }[];
  faqs?: IFooterFAQLinks[];
}> = ({ legals }) => {
  const locale = useLocale() as LangType;
  return (
    <FlexDiv className={styles.legal} gapArray={[5]} wrap>
      {legals?.map((cta, key) => {
        return (
          <Link
            href={`/${locale}${LocalPaths.LEGAL}${cta?.path!}`}
            key={key}
            aria-label={cta?.title}
          >
            <Paragraph level="small" color="light-grey" clickable>
              {cta?.title}
            </Paragraph>
          </Link>
        );
      })}
      {/* {faqs?.map((faq, key) => {
        return (
          <Link
            href={`/${locale}${LocalPaths.CONTACT}${faq.id}`}
            key={key}
            aria-label={faq?.title}
          >
            <Paragraph level="small" color="light-grey" clickable>
              {faq?.title}
            </Paragraph>
          </Link>
        );
      })} */}
    </FlexDiv>
  );
};

const DesktopFooter: React.FC<FooterProps> = ({
  links,
  legals,
  trademark,
  socials,
  navButton,
  faqs,
}) => {
  return (
    <FlexDiv
      className={styles.container}
      flex={{ y: "center" }}
      padding={{ vertical: [7] }}
    >
      <Nav links={links} navButton={navButton} />
      <Line />
      <Logo trademark={trademark} />
      <Line />
      <FlexDiv
        flex={{ direction: "column", y: "center", x: "flex-start" }}
        customStyle={{ flex: 1, minHeight: "100%" }}
        padding={{ vertical: [4] }}
        gapArray={[5]}
      >
        <LegalAndFaq legals={legals} faqs={faqs} />
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
  navButton,
  faqs,
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
        <Nav links={links} navButton={navButton} />
        <FlexDiv flex={{ x: "center" }} gapArray={[4]} wrap width100>
          <LegalAndFaq legals={legals} faqs={faqs} />
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
  navButton,
  faqs,
}) => {
  return (
    <FlexDiv
      className={styles.container}
      flex={{ direction: "column" }}
      padding={{ top: [6], bottom: [7] }}
      gapArray={[6]}
    >
      <Socials {...socials} />
      <Nav links={links} navButton={navButton} />
      <Logo trademark={trademark} />
      <LegalAndFaq legals={legals} faqs={faqs} />
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
