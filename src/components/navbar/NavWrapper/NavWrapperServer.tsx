import { footerPageQuery } from "@/app/api/generateSanityQueries";
import { fetchPage } from "@/app/api/fetchPage";
import { IFooter, ITheme } from "@/data.d";
import { LangType } from "@/i18n/request";
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

  return (
    <NavWrapperClient
      locale={locale}
      footerData={{ ...footerData }}
      theme={theme}
      hideLogo={hideLogo}
    >
      {children}
    </NavWrapperClient>
  );
}
