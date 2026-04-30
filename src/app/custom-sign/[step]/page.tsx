import { redirect } from "next/navigation";

export default async function CustomSignDefaultLocaleStep({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  redirect(`/en/custom-sign/${step}`);
}
