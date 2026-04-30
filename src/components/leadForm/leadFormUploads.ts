import { LeadUpload } from "./leadFormTypes";
import { encodeFilesForEmail } from "@/components/reuse/Form/fileEncoding";

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

  const encodedFiles = await encodeFilesForEmail(files);

  return encodedFiles.map((file) => ({ ...file, field }));
};
