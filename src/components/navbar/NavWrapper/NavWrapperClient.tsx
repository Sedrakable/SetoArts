"use client";
import { Navbar } from "@/components/navbar/Navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { chooseNavButtonData, navLinkData } from "@/data/navbarData";
import styles from "./NavWrapperClient.module.scss";
import { INavBar, IFooter } from "@/data.d";
import { getTranslations } from "@/helpers/langUtils";
import { NavWrapperProps } from "./NavWrapperServer";
import { Suspense } from "react";
import { Spinner } from "@/components/reuse/Spinner/Spinner";

export default function NavWrapperClient({
  children,
  footerData,
  locale,
  theme,
  hideLogo,
}: NavWrapperProps & { footerData: IFooter }) {
  const trans = getTranslations(locale);
  const navbarData: INavBar = {
    navButton: chooseNavButtonData(locale, trans),
    links: navLinkData(trans),
  };
  return (
    <Suspense fallback={<Spinner />}>
      <Navbar
        {...navbarData}
        theme={theme}
        hideLogo={hideLogo}
        socials={{ links: footerData?.socials?.links }}
      />
      <div className={styles.page}>{children}</div>
      <Footer
        {...navbarData}
        legals={footerData?.legals}
        faqs={footerData?.faqs}
        trademark={footerData?.trademark}
        socials={{ links: footerData?.socials?.links }}
      />
    </Suspense>
  );
}
