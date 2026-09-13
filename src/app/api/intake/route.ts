import { NextResponse } from "next/server";
import { getTransporter } from "@/helpers/getTransporter";
import { getIntakeClient } from "@/lib/intake/questions";
import { getMissingRequiredIds, IntakeAnswers } from "@/lib/intake/answers";
import {
  formatIntakeHtml,
  formatIntakeText,
  getIntakeSubject,
} from "./formatIntake";

interface IntakePayload {
  client: string;
  answers: IntakeAnswers;
  // Honeypot — real submissions leave this empty.
  website?: string;
}

export async function POST(request: Request) {
  try {
    const { client, answers, website }: IntakePayload = await request.json();

    // Silently accept bots so they don't learn the field tripped them.
    if (website?.trim()) return NextResponse.json({ ok: true });

    const config = getIntakeClient(client);
    if (!config) {
      return NextResponse.json({ error: "Unknown form." }, { status: 404 });
    }

    // Never trust the client — re-check every required question server-side.
    const missing = getMissingRequiredIds(config, answers || {});
    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Some required answers are missing.", fields: missing },
        { status: 400 },
      );
    }

    const to = process.env.INTAKE_TO_EMAIL || process.env.EMAIL_BUSINESS;
    if (!to || !process.env.EMAIL_BUSINESS) {
      throw new Error("Intake email recipient is not configured.");
    }

    await getTransporter().sendMail({
      from: `"Seto X Arts" <${process.env.EMAIL_BUSINESS}>`,
      to,
      subject: getIntakeSubject(config),
      text: formatIntakeText(config, answers),
      html: formatIntakeHtml(config, answers),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Intake form server error:", error);
    return NextResponse.json(
      { error: "Failed to submit the questionnaire." },
      { status: 500 },
    );
  }
}
