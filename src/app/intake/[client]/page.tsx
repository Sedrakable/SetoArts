import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIntakeClient } from "@/lib/intake/questions";
import { IntakeForm } from "@/components/intake/IntakeForm";

// Never index a client's private questionnaire, and don't leak the client name
// into a title that could surface anywhere.
export const metadata: Metadata = {
  title: "Branding questionnaire",
  robots: { index: false, follow: false, nocache: true },
};

export default async function IntakePage({
  params,
}: {
  params: Promise<{ client: string }>;
}) {
  const { client } = await params;
  const config = getIntakeClient(client);

  if (!config) notFound();

  return <IntakeForm client={client} config={config} />;
}
