import { SanityImageSource } from "@sanity/asset-utils";
import { urlFor } from "@/app/api/client";
import Img, { ImageProps } from "next/image";
"";

export type SizesType = [
  number | string,
  number | string,
  number | string,
  number | string
];
export interface ICustomImage extends Omit<ImageProps, "src" | "sizes"> {
  alt: string;
  image: SanityImageSource;
  width?: number;
  quality?: number;
  figureclassname?: string;
  sizes?: SizesType; // Optional sizes prop
}

const generateSizes = (sizes?: SizesType): string => {
  if (!sizes) {
    return "(max-width: 640px) 90vw, (max-width: 1200px) 80vw, (max-width: 1680px) 50vw, 33vw";
  }
  const [mobile, tablet, laptop, desktop] = sizes;
  return `(max-width: 640px) ${mobile}px, (max-width: 1200px) ${tablet}px, (max-width: 1680px) ${laptop}px, ${desktop}px`;
};

export const SanityImage: React.FC<ICustomImage> = (props) => {
  const { quality = 30, sizes, ...restProps } = props;

  return props.width
    ? props.image && (
        <Img
          src={urlFor(props.image)
            .format("webp")
            .quality(quality)
            .width(props.width)
            .url()}
          width={props.width} // ✅ Set width explicitly
          height={0} // ✅ Let height be auto (needed for Next.js)
          style={{
            objectFit: "cover",
            height: "auto", // ✅ Maintain aspect ratio
          }}
          placeholder="blur"
          blurDataURL={urlFor(props.image).width(24).height(24).blur(10).url()}
          sizes={sizes ? generateSizes(sizes) : undefined} // Dynamic sizes
          priority={props.priority}
          {...restProps}
        />
      )
    : props.image && (
        <figure
          className={props.figureclassname}
          style={{
            position: "relative",
            width: "100%", // Ensure the container fills its parent width
            height: "100%", // Ensure the container fills its parent height
            overflow: "hidden", // Hide any overflow from the image
          }}
        >
          <Img
            src={urlFor(props.image).format("webp").quality(quality).url()}
            fill
            placeholder="blur"
            blurDataURL={urlFor(props.image)
              .width(24)
              .height(24)
              .blur(10)
              .url()}
            style={{ objectFit: "cover" }}
            sizes={generateSizes(sizes)} // Dynamic sizes
            priority={props.priority}
            {...restProps}
          />
        </figure>
      );
};
