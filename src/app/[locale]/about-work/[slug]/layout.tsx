import WorkModal from "./page";

export default function ModalLayout({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) {
  return (
    <div>
      <WorkModal params={{ slug }} />
      {children}
    </div>
  );
}
