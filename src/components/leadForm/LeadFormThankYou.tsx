"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LeadForm.module.scss";
import { LangType } from "@/i18n/request";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { Button } from "@/components/reuse/Button/Button";
import { getTranslations } from "@/helpers/langUtils";
import { LogoLink } from "../navbar/Navbar/Navbar";

interface LeadFormThankYouProps {
  locale: LangType;
  variant: "book" | "booked" | "complete";
}

export const LeadFormThankYou = ({
  locale,
  variant,
}: LeadFormThankYouProps) => {
  const router = useRouter();
  const translations = getTranslations(locale).leadForm;
  const [callMeInstead, setCallMeInstead] = useState(false);
  const [calendlyEmbedUrl, setCalendlyEmbedUrl] = useState("");
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/seto-x-arts/30min";

  useEffect(() => {
    if (variant !== "book") return;

    const url = new URL(calendlyUrl);
    url.searchParams.set("embed_type", "Inline");
    url.searchParams.set("embed_domain", window.location.host);
    url.searchParams.set("hide_gdpr_banner", "1");
    setCalendlyEmbedUrl(url.toString());
  }, [calendlyUrl, variant]);

  useEffect(() => {
    if (variant !== "book") return;

    const handleCalendlyMessage = (event: MessageEvent) => {
      if (!event.origin.includes("calendly.com")) return;

      const calendlyEvent =
        typeof event.data === "string"
          ? safeParseCalendlyEvent(event.data)
          : event.data?.event;

      if (calendlyEvent === "calendly.event_scheduled") {
        router.push(`/${locale}/custom-sign/call-booked`);
      }
    };

    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, [locale, router, variant]);

  if (variant === "booked") {
    return (
      <LeadShell locale={locale}>
        <Heading as="h1" color="black" font="Outfit" level="2" weight={600}>
          {translations.thankYou.bookedTitle}
        </Heading>
        <Paragraph className={styles.copy} color="black" level="regular">
          {translations.thankYou.bookedCopy}
        </Paragraph>
        <Paragraph className={styles.note} color="dark-grey" level="regular">
          {translations.thankYou.bookedNote}
        </Paragraph>
        <Button
          onClick={() => router.push(`/${locale}`)}
          type="button"
          variant="black"
        >
          {translations.actions.returnHome}
        </Button>
      </LeadShell>
    );
  }

  if (variant === "complete") {
    return (
      <LeadShell locale={locale}>
        <Heading as="h1" color="black" font="Outfit" level="2" weight={600}>
          {translations.thankYou.completeTitle}
        </Heading>
        <Paragraph className={styles.copy} color="black" level="regular">
          {translations.thankYou.completeCopy}
        </Paragraph>
        <Button
          onClick={() => router.push(`/${locale}`)}
          type="button"
          variant="black"
        >
          {translations.actions.returnHome}
        </Button>
      </LeadShell>
    );
  }

  return (
    <LeadShell locale={locale}>
      <Heading as="h1" color="black" font="Outfit" level="2" weight={600}>
        {translations.thankYou.receivedTitle}
      </Heading>
      <Paragraph className={styles.copy} color="black" level="regular">
        {translations.thankYou.receivedCopy}
      </Paragraph>
      <Paragraph className={styles.copy} color="black" level="regular">
        {translations.thankYou.nextStepCopy}
      </Paragraph>
      {callMeInstead ? (
        <FlexDiv className={styles.message} padding={{ all: [4] }} width100>
          <Paragraph color="black" level="regular" weight={600}>
            {translations.thankYou.callMeMessage}
          </Paragraph>
        </FlexDiv>
      ) : (
        <>
          <iframe
            className={styles.calendly}
            src={calendlyEmbedUrl || calendlyUrl}
            title={translations.thankYou.bookCallTitle}
          />
          <Button
            onClick={() => setCallMeInstead(true)}
            type="button"
            variant="white"
            outline
          >
            {translations.thankYou.callMeInstead}
          </Button>
        </>
      )}
    </LeadShell>
  );
};

const LeadShell = ({
  locale,
  children,
}: {
  locale: LangType;
  children: React.ReactNode;
}) => (
  <Block theme="off-white" contentSize="small" className={styles.leadBlock}>
    <FlexDiv
      className={styles.container}
      flex={{ direction: "column", x: "stretch", y: "flex-start" }}
      gapArray={[5, 5, 6, 6]}
      width100
    >
      <LogoLink locale={locale} />
      <FlexDiv
        flex={{ direction: "column", x: "flex-start", y: "center" }}
        gapArray={[5, 5, 6, 6]}
        width100
      >
        {children}
      </FlexDiv>
    </FlexDiv>
  </Block>
);

const safeParseCalendlyEvent = (data: string) => {
  try {
    return JSON.parse(data)?.event;
  } catch {
    return "";
  }
};
