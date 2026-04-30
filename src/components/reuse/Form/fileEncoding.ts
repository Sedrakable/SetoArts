import { EncodedFileType } from "./formTypes";

const imageMaxDimension = 1600;
const imageQuality = 0.72;

const readFileAsBase64 = (file: File): Promise<EncodedFileType> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = (event.target?.result as string)?.split(",")[1] || "";
      resolve({ name: file.name, type: file.type, data });
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const loadImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Unable to compress image."));
    };
    image.src = objectUrl;
  });

const getCompressedImageSize = (width: number, height: number) => {
  const largestSide = Math.max(width, height);
  if (largestSide <= imageMaxDimension) return { width, height };

  const scale = imageMaxDimension / largestSide;
  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
};

const dataUrlToEncodedFile = (
  dataUrl: string,
  originalFile: File,
): EncodedFileType => {
  const data = dataUrl.split(",")[1] || "";
  const nameWithoutExtension = originalFile.name.replace(/\.[^/.]+$/, "");

  return {
    name: `${nameWithoutExtension}.jpg`,
    type: "image/jpeg",
    data,
  };
};

const compressImageFile = async (file: File): Promise<EncodedFileType> => {
  const image = await loadImage(file);
  const { width, height } = getCompressedImageSize(image.width, image.height);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return readFileAsBase64(file);

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const compressed = dataUrlToEncodedFile(
    canvas.toDataURL("image/jpeg", imageQuality),
    file,
  );
  const original = await readFileAsBase64(file);

  return compressed.data.length < original.data.length ? compressed : original;
};

export const encodeFilesForEmail = async (
  files: File[],
): Promise<EncodedFileType[]> => {
  return Promise.all(
    files.map(async (file) => {
      const canCompress =
        file.type.startsWith("image/") && file.type !== "image/svg+xml";

      if (!canCompress) return readFileAsBase64(file);

      try {
        return await compressImageFile(file);
      } catch {
        return readFileAsBase64(file);
      }
    }),
  );
};
