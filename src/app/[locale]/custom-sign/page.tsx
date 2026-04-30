import { redirect } from "next/navigation";
import { LangType } from "@/i18n/request";

export default async function CustomSignIndexPage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/custom-sign/goal`);
}
