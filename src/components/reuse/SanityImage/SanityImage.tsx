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
import { useWindowResize } from "../../../helpers/useWindowResize";

type ResType = 50 | 40 | 30 | 20 | 10 | 5;
interface SanityImageProps extends ICustomImage {
  visible?: boolean;
  res?: ResType;
}

type resToWidthType = {
  [key in ResType]: number;
};

const resToWidthMobile: resToWidthType = {
  50: 1200,
  40: 1000,
  30: 800,
  20: 600,
  10: 400,
  5: 200,
};

const resToWidthTablet: resToWidthType = {
  50: 1600,
  40: 1400,
  30: 1200,
  20: 1000,
  10: 800,
  5: 400,
};

const resToWidthDesktop: resToWidthType = {
  50: 1920,
  40: 1680,
  30: 1440,
  20: 1200,
  10: 1000,
  5: 500,
};

export const SanityImage: React.FC<PropsWithChildren<
  SanityImageProps & ImgHTMLAttributes<HTMLImageElement>
>> = ({ image, alt, visible = false, res = 50, ...props }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(visible);
  const [imageWidth, setImageWidth] = useState<number>(300);
  const { isMobile, isTablet, isLaptop, isDesktop } = useWindowResize();

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
      { rootMargin: "500px" }
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
  }, []);

  useEffect(() => {
    const calculateWidth = () => {
      if (isVisible && imgRef.current) {
        // Mapping of res values to image widths

        let width = 0;
        if (isMobile) {
          width = resToWidthMobile[res];
        } else if (isTablet) {
          width = resToWidthTablet[res];
        } else if (isLaptop) {
          width = resToWidthDesktop[res];
        } else if (isDesktop) {
          width = resToWidthDesktop[res];
        }
        setImageWidth(width);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [isVisible, res, isMobile, isTablet, isLaptop, isDesktop]);

  const src =
    image && isVisible
      ? (urlFor(image) as ImageUrlBuilder)
          .auto("format")
          .width(imageWidth)
          .quality(res)
          .url()
      : "";

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading="lazy"
      style={{ objectFit: "cover", width: "100%" }}
      about={res.toString()}
      {...props}
    />
  );
};
