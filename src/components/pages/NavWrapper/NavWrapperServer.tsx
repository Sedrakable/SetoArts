import { footerPageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { IFooter, ITheme } from "@/data.d";
import { LangType } from "@/i18n";
import NavWrapperClient from "./NavWrapperClient";

export default async function NavWrapperServer({
  children,
  locale,
  theme,
}: {
  children: React.ReactNode;
  locale: LangType;
  theme: ITheme;
}) {
  const footerQuery = footerPageQuery(locale);
  const footerData: IFooter = await useFetchPage(footerQuery, "footer");

  return (
    <NavWrapperClient locale={locale} footerData={footerData} theme={theme}>
      {children}
    </NavWrapperClient>
  );
}
