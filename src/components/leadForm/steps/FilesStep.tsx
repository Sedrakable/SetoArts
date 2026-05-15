import { UploadButton } from "@/components/reuse/Form/UploadButton/UploadButton";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { LeadUploadStepProps } from "./LeadStepProps";
import { LeadChoiceGroup } from "./LeadStepHelpers";
import styles from "../LeadForm.module.scss";

export const FilesStep = ({
  formData,
  onAutoAdvance,
  onChange,
  translations,
  onUploadChange,
  uploadedFiles,
}: LeadUploadStepProps) => (
  <>
    <LeadChoiceGroup
      field="filesReady"
      onAutoAdvance={onAutoAdvance}
      onChange={onChange}
      options={translations.steps.files.options}
      shouldAutoAdvance={(value) => value !== "upload-now"}
      value={formData.filesReady}
    />
    <Paragraph className={styles.microcopy} color="dark-grey" level="regular">
      {translations.steps.files.microcopy}
    </Paragraph>
    {formData.filesReady === "upload-now" && (
      <FlexDiv
        className={styles.fields}
        flex={{ direction: "column", x: "stretch", y: "flex-start" }}
        gapArray={[4]}
        width100
      >
        <UploadButton
          accept=".svg,.ai,.pdf,.png,.jpg,.jpeg,.heic,image/*"
          buttonText={translations.steps.files.uploadButton}
          maxFiles={8}
          onFilesSelect={(files) => onUploadChange("inspiration", files)}
          required={false}
          uploadedFiles={uploadedFiles.inspiration}
        />
        <Paragraph className={styles.note} color="dark-grey" level="small">
          {translations.steps.files.uploadNote}
        </Paragraph>
      </FlexDiv>
    )}
    {formData.filesReady === "no-logo-yet" && (
      <Paragraph className={styles.note} color="dark-grey" level="regular">
        {translations.steps.files.noLogoNote}
      </Paragraph>
    )}
  </>
);
