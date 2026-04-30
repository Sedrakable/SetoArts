import { LeadUpload } from "./leadFormTypes";

export type UploadedLeadFiles = Record<LeadUpload["field"], File[]>;

export const initialUploadedLeadFiles: UploadedLeadFiles = {
  logo: [],
  spacePhotos: [],
  inspiration: [],
};

let cachedUploadedLeadFiles: UploadedLeadFiles = initialUploadedLeadFiles;
let cachedEncodedLeadUploads: LeadUpload[] = [];

export const readCachedUploadedLeadFiles = () => cachedUploadedLeadFiles;

export const readCachedEncodedLeadUploads = () => cachedEncodedLeadUploads;

export const writeCachedLeadUploads = (
  uploadedFiles: UploadedLeadFiles,
  encodedUploads: LeadUpload[],
) => {
  cachedUploadedLeadFiles = uploadedFiles;
  cachedEncodedLeadUploads = encodedUploads;
};

export const clearCachedLeadUploads = () => {
  cachedUploadedLeadFiles = initialUploadedLeadFiles;
  cachedEncodedLeadUploads = [];
};

export const encodeLeadFiles = async (
  field: LeadUpload["field"],
  files: File[],
): Promise<LeadUpload[]> => {
  if (!files.length) return [];

  return Promise.all(
    files.map(
      (file) =>
        new Promise<LeadUpload>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const data = (event.target?.result as string)?.split(",")[1] || "";
            resolve({ field, name: file.name, type: file.type, data });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        }),
    ),
  );
};
