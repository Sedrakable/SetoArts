import { LangType } from "@/i18n/request";
import WorkPage from "../page";

export default async function ModalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: LangType }>;
}) {
  const { locale } = await params;

  return (
    <>
      <WorkPage params={Promise.resolve({ locale })} />
      {children}
    </>
  );
}
