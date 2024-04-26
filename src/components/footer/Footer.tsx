import React from "react";
import styles from "./Footer.module.scss";
import { Paragraph } from "../reuse/Paragraph";

import { Link } from "../reuse/Link";
import FlexDiv from "../reuse/FlexDiv";
import { ReactComponent as LogoHori } from "../../assets/illu/LogoHorizontal.svg";
import { useWindowResize } from "../../helpers/useWindowResize";
import { IFooter, INavBar, LocalPaths } from "../../data.d";
import { isCta } from "../navbar/Navbar";
import { Socials } from "./Socials";
import { useAtom } from "jotai";
import { langData } from "../navbar/LangSwitcher/LangSwitcher";

const Line: React.FC = () => {
  return <div className={styles.line} />;
};
const Nav: React.FC<INavBar> = ({ links }) => {
  const [lang] = useAtom(langData);

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
            <Link path={`/${lang}${link?.link}`} key={key}>
              <Paragraph level="regular" weight="regular" capitalise clickable>
                {link?.text}
              </Paragraph>
            </Link>
          );
        } else {
          const subLinks = link.ctaArray?.map((link, key) => {
            return (
              <Link
                path={`/${lang}${LocalPaths.SERVICE}${link?.link}`}
                key={key}
              >
                <Paragraph
                  level="regular"
                  weight="regular"
                  capitalise
                  clickable
                >
                  {link?.text}
                </Paragraph>
              </Link>
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
      <Paragraph level="small" weight="weak" color="grey" textAlign="center">
        {trademark}
      </Paragraph>
    </FlexDiv>
  );
};

const Legal: React.FC<{ legals: { title: string; path: string }[] }> = ({
  legals,
}) => {
  const [lang] = useAtom(langData);
  return (
    <FlexDiv
      className={styles.legal}
      gapArray={[5]}
      wrap
      flex={{ x: "flex-start" }}
    >
      {legals?.map((cta, key) => {
        return (
          <Link path={`/${lang}${cta?.path!}`} key={key}>
            <Paragraph level="small" weight="weak" color="grey" clickable>
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
        flex={{ direction: "column", y: "space-between", x: "flex-start" }}
        customStyle={{ flex: 1, minHeight: "100%" }}
        padding={{ vertical: [4] }}
        gapArray={[4]}
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
