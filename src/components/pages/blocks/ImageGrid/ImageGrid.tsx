import * as React from "react";
import styles from "./ImageGrid.module.scss";
import { ICustomImage } from "../../../../data";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import FlexDiv from "../../../reuse/FlexDiv";

interface ImageGridProps {
  customImages: ICustomImage[];
}

export const ImageGrid: React.FC<ImageGridProps> = ({ customImages }) => {
  return (
    <FlexDiv
      className={styles.wrapper}
      width100
      flex={{ x: "flex-start", y: "flex-start" }}
      padding={{ top: [1] }}
      gapArray={[1]}
      wrap
    >
      {customImages.map((image, key) => {
        return (
          <SanityImage
            {...image}
            key={key}
            style={{
              objectFit: "cover",
            }}
          />
        );
      })}
    </FlexDiv>
  );
};
