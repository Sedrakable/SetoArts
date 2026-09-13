"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./Intake.module.scss";
import { Block } from "@/components/pages/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Heading } from "@/components/reuse/Text/Heading/Heading";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { Button } from "@/components/reuse/Button/Button";
import { LogoLink } from "@/components/navbar/Navbar/Navbar";
import { IntakeClient } from "@/lib/intake/questions";
import { getIntroCopy, doneCopy } from "@/lib/intake/copy";
import {
  IntakeAnswer,
  IntakeAnswers,
  getUnansweredRequiredIds,
} from "@/lib/intake/answers";
import {
  clearStoredAnswers,
  readStoredAnswers,
  writeStoredAnswers,
} from "@/lib/intake/storage";
import { IntakeQuestionField } from "./IntakeQuestionField";

interface IntakeFormProps {
  client: string;
  config: IntakeClient;
}

// "intro" and "done" bookend the numbered section screens.
type Screen = "intro" | "done" | number;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const IntakeForm = ({ client, config }: IntakeFormProps) => {
  const sections = config.sections;
  const intro = getIntroCopy(config);

  const [answers, setAnswers] = useState<IntakeAnswers>({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [screen, setScreen] = useState<Screen>("intro");
  const [invalidIds, setInvalidIds] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  // Restore the draft on mount.
  useEffect(() => {
    setAnswers(readStoredAnswers(client));
    setHasLoaded(true);
  }, [client]);

  // Autosave, debounced, once the draft has been restored.
  useEffect(() => {
    if (!hasLoaded) return;
    const timeout = setTimeout(() => writeStoredAnswers(client, answers), 400);
    return () => clearTimeout(timeout);
  }, [answers, client, hasLoaded]);

  const topRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  const updateAnswer = (id: string, next: IntakeAnswer) => {
    setAnswers((prev) => ({ ...prev, [id]: next }));
    // Clear validation state on edit; it re-runs on the next Continue.
    setInvalidIds([]);
    setError("");
  };

  const focusFirstInvalid = (firstId: string) => {
    // Wait a frame so the invalid state has painted before we scroll/focus.
    requestAnimationFrame(() => {
      const wrapper = document.getElementById(`q-${firstId}`);
      wrapper?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "center",
      });
      const focusable = wrapper?.querySelector<HTMLElement>(
        "input, textarea, button, [tabindex]",
      );
      focusable?.focus({ preventScroll: true });
    });
  };

  const goToSection = (index: number) => {
    setScreen(index);
    setInvalidIds([]);
    setError("");
    scrollToTop();
  };

  const goToIntro = () => {
    setScreen("intro");
    setInvalidIds([]);
    setError("");
    scrollToTop();
  };

  const handleBack = () => {
    if (typeof screen !== "number") return;
    if (screen === 0) goToIntro();
    else goToSection(screen - 1);
  };

  const handleContinue = (event: FormEvent) => {
    event.preventDefault();
    if (typeof screen !== "number") return;

    const missing = getUnansweredRequiredIds(
      sections[screen].questions,
      answers,
    );
    if (missing.length > 0) {
      setInvalidIds(missing);
      setError("A few answers are still needed before you continue.");
      focusFirstInvalid(missing[0]);
      return;
    }

    const isLast = screen === sections.length - 1;
    if (isLast) handleSubmit();
    else goToSection(screen + 1);
  };

  const handleSubmit = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client, answers, website: honeypot }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong.");
      }

      clearStoredAnswers(client);
      setScreen("done");
      scrollToTop();
    } catch {
      setError(
        "That didn't go through. Your answers are saved — check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress =
    screen === "intro"
      ? 0
      : screen === "done"
        ? 100
        : Math.round(((screen + 1) / sections.length) * 100);

  return (
    <Block theme="off-white" contentSize="small" className={styles.block}>
      <FlexDiv
        ref={topRef}
        className={styles.container}
        flex={{ direction: "column", x: "stretch", y: "flex-start" }}
        gapArray={[5, 5, 6, 6]}
        width100
      >
        <FlexDiv
          flex={{ x: "space-between", y: "flex-end" }}
          gapArray={[4]}
          width100
        >
          <LogoLink locale="en" />
          {typeof screen === "number" && (
            <Paragraph color="dark-grey" level="regular" fit="shrink">
              {`Section ${screen + 1} of ${sections.length}`}
            </Paragraph>
          )}
        </FlexDiv>

        <div className={styles.progress} aria-label="Progress">
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        {screen === "intro" && (
          <IntroScreen intro={intro} onStart={() => goToSection(0)} />
        )}

        {screen === "done" && <DoneScreen />}

        {typeof screen === "number" && (
          <FlexDiv
            as="form"
            className={styles.form}
            flex={{ direction: "column", x: "stretch", y: "flex-start" }}
            gapArray={[5, 5, 6, 6]}
            onSubmit={handleContinue}
            width100
          >
            <FlexDiv
              flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
              gapArray={[3, 3, 4, 4]}
              width100
            >
              <Heading
                as="span"
                color="dark-grey"
                font="Cursive"
                level="5"
                upperCase={false}
              >
                {sections[screen].title}
              </Heading>
              {sections[screen].blurb && (
                <Paragraph
                  className={styles.copy}
                  color="black"
                  level="regular"
                >
                  {sections[screen].blurb as string}
                </Paragraph>
              )}
            </FlexDiv>

            <FlexDiv
              className={styles.fields}
              flex={{ direction: "column", x: "stretch", y: "flex-start" }}
              gapArray={[5, 5, 6, 6]}
              width100
            >
              {sections[screen].questions.map((question) => (
                <IntakeQuestionField
                  key={question.id}
                  question={question}
                  answer={answers[question.id] ?? {}}
                  onChange={(next) => updateAnswer(question.id, next)}
                  isInvalid={invalidIds.includes(question.id)}
                />
              ))}
            </FlexDiv>

            {/* Honeypot: real people never see or fill this. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              style={{
                position: "absolute",
                left: "-9999px",
                width: 0,
                height: 0,
                overflow: "hidden",
              }}
            />

            {error && (
              <Paragraph
                className={styles.error}
                color="error"
                level="regular"
                weight={600}
              >
                {error}
              </Paragraph>
            )}

            <FlexDiv
              flex={{
                direction: "column-reverse",
                x: "space-between",
                y: "flex-start",
              }}
              gapArray={[3]}
              width100
              className={styles.buttons}
            >
              <Button
                onClick={handleBack}
                outline
                type="button"
                variant="transparent"
              >
                Back
              </Button>
              <Button disabled={isSubmitting} type="submit" variant="black">
                {screen === sections.length - 1
                  ? isSubmitting
                    ? "Sending"
                    : "Send it"
                  : "Continue"}
              </Button>
            </FlexDiv>
          </FlexDiv>
        )}
      </FlexDiv>
    </Block>
  );
};

const IntroScreen = ({
  intro,
  onStart,
}: {
  intro: ReturnType<typeof getIntroCopy>;
  onStart: () => void;
}) => (
  <FlexDiv
    className={styles.form}
    flex={{ direction: "column", x: "stretch", y: "flex-start" }}
    gapArray={[5, 5, 6, 6]}
    width100
  >
    <Heading as="h1" color="black" font="Outfit" level="2" weight={700} upperCase={false}>
      {intro.title}
    </Heading>
    {intro.paragraphs.map((paragraph, index) => (
      <Paragraph
        key={index}
        className={styles.copy}
        color="black"
        level="regular"
      >
        {paragraph}
      </Paragraph>
    ))}
    <div className={styles.facts}>
      {intro.facts.map((fact) => (
        <div key={fact.label} className={styles.fact}>
          <Paragraph
            className={styles.factLabel}
            color="dark-grey"
            level="small"
            weight={600}
          >
            {fact.label}
          </Paragraph>
          <Paragraph color="black" level="regular">
            {fact.value}
          </Paragraph>
        </div>
      ))}
    </div>
    <FlexDiv flex={{ x: "flex-start" }} width100 className={styles.buttons}>
      <Button onClick={onStart} type="button" variant="black" fit="shrink">
        Start
      </Button>
    </FlexDiv>
  </FlexDiv>
);

const DoneScreen = () => (
  <FlexDiv
    className={styles.form}
    flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
    gapArray={[5, 5, 6, 6]}
    width100
  >
    <Heading as="h1" color="black" font="Outfit" level="2" weight={700} upperCase={false}>
      {doneCopy.title}
    </Heading>
    {doneCopy.paragraphs.map((paragraph, index) => (
      <Paragraph
        key={index}
        className={styles.copy}
        color="black"
        level="regular"
      >
        {paragraph}
      </Paragraph>
    ))}
  </FlexDiv>
);
