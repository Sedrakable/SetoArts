import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import styles from "./layout.module.scss";
import "@/styles/Main.css";
import "@/styles/ScrollBar.scss";
import "@/styles/index.scss";
import { NextIntlClientProvider } from "next-intl";
import { IFooter, INavBar, LocalPaths } from "@/data.d";
import { useFetchPage } from "../api/useFetchPage";
import { LangType } from "@/i18n";
import { getHomePageData } from "./home/page";
import { setMetadata } from "@/components/SEO";
import dynamic from "next/dynamic";
import { navbarPageQuery, footerPageQuery } from "../api/generateSanityQueries";

const inter = Inter({ subsets: ["latin"] });

const Footer = dynamic(
  () => import("@/components/footer/Footer").then((module) => module.Footer),
  {
    ssr: false,
  }
);
const Navbar = dynamic(
  () =>
    import("@/components/navbar/Navbar/Navbar").then((module) => module.Navbar),
  {
    ssr: false,
  }
);

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const homePageData = await getHomePageData(locale);
  const { metaTitle, metaDesc, metaKeywords } = homePageData.meta;
  const path = LocalPaths.HOME;
  const crawl = true;

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    metaKeywords,
    path,
    crawl,
  });
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: LangType };
}>) {
  const navType = "navbar";
  const footerType = "footer";
  const navbarQuery = navbarPageQuery(locale);
  const footerQuery = footerPageQuery(locale);
  const navbarData: INavBar = await useFetchPage(navbarQuery, navType);
  const footerData: IFooter = await useFetchPage(footerQuery, footerType);
  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale}>
        <head>
          <meta name="theme-color" content="#fec301" />
        </head>
        <body className={inter.className}>
          <div id="root">
            <div className={styles.app}>
              <Navbar {...navbarData} />
              <div className={styles.page}>{children}</div>
              <Footer
                legals={footerData?.legals}
                trademark={footerData?.trademark}
                links={navbarData?.links}
                socials={{ links: footerData?.socials?.links }}
              />
            </div>
          </div>
        </body>
        <GoogleAnalytics gaId="GTM-T7H3RP3Q" />
        {/* FIX: Make sure to test google Analistics */}
      </NextIntlClientProvider>
    </html>
  );
}
