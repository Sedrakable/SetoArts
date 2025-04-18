import FlexDiv from "@/components/reuse/FlexDiv";

export default function AboutWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FlexDiv flex={{ direction: "column" }} width100 height100>
      {children}
    </FlexDiv>
  );
}
