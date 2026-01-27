import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
// import Script from "next/script";
import styles from "./layout.module.scss";
import "@/styles/Main.css";
import "@/styles/ScrollBar.scss";
import "@/styles/index.scss";
import { NextIntlClientProvider } from "next-intl";
import { LangType } from "@/i18n/request";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: LangType }>;
}>) {
  const { locale } = await params;
  return (
    locale && (
      <html lang={locale}>
        <NextIntlClientProvider locale={locale}>
          <head>
            <link rel="preload" href="/photos/BigStroke.webp" as="image" />
            <meta name="theme-color" content="#fec301" />

            <noscript>
              <img
                alt="facebook-pixel"
                height="1"
                width="1"
                style={{ display: "none" }}
                src="https://www.facebook.com/tr?id=764726835805460&ev=PageView&noscript=1"
              />
            </noscript>
          </head>
          <body className={inter.className}>
            <div id="root">
              <div className={styles.app}>{children}</div>
            </div>
          </body>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ID!} />
          <Analytics />
        </NextIntlClientProvider>
      </html>
    )
  );
}
