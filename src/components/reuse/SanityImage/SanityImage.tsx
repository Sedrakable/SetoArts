import React, {
  ImgHTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./SanityImage.module.scss";
import cn from "classnames";
import { useWindowResize } from "../../../helpers/useWindowResize";
import { ICustomImage } from "../../../data";
import { urlFor } from "../../../api/useFetchPage";

export interface SanityImageProps extends ICustomImage {
  fit?: boolean;
  mobileFit?: boolean;
}
export const SanityImage: React.FC<PropsWithChildren<
  SanityImageProps & ImgHTMLAttributes<HTMLImageElement>
>> = ({ image, alt, fit, mobileFit, ...props }) => {
  const { isMobileOrTablet } = useWindowResize();
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imgWidth, setImgWidth] = useState<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "200px" } // Adjust root margin as per your requirement
      );

      observer.observe(imgRef.current);

      return () => {
        if (observer && imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }
  }, [imgRef]);

  useEffect(() => {
    if (imgRef.current) {
      // console.log(imgRef.current.offsetWidth);
      setImgWidth(imgRef.current.offsetWidth);
    }
  }, [imgRef, isVisible]);

  const src =
    image && isVisible
      ? urlFor(image)
          .width(imgWidth || 600)
          .url()
      : "";

  const handleResize = () => {
    if (imgRef.current) {
      setImgWidth(imgRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      style={{ objectFit: "cover" }}
      {...props}
    />
  );
};
