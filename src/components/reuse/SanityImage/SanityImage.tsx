import React, {
  ImgHTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { ICustomImage } from "../../../data";
import { urlFor } from "../../../api/useFetchPage";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

interface SanityImageProps extends ICustomImage {
  visible?: boolean;
}
export const SanityImage: React.FC<PropsWithChildren<
  SanityImageProps & ImgHTMLAttributes<HTMLImageElement>
>> = ({ image, alt, visible = false, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(visible);
  const [imgWidth, setImgWidth] = useState<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const minimumWidth = 600;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px" } // Adjust root margin as per your requirement
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && imgRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(imgRef.current);
      }
    };
  }, [imgRef]);

  const src =
    image && isVisible
      ? (urlFor(image) as ImageUrlBuilder)
          .width(imgWidth || minimumWidth)
          .auto("format")
          .url()
      : "";

  useEffect(() => {
    const handleResize = () => {
      if (imgRef.current?.clientWidth && isVisible && loaded) {
        const newWidth = imgRef.current.clientWidth;
        setImgWidth(newWidth < minimumWidth ? minimumWidth : newWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imgRef, isVisible, loaded]);

  return (
    <figure ref={imgRef} style={{ width: "auto", height: "100%" }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ objectFit: "cover" }}
      />
    </figure>
  );
};
