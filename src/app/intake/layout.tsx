import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import styles from "./layout.module.scss";
import "@/styles/Main.css";
import "@/styles/ScrollBar.scss";
import "@/styles/index.scss";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // Keep the progress bar clear of a notch on phones.
  viewportFit: "cover" as const,
};

// Belt-and-suspenders: every route in this segment is private and must never be
// indexed. The page also sets this, but declaring it here covers the whole tree.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

// Intake pages live outside the localized routing tree, so they get their own
// document shell here rather than the marketing layout. No analytics, no Meta
// Pixel — these are private, unlisted client forms.
export default function IntakeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* Shared components (Button, LogoLink) use next-intl navigation hooks,
          so the tree needs a provider even though these pages are English-only. */}
      <NextIntlClientProvider locale="en">
        <body className={inter.className}>
          <div id="root">
            <div className={styles.app}>{children}</div>
          </div>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
