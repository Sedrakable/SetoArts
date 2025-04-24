import { LangType } from "@/i18n/request";
import AboutPage from "../page";

export default function ModalLayout({
  children,

  locale,
}: {
  children: React.ReactNode;
  locale: LangType;
}) {
  return (
    <div>
      <AboutPage params={Promise.resolve({ locale })} />
      {children}
    </div>
  );
}
