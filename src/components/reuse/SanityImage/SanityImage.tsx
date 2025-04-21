import { SanityImageSource } from "@sanity/asset-utils";
import { urlFor } from "@/app/api/client";
import Img from "next/image";

type SizeUnit = `${number}px` | `${number}vw` | `${number}%`;
export type SizesType = [
  number | SizeUnit,
  number | SizeUnit,
  number | SizeUnit,
  number | SizeUnit
];

export interface ICustomImage {
  alt: string;
  image: SanityImageSource;
  quality?: number;
  figureclassname?: string;
  sizes?: SizesType;
  priority?: boolean;
}

const generateSizes = (sizes?: SizesType): string => {
  if (!sizes) {
    return "(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw";
  }
  const [mobile, tablet, laptop, desktop] = sizes;
  const processSize = (size: number | SizeUnit): string => {
    return typeof size === "number" ? `${size}px` : size;
  };
  return `(max-width: 640px) ${processSize(mobile)}, (max-width: 1200px) ${processSize(tablet)}, (max-width: 1680px) ${processSize(laptop)}, ${processSize(desktop)}`;
};

export const SanityImage: React.FC<ICustomImage> = ({
  quality = 75,
  sizes,
  image,
  alt,
  figureclassname,
  priority,
}) => {
  if (!image) return null;

  return (
    <figure
      className={figureclassname}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Img
        src={urlFor(image).format("webp").quality(quality).url()}
        fill
        placeholder="blur"
        blurDataURL={urlFor(image).width(24).height(24).blur(10).url()}
        style={{ objectFit: "cover" }}
        sizes={generateSizes(sizes)}
        priority={priority}
        alt={alt}
      />
    </figure>
  );
};