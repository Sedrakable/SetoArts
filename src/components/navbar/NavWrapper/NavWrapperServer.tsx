import {
  coollapsibleFaqQuery,
  footerPageQuery,
} from "@/app/api/generateSanityQueries";
import { fetchPage } from "@/app/api/fetchPage";
import { IFooter, IFooterFAQLinks, ITheme } from "@/data.d";
import { LangType } from "@/i18n";
import NavWrapperClient from "./NavWrapperClient";

export interface NavWrapperProps {
  children: React.ReactNode;
  locale: LangType;
  theme: ITheme;
  hideLogo?: boolean;
}
export default async function NavWrapperServer({
  children,
  locale,
  theme,
  hideLogo,
}: NavWrapperProps) {
  const footerQuery = footerPageQuery(locale);
  const footerData: IFooter = await fetchPage(footerQuery);
  const footerFaqQuery = coollapsibleFaqQuery(locale);
  const footerFaqData: IFooterFAQLinks[] = await fetchPage(footerFaqQuery);

  return (
    <NavWrapperClient
      locale={locale}
      footerData={{ ...footerData, faqs: footerFaqData }}
      theme={theme}
      hideLogo={hideLogo}
    >
      {children}
    </NavWrapperClient>
  );
}
