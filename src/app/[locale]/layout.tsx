/* eslint-disable @next/next/no-img-element */
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import styles from "./layout.module.scss";
import "@/styles/Main.css";
import "@/styles/ScrollBar.scss";
import "@/styles/index.scss";
import { NextIntlClientProvider } from "next-intl";
import { LangType } from "@/i18n";
import bigStroke from "/public/photos/BigStroke.webp";
import titleStroke from "/public/photos/TitleStroke.webp";
import fabricTexture from "/public/photos/Textures/FabricTexture.webp";
import gridTexture from "/public/photos/Textures/GridTexture.webp";

const inter = Inter({ subsets: ["latin"] });

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: LangType }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale}>
        <head>
          <link rel="preload" href={bigStroke.src} as="image" />
          <link rel="preload" href={titleStroke.src} as="image" />
          <link rel="preload" href={fabricTexture.src} as="image" />
          <link rel="preload" href={gridTexture.src} as="image" />
          <meta name="theme-color" content="#fec301" />
          <meta
            name="facebook-domain-verification"
            content="z6nna7jlyl6ehzowkxc3qp1oha3wb6"
          />
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '764726835805460');
            fbq('track', 'PageView');
            `,
            }}
          />
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
      </NextIntlClientProvider>
    </html>
  );
}
