import React, { useEffect, useRef, useState } from "react";
import styles from "./UploadButton.module.scss";
import { Paragraph } from "../../Text/Paragraph/Paragraph";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";

import { Icon } from "../../Icon/Icon";
import FlexDiv from "../../FlexDiv";
import { LangType } from "@/i18n/request";
import { IconButton } from "../../IconButton/IconButton";

interface UploadButtonProps {
  onFilesSelect: (files: File[]) => void;
  accept?: string;
  uploadedFiles?: File[];
  maxFiles?: number;
  isInvalid?: boolean;
  required?: boolean;
  buttonText?: string;
  multiple?: boolean;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  onFilesSelect,
  accept = "image/*",
  uploadedFiles = [],
  maxFiles = 3,
  isInvalid = false,
  required = true,
  buttonText,
  multiple = true,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const canAddMore = uploadedFiles.length < maxFiles;

  useEffect(() => {
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));

    const urls = uploadedFiles.map((file) => URL.createObjectURL(file));
    previewUrlsRef.current = urls;
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      previewUrlsRef.current = [];
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
        event.target.value = "";
        return;
      }

      onFilesSelect(totalFiles);
      event.target.value = "";
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
            id="file-upload"
            ref={fileInputRef}
            type="file"
            onChange={handleChange}
            accept={accept}
            multiple={multiple}
            style={{ display: "none" }}
          />

          <Icon
            icon="upload"
            size="regular"
            color="black"
            className={styles.icon}
          />

          <Paragraph level="big" color="black" weight={600} textAlign="center">
            {uploadedFiles.length > 0
              ? "remove uploaded file"
              : buttonText || translations.form.general.upload}
          </Paragraph>
          <Paragraph level="small" color="black" textAlign="center">
            Up to {maxFiles} files
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
          <input
            id="file-upload-more"
            ref={fileInputRef}
            type="file"
            onChange={handleChange}
            accept={accept}
            multiple={multiple}
            style={{ display: "none" }}
          />
          {uploadedFiles.map((_, index) => (
            <FlexDiv
              key={index}
              flex={{ direction: "column" }}
              className={styles.imageWrapper}
              style={{ position: "relative" }}
            >
              <IconButton
                aria-label={`Remove ${uploadedFiles[index]?.name || "file"}`}
                background="white"
                className={styles.removeButton}
                iconProps={{
                  icon: "close",
                  size: "extra-small",
                  color: "black",
                }}
                onClick={() => removeFile(index)}
                type="button"
              />
              {previewUrls[index] &&
              uploadedFiles[index]?.type.startsWith("image/") ? (
                <img
                  src={previewUrls[index]}
                  alt={`preview-${index}`}
                  className={styles.previewImage}
                />
              ) : (
                <FlexDiv
                  height100
                  width100
                  padding={{ all: [3] }}
                  flex={{ direction: "column" }}
                  className={styles.filePreview}
                >
                  <Icon icon="upload" size="small" color="black" />
                  <Paragraph level="small" color="black" textAlign="center">
                    {uploadedFiles[index]?.name}
                  </Paragraph>
                </FlexDiv>
              )}
            </FlexDiv>
          ))}
          {canAddMore && (
            <FlexDiv
              className={styles.addMore}
              flex={{ direction: "column" }}
              gapArray={[2]}
              onClick={handleClick}
              padding={{ all: [4] }}
            >
              <IconButton
                aria-label="Upload more files"
                background="white"
                iconProps={{ icon: "plus", size: "regular", color: "black" }}
                type="button"
              />
              <Paragraph level="small" color="black" textAlign="center">
                Add more
              </Paragraph>
              <Paragraph level="small" color="dark-grey" textAlign="center">
                {uploadedFiles.length}/{maxFiles}
              </Paragraph>
            </FlexDiv>
          )}
        </FlexDiv>
      )}
    </FlexDiv>
  );
};
