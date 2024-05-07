import { SanityImageSource } from "@sanity/asset-utils";
import { urlFor } from "@/app/api/client";
import Img, { ImageProps } from "next/image";

export interface ICustomImage extends Omit<ImageProps, "src"> {
  alt: string;
  image: SanityImageSource;
  width?: number;
}

export const SanityImage: React.FC<ICustomImage> = (props) => {
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
        src={urlFor(props.image).format("webp").quality(30).url()}
        fill
        placeholder="blur"
        blurDataURL={urlFor(props.image).width(24).height(24).blur(10).url()}
        style={{ objectFit: "cover" }}
        sizes="(max-width: 640px) 90vw, (max-width: 1200px) 80vw, (max-width: 1680px) 50vw, 33vw"
        priority={props.priority}
        {...props}
      />
    </figure>
  );
};
