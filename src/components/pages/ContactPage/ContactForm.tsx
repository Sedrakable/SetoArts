"use client";
import React, { useState, FC, ReactNode } from "react";

import styles from "@/components/reuse/Form/Form.module.scss";
import { Input, TextArea } from "@/components/reuse/Form/Input/Input";
import { getTranslations } from "@/helpers/langUtils";
import { useLocale } from "next-intl";
import {
  ContactFormData,
  EncodedFileType,
  FormErrorData,
} from "@/components/reuse/Form/formTypes";
import {
  FormSteps,
  FormSubmitButton,
  FormSubmitMessage,
  FormTitleProps,
  FormTitles,
  MultiColumn,
} from "@/components/reuse/Form/Form";
import { Slider } from "@/components/reuse/Form/Slider/Slider";
import { UploadButton } from "@/components/reuse/Form/UploadButton/UploadButton";
import FlexDiv from "@/components/reuse/FlexDiv";
import { LangType } from "@/i18n";
import { LocalTargets } from "@/data.d";
import { OptionType, Select } from "@/components/reuse/Form/Select/Select";

export interface ContactFormProps extends FormTitleProps {}

export const ContactForm: FC<ContactFormProps> = ({ title, subTitle }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    service: "wood-sign", // Default to wood-sign
    details: "",
    budgetMin: 1000,
    budgetMax: 3000,
    width: 36, // Default for wood-sign
    height: 36, // Default for wood-sign
    uploads: [],
  });

  const [errors, setErrors] = useState<FormErrorData>({});
  const [submit, setSubmit] = useState<string | false>(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const serviceOptions: OptionType[] = [
    { value: "wood-sign", label: translations.nav.wood },
    { value: "branding", label: translations.nav.branding },
    { value: "web-design", label: translations.nav.web },
  ];

  const handleInputChange = (field: keyof ContactFormData) => (
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: value === "" }));
  };

  const handleServiceChange = (selected: string) => {
    const typedSelected = selected as ContactFormData["service"];
    setFormData((prev) => ({
      ...prev,
      service: typedSelected,
      width: typedSelected === "wood-sign" ? prev.width || 36 : undefined,
      height: typedSelected === "wood-sign" ? prev.height || 36 : undefined,
    }));
    setErrors((prev) => ({ ...prev, service: false }));
  };

  const handleBudgetChange = (values: number[]) => {
    setFormData((prev) => ({
      ...prev,
      budgetMin: values[0],
      budgetMax: values[1],
    }));
  };

  const handleWidthChange = (value: number) => {
    setFormData((prev) => ({ ...prev, width: value }));
  };

  const handleHeightChange = (value: number) => {
    setFormData((prev) => ({ ...prev, height: value }));
  };
  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      const filePromises: Promise<EncodedFileType>[] = files.map((file) => {
        return new Promise<{ name: string; type: string; data: string }>(
          (resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const fileData = (event.target?.result as string)?.split(",")[1];
              resolve({
                name: file.name,
                type: file.type,
                data: fileData,
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          }
        );
      });

      Promise.all(filePromises).then((encodedFiles) => {
        setFormData((prev: ContactFormData) => ({
          ...prev,
          uploads: encodedFiles,
        }));
        setUploadedFiles(files);
      });
    } else {
      setFormData((prev: ContactFormData) => ({ ...prev, uploads: [] }));
      setUploadedFiles([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/sendContactFormEmail", {
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
    const requiredFields: (keyof ContactFormData)[] = [
      "firstName",
      "lastName",
      "email",
      "service",
      "details",
      "budgetMin",
      "budgetMax",
    ];
    if (formData.service === "wood-sign") {
      requiredFields.push("width", "height");
    }

    requiredFields.forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const Steps: ReactNode[] = [
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
    <Select
      label={translations.form.general.service}
      options={serviceOptions}
      onChange={handleServiceChange}
      defaultValue={formData.service}
      isInvalid={errors.service}
      required
    />,
    <TextArea
      label={translations.form.general.details}
      value={formData.details}
      onChange={handleInputChange("details")}
      required
      isInvalid={errors.details}
      placeholder={translations.form.general.detailsPlaceholder}
    />,
    <Slider
      label={translations.form.wood.budget}
      min={500}
      max={5000}
      step={100}
      values={[formData.budgetMin, formData.budgetMax]}
      onChange={(value) => handleBudgetChange(value as number[])}
      unit={translations.form.wood.currency}
      isInvalid={errors.budgetMin || errors.budgetMax}
    />,
    ...(formData.service === "wood-sign"
      ? [
          <FlexDiv gapArray={[6, 6, 6, 7]} width100 wrap>
            <Slider
              label={translations.form.wood.width}
              max={48}
              min={12}
              values={formData.width || 36}
              onChange={(val) => handleWidthChange(val as number)}
              unit={translations.form.wood.unit}
              step={1}
              isInvalid={errors.width}
            />
            <Slider
              label={translations.form.wood.height}
              max={48}
              min={12}
              values={formData.height || 36}
              onChange={(val) => handleHeightChange(val as number)}
              unit={translations.form.wood.unit}
              step={1}
              isInvalid={errors.height}
            />
          </FlexDiv>,
        ]
      : []),
    <UploadButton
      onFilesSelect={handleFileUpload}
      accept="image/*"
      uploadedFiles={uploadedFiles}
      isInvalid={errors.upload}
      maxFiles={3}
    />,
  ];

  return (
    <FlexDiv
      width100
      id={LocalTargets.DIGITALFORM}
      className={styles.container}
    >
      {submit === translations.form.general.emailSent ? (
        <FormSubmitMessage locale={locale} translations={translations} />
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormTitles title={title} subTitle={subTitle} alignText="left" />
          <FormSteps steps={Steps} />
          <FormSubmitButton
            title={translations.buttons.buildBrand}
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
