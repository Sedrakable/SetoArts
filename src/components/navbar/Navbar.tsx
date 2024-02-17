import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import TabButton from "./TabButton";
import { useWindowResize } from "../../helpers/useWindowResize";
import { IconButton } from "../reuse/IconButton";
import { Form } from "../pages/contact page/Form";
import { FollowUs } from "../footer/FollowUs";
import cn from "classnames";
import { Link } from "../reuse/Link";
import { onClickNavigate } from "../../helpers/useNavigation";
import { FlexDiv } from "../reuse/FlexDiv";
import { ReactComponent as Logo } from "../../assets/illu/LogoSmall.svg";
import { Button } from "../reuse/Button";
import { ICta, INavBar, INavLink } from "../../data";

export const Navbar: React.FC<INavBar> = ({ links }) => {
  const { isMobile, isMobileOrTablet } = useWindowResize();
  const [sidebar, setSidebar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  console.log(links);
  const isCta = (link: INavLink | ICta): link is ICta => {
    return (link as ICta).link !== undefined;
  };

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
      onClick={(e) => onClickNavigate(e, "/")}
      href={"/"}
      className={styles.logo}
    >
      <Logo />
    </Link>
  );

  const tab = (cta: ICta) => {
    return (
      <>
        <TabButton className={styles.tab} path={cta.link!}>
          {cta.text}
        </TabButton>
        {/* {isMobile && <Icon icon="arrow" size="extra-small" color="white" />}

        {isMobile && <Line color="black" />} */}
      </>
    );
  };

  const dropDown = (navLink: INavLink) => {
    return (
      <TabButton className={styles.tab} path="" dropdown={navLink.ctaArray}>
        {navLink.title}
      </TabButton>
    );
  };

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
            className={styles.right}
          >
            {!isMobileOrTablet && (
              <FlexDiv gapArray={[5, 4, 5, 6]} className={styles.right}>
                {links.map((link: INavLink | ICta) => {
                  return isCta(link) ? tab(link) : dropDown(link);
                })}
              </FlexDiv>
            )}
            <Button variant="fancy" small={isMobile}>
              Work
            </Button>
            <IconButton
              onClick={() => setSidebar(true)}
              iconProps={{ icon: "burger", size: "regular" }}
            />
          </FlexDiv>
        </FlexDiv>
      </div>
      {isMobile && (
        <div className={cn(styles.sidebar, { [styles.isOpen]: sidebar })}>
          <div className={styles.tab}>
            <IconButton
              onClick={() => setSidebar(false)}
              iconProps={{ icon: "close", size: "small" }}
            />
          </div>

          <div className={styles.tabs}>
            <>
              {links.map((link: INavLink | ICta) => {
                return isCta(link) ? tab(link) : dropDown(link);
              })}
              <div className={styles.emailList}>
                <Form />
              </div>
              <div className={styles.followUs}>
                <FollowUs />
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};
