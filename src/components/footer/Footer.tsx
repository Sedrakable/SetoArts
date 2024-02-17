import React from "react";
import styles from "./Footer.module.scss";
import { Form } from "../pages/contact page/Form";
import { Paragraph } from "../reuse/Paragraph";

import { Link } from "../reuse/Link";
import { FollowUs } from "./FollowUs";
import { FlexDiv } from "../reuse/FlexDiv";
import { ReactComponent as LogoHori } from "../../assets/illu/LogoHorizontal.svg";
import { useWindowResize } from "../../helpers/useWindowResize";

const Line: React.FC = () => {
  return <div className={styles.line} />;
};
const Nav: React.FC = () => {
  return (
    <FlexDiv className={styles.links} gapArray={[5]} flex={{ x: "flex-end" }}>
      {/* {tabTexts.map((tabText, key) => {
        return (
          <Link href={`/${tabText}`} key={key}>
            <Paragraph level="regular" weight="regular" capitalise clickable>
              {tabText}
            </Paragraph>
          </Link>
        );
      })} */}
    </FlexDiv>
  );
};

const Logo: React.FC = () => {
  return (
    <FlexDiv
      className={styles.logo}
      flex={{ direction: "column" }}
      gapArray={[5]}
      padding={{ bottom: [2] }}
    >
      <LogoHori />
      <Paragraph level="small" weight="weak" color="grey" textAlign="center">
        2024 Seto x Arts. All rights reserved.
      </Paragraph>
    </FlexDiv>
  );
};

const legalTexts = ["Terms & Conditions", "Privacy Policy"];
const Legal: React.FC = () => {
  return (
    <FlexDiv className={styles.legal} gapArray={[5]} flex={{ x: "flex-start" }}>
      {legalTexts.map((text, key) => {
        return (
          <Link href={`/`} key={key}>
            <Paragraph level="small" weight="weak" color="grey" clickable>
              {text}
            </Paragraph>
          </Link>
        );
      })}
    </FlexDiv>
  );
};

const DesktopFooter: React.FC = () => {
  return (
    <FlexDiv
      className={styles.container}
      flex={{ y: "stretch" }}
      padding={{ top: [7], bottom: [8] }}
    >
      <Nav />
      <Line />
      <Logo />
      <Line />
      <Legal />
    </FlexDiv>
  );
};

const TabletFooter: React.FC = () => {
  return (
    <FlexDiv
      className={styles.container}
      flex={{ y: "stretch" }}
      padding={{ top: [7], bottom: [7] }}
      customStyle={{ flexWrap: "wrap" }}
    >
      <Logo />
      <Line />
      <FlexDiv flex={{ direction: "column" }}>
        <Nav />
        <Legal />
      </FlexDiv>
    </FlexDiv>
  );
};
const MobileFooter: React.FC = () => {
  return (
    <FlexDiv
      className={styles.container}
      flex={{ direction: "column" }}
      padding={{ top: [6], bottom: [7] }}
      gapArray={[6]}
    >
      <Nav />
      <Logo />
      <Legal />
    </FlexDiv>
  );
};

const Footer: React.FC = () => {
  const { isMobile, isTablet } = useWindowResize();

  return (
    <footer className={styles.footer}>
      {isMobile ? (
        <MobileFooter />
      ) : isTablet ? (
        <TabletFooter />
      ) : (
        <DesktopFooter />
      )}
    </footer>
  );
};

export default Footer;
