import React, { useEffect, useRef, useState } from "react";
import styles from "./UploadButton.module.scss";
import { Paragraph } from "../../Paragraph/Paragraph";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";

import { Icon } from "../../Icon";
import FlexDiv from "../../FlexDiv";
import Image from "next/image";
import { IconButton } from "../../IconButton";
import { Button } from "../../Button";
import { LangType } from "@/i18n";

interface UploadButtonProps {
  onFilesSelect: (files: File[]) => void;
  accept?: string;
  uploadedFiles?: File[];
  maxFiles?: number;
  isInvalid?: boolean;
  required?: boolean;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  onFilesSelect,
  accept = "image/*",
  uploadedFiles = [],
  maxFiles = 3,
  isInvalid = false,
  required = true,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    // Clear existing preview URLs
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    // Create new preview URLs for all uploaded files
    const urls = uploadedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Cleanup function
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [uploadedFiles]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const totalFiles = [...uploadedFiles, ...newFiles];

      if (totalFiles.length > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        return;
      }

      onFilesSelect(totalFiles);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      const totalFiles = [...uploadedFiles, ...newFiles];

      if (totalFiles.length > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        return;
      }

      onFilesSelect(totalFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    onFilesSelect(newFiles);
  };

  return (
    <FlexDiv
      width100
      gapArray={[4, 5, 5, 5]}
      flex={{ x: "flex-start", y: "stretch" }}
      className={`${styles.container} ${dragActive ? styles.dragActive : ""}`}
    >
      {uploadedFiles.length === 0 && (
        <FlexDiv
          className={`${styles.uploadButton} ${
            dragActive ? styles.dragActive : ""
          } ${uploadedFiles.length > 0 ? styles.uploaded : ""} ${
            isInvalid ? styles.invalid : ""
          }`}
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          width100
          flex={{ direction: "column" }}
          gapArray={[3, 4, 4, 4]}
          padding={{ horizontal: [7], vertical: [5] }}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleChange}
            accept={accept}
            multiple
            style={{ display: "none" }}
          />

          <Icon
            icon="upload"
            size="big"
            color="black"
            className={styles.icon}
          />

          <Paragraph level="big" color="black" weight={600} textAlign="center">
            {uploadedFiles.length > 0
              ? "remove uploaded file"
              : translations.form.general.upload}
          </Paragraph>
          {required && (
            <Paragraph
              level="big"
              color="black"
              weight={600}
              className={styles.required}
            >
              *
            </Paragraph>
          )}
        </FlexDiv>
      )}
      {uploadedFiles.length > 0 && (
        <FlexDiv wrap gapArray={[4]} flex={{ x: "flex-start" }} width100>
          {uploadedFiles.map((_, index) => (
            <FlexDiv
              key={index}
              flex={{ direction: "column" }}
              className={styles.imageWrapper}
              style={{ position: "relative" }}
            >
              <FlexDiv
                padding={{ all: [2] }}
                className={styles.closeButtonWrapper}
              >
                <Button
                  variant="black"
                  small
                  onClick={() => removeFile(index)}
                  iconProps={{ icon: "close", side: "right", size: "small" }}
                />
              </FlexDiv>
              {previewUrls[index] && (
                <Image
                  src={previewUrls[index]}
                  alt={`preview-${index}`}
                  fill
                  objectFit="cover"
                  priority
                  quality={5}
                />
              )}
            </FlexDiv>
          ))}
        </FlexDiv>
      )}
    </FlexDiv>
  );
};
