"use client";
import { usePathname } from "@/navigation";
import { Navbar } from "@/components/navbar/Navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { chooseNavButtonData, navLinkData } from "@/data/navbarData";
import styles from "./layout.module.scss";
import { INavBar, IFooter, LocalPaths, ITheme } from "@/data.d";
import { LangType } from "@/i18n";
import { getTranslations } from "@/helpers/langUtils";

export default function NavWrapperClient({
  children,
  footerData,
  locale,
  theme,
}: {
  children: React.ReactNode;
  footerData: IFooter;
  locale: LangType;
  theme: ITheme;
}) {
  const trans = getTranslations(locale);
  const pathname = usePathname();
  const lastSegment = (pathname.match(/\/[^/]*$/)?.[0] as LocalPaths) || "/";
  const navbarData: INavBar = {
    navButton: chooseNavButtonData(locale, trans),
    links: navLinkData(trans),
  };

  return (
    <>
      <Navbar {...navbarData} theme={theme} />
      <div className={styles.page}>{children}</div>
      <Footer
        {...navbarData}
        legals={footerData?.legals}
        trademark={footerData?.trademark}
        socials={{ links: footerData?.socials?.links }}
      />
    </>
  );
}
