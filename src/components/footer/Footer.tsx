import React from "react";
import styles from "./Footer.module.scss";
import { Paragraph } from "../reuse/Paragraph";

import { Link } from "../reuse/Link";
import FlexDiv from "../reuse/FlexDiv";
import { ReactComponent as LogoHori } from "../../assets/illu/LogoHorizontal.svg";
import { useWindowResize } from "../../helpers/useWindowResize";
import { ICta, IFooter, INavBar } from "../../data";
import { isCta } from "../navbar/Navbar";

const Line: React.FC = () => {
  return <div className={styles.line} />;
};
const Nav: React.FC<INavBar> = ({ links }) => {
  return (
    <FlexDiv
      className={styles.links}
      gapArray={[5]}
      flex={{ x: "center" }}
      wrap
    >
      {links.map((link, key) => {
        if (isCta(link)) {
          return (
            <Link href={link?.link!} key={key}>
              <Paragraph level="regular" weight="regular" capitalise clickable>
                {link?.text}
              </Paragraph>
            </Link>
          );
        } else {
          const subLinks = link.ctaArray.map((link, key) => {
            return (
              <Link href={link?.link!} key={key}>
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

const Legal: React.FC<{ privacyTerms: ICta[] }> = ({ privacyTerms }) => {
  return (
    <FlexDiv className={styles.legal} gapArray={[5]} flex={{ x: "flex-start" }}>
      {privacyTerms.map((cta, key) => {
        return (
          <Link href={cta?.link!} key={key}>
            <Paragraph level="small" weight="weak" color="grey" clickable>
              {cta?.text}
            </Paragraph>
          </Link>
        );
      })}
    </FlexDiv>
  );
};

const DesktopFooter: React.FC<FooterProps> = ({
  links,
  privacyTerms,
  trademark,
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
      <Legal privacyTerms={privacyTerms} />
    </FlexDiv>
  );
};

const TabletFooter: React.FC<FooterProps> = ({
  links,
  privacyTerms,
  trademark,
}) => {
  return (
    <FlexDiv
      className={styles.container}
      flex={{ y: "stretch" }}
      padding={{ top: [7], bottom: [7] }}
    >
      <Logo trademark={trademark} />
      <Line />
      <FlexDiv flex={{ direction: "column" }}>
        <Nav links={links} />
        <Legal privacyTerms={privacyTerms} />
      </FlexDiv>
    </FlexDiv>
  );
};
const MobileFooter: React.FC<FooterProps> = ({
  links,
  privacyTerms,
  trademark,
}) => {
  return (
    <FlexDiv
      className={styles.container}
      flex={{ direction: "column" }}
      padding={{ top: [6], bottom: [7] }}
      gapArray={[6]}
    >
      <Nav links={links} />
      <Logo trademark={trademark} />
      <Legal privacyTerms={privacyTerms} />
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
