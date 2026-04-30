"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LangType } from "@/i18n/request";
import { getTranslations } from "@/helpers/langUtils";
import { LeadFormFields } from "./LeadFormFields";
import { LeadFormLayout } from "./LeadFormLayout";
import {
  getStepIndex,
  getStepPath,
  initialLeadFormData,
  LeadFormData,
  LeadFormStep,
  LeadUpload,
  leadFormSteps,
} from "./leadFormTypes";
import {
  clearStoredLeadFormData,
  readStoredLeadFormData,
  writeStoredLeadFormData,
} from "./leadFormStorage";
import {
  clearCachedLeadUploads,
  encodeLeadFiles,
  initialUploadedLeadFiles,
  readCachedEncodedLeadUploads,
  readCachedUploadedLeadFiles,
  UploadedLeadFiles,
  writeCachedLeadUploads,
} from "./leadFormUploads";
import { validateLeadFormStep } from "./leadFormValidation";

interface LeadFormProps {
  locale: LangType;
  step: LeadFormStep;
}

export const LeadForm = ({ locale, step }: LeadFormProps) => {
  const router = useRouter();
  const translations = getTranslations(locale).leadForm;
  const [formData, setFormData] = useState<LeadFormData>(initialLeadFormData);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedLeadFiles>(
    initialUploadedLeadFiles,
  );
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stepIndex = getStepIndex(step);
  const isReview = step === "review";
  const progress = ((stepIndex + 1) / leadFormSteps.length) * 100;
  const stepCopy = getStepCopy(step, translations);

  useEffect(() => {
    setUploadedFiles(readCachedUploadedLeadFiles());
    setFormData({
      ...readStoredLeadFormData(),
      uploads: readCachedEncodedLeadUploads(),
    });
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) writeStoredLeadFormData(formData);
  }, [formData, hasLoaded]);

  const updateField = <Key extends keyof LeadFormData>(
    key: Key,
    value: LeadFormData[Key],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const goToStep = (targetStep: LeadFormStep) => {
    router.push(getStepPath(locale, targetStep));
  };

  const handleBack = () => {
    const previousStep = leadFormSteps[stepIndex - 1];
    if (previousStep) goToStep(previousStep);
    else router.push(`/${locale}`);
  };

  const handleContinue = (event: FormEvent) => {
    event.preventDefault();

    const validationError = validateLeadFormStep(step, formData, translations);
    if (validationError) {
      setError(validationError);
      return;
    }

    const nextStep = leadFormSteps[stepIndex + 1];
    if (nextStep) goToStep(nextStep);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/sendLeadFormEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, locale }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || translations.errors.submitFailed);
      }

      clearStoredLeadFormData();
      clearCachedLeadUploads();
      router.push(`/${locale}/custom-sign/thank-you`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : translations.errors.genericSubmit,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadChange = async (
    field: LeadUpload["field"],
    files: File[],
  ) => {
    const encoded = await encodeLeadFiles(field, files);
    const nextUploadedFiles = { ...uploadedFiles, [field]: files };
    const nextEncodedUploads = [
      ...formData.uploads.filter((upload) => upload.field !== field),
      ...encoded,
    ];

    writeCachedLeadUploads(nextUploadedFiles, nextEncodedUploads);
    setUploadedFiles(nextUploadedFiles);
    setFormData((prev) => ({
      ...prev,
      uploads: nextEncodedUploads,
    }));
  };

  return (
    <LeadFormLayout
      locale={locale}
      error={error}
      isReview={isReview}
      isSubmitting={isSubmitting}
      onBack={handleBack}
      onSubmit={isReview ? handleSubmit : handleContinue}
      progress={progress}
      question={stepCopy.question}
      stepIndex={stepIndex}
      stepLabel={stepCopy.label}
      translations={translations}
    >
      <LeadFormFields
        formData={formData}
        onChange={updateField}
        onEditStep={goToStep}
        onUploadChange={handleUploadChange}
        step={step}
        translations={translations}
        uploadedFiles={uploadedFiles}
      />
    </LeadFormLayout>
  );
};

const getStepCopy = (
  step: LeadFormStep,
  translations: ReturnType<typeof getTranslations>["leadForm"],
) => {
  switch (step) {
    case "business-type":
      return translations.steps.businessType;
    case "project-info":
      return translations.steps.projectInfo;
    default:
      return translations.steps[step];
  }
};
