import React, { ImgHTMLAttributes, PropsWithChildren } from "react";
import { SanityImageSource, getImageDimensions } from "@sanity/asset-utils";
import { urlFor } from "@/app/api/client";
import Img from "next/image";

export interface ICustomImage {
  alt: string;
  image: SanityImageSource;
  width?: number;
}

export const SanityImage: React.FC<PropsWithChildren<
  ICustomImage & ImgHTMLAttributes<HTMLImageElement>
>> = ({ image, alt }) => {
  const dimensions = getImageDimensions(image);
  return (
    <figure
      style={{
        position: "relative",
        width: "100%", // Ensure the container fills its parent width
        height: "100%", // Ensure the container fills its parent height
        overflow: "hidden", // Hide any overflow from the image
      }}
    >
      <Img
        src={urlFor(image).url()}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        placeholder="blur"
        blurDataURL={urlFor(image).width(24).height(24).blur(10).url()}
        sizes="
        (max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        40vw"
        style={{ objectFit: "cover" }}
      />
    </figure>
  );
};
