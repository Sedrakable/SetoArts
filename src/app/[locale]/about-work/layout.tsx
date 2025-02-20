import { LangType } from "@/i18n";
import AboutPage from "./page";
import FlexDiv from "@/components/reuse/FlexDiv";

export default function AboutWorkLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: LangType;
}) {
  return (
    <FlexDiv flex={{ direction: "column" }} width100 height100>
      <AboutPage params={{ locale }} />
      {children}
    </FlexDiv>
  );
}
