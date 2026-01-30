"use client";
import React, { useState, ReactNode, FC } from "react";

import styles from "@/components/reuse/Form/Form.module.scss";
import cn from "classnames";
import { Input, TextArea } from "@/components/reuse/Form/Input/Input";
import { getTranslations } from "@/helpers/langUtils";
import { useLocale } from "next-intl";
import {
  TradeFormData,
  FormErrorData,
  looksLikeBot,
} from "@/components/reuse/Form/formTypes";
import {
  FormSteps,
  FormSubmitButton,
  FormSubmitMessage,
  MultiColumn,
} from "@/components/reuse/Form/Form";
import FlexDiv from "@/components/reuse/FlexDiv";
import { LangType } from "@/i18n/request";
import { LocalTargets } from "@/data.d";

export interface TradeFormProps {
  backgroundBlur?: boolean;
}
export const TradeForm: FC<TradeFormProps> = ({ backgroundBlur = false }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  const [formData, setFormData] = useState<TradeFormData>({
    firstName: "",
    lastName: "",
    email: "",
    details: "",
    company: "", // honeypot field
  });

  const [errors, setErrors] = useState<FormErrorData>({});
  const [submit, setSubmit] = useState<string | false>(false);
  const [loading, setLoading] = useState(false); // New loading state

  const handleInputChange = (field: keyof TradeFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: value === "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // // BOT CHECK (test mode)
    // if (looksLikeBot(formData)) {
    //   console.log("❌ BLOCKED (spam-ish submission)", formData);
    //   return;
    // } else {
    //   console.log("✔️ PASSED (human-ish submission)", formData);
    //   return; // <-- keep this while testing so no email is sent
    // }

    if (looksLikeBot(formData)) {
      console.error("❌ BLOCKED (spam-ish submission)");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/sendTradeFormEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData, locale }),
      });

      if (response.ok) {
        setSubmit(translations.form.general.emailSent);
        // Add success handling (e.g., show success message, reset form)
      } else {
        console.error("Failed to send request", response);
        setSubmit(translations.form.general.emailNotSent);
        // Add error handling (e.g., show error message)
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmit(translations.form.general.emailNotSent);
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrorData = {};
    const requiredFields: (keyof TradeFormData)[] = [
      "firstName",
      "lastName",
      "email",
      "details",
    ];

    requiredFields.forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = true;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const Steps: ReactNode[] = [
    <Input
      label="Company"
      type="text"
      value={formData.company || ""}
      onChange={handleInputChange("company")}
      placeholder=""
      honeyPot
    />,
    <MultiColumn>
      <Input
        label={translations.form.general.firstName}
        type="text"
        value={formData.firstName}
        onChange={handleInputChange("firstName")}
        required
        isInvalid={errors.firstName}
        placeholder={translations.form.general.firstNamePlaceholder}
      />
      <Input
        label={translations.form.general.lastName}
        type="text"
        value={formData.lastName}
        onChange={handleInputChange("lastName")}
        required
        isInvalid={errors.lastName}
        placeholder={translations.form.general.lastNamePlaceholder}
      />
    </MultiColumn>,

    <Input
      label={translations.form.general.email}
      type="email"
      value={formData.email}
      onChange={handleInputChange("email")}
      required
      isInvalid={errors.email}
      placeholder={translations.form.general.emailPlaceholder}
    />,
    <TextArea
      label={translations.form.general.details}
      value={formData.details}
      onChange={handleInputChange("details")}
      required
      isInvalid={errors.details}
      placeholder={translations.form.general.detailsPlaceholder}
    />,
  ];

  return (
    <FlexDiv
      width100
      id={LocalTargets.TRADEBLOCK}
      className={cn(styles.container, {
        [styles.backgroundBlur]: backgroundBlur,
      })}
    >
      {submit === translations.form.general.emailSent ? (
        <FormSubmitMessage locale={locale} translations={translations} />
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormSteps steps={Steps} />
          <FormSubmitButton
            title={translations.buttons.submit}
            isValid={!Object.values(errors).some(Boolean)}
            translations={translations}
            submitText={submit}
            loading={loading}
          />
        </form>
      )}
    </FlexDiv>
  );
};
