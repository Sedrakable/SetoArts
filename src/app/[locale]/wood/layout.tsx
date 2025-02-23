/* eslint-disable @next/next/no-img-element */
import styles from "./layout.module.scss";
import { IFooter, INavBar } from "@/data.d";
import { LangType } from "@/i18n";
import { Navbar } from "@/components/navbar/Navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import {
  navbarPageQuery,
  footerPageQuery,
} from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: LangType }>;
}>) {
  const { locale } = await params;
  const navType = "navbar";
  const footerType = "footer";
  const navbarQuery = navbarPageQuery(locale, "wood");
  const footerQuery = footerPageQuery(locale);
  const navbarData: INavBar = await useFetchPage(navbarQuery, navType);
  const footerData: IFooter = await useFetchPage(footerQuery, footerType);
  return (
    <>
      <Navbar {...navbarData} />
      <div className={styles.page}>{children}</div>
      <Footer
        legals={footerData?.legals}
        trademark={footerData?.trademark}
        links={navbarData?.links}
        socials={{ links: footerData?.socials?.links }}
      />
    </>
  );
}
