import * as React from "react";
import styles from "./ImageGrid.module.scss";
import { ICustomImage } from "../../../../data";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import FlexDiv from "../../../reuse/FlexDiv";
import { shuffleArray } from "../../../../helpers/functions";

interface ImageGridProps {
  customImages: ICustomImage[];
  maxImages?: number;
  randomize?: boolean;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  customImages,
  maxImages,
  randomize,
}) => {
  const imagesToRender = React.useMemo(() => {
    const images = randomize ? shuffleArray(customImages) : customImages;
    return maxImages ? images.slice(0, maxImages) : images;
  }, [customImages, maxImages, randomize]);

  return (
    <div className={styles.container}>
      <FlexDiv
        className={styles.wrapper}
        width100
        padding={{ top: [1] }}
        gapArray={[1]}
      >
        {imagesToRender?.map((image, key) => {
          return (
            image && (
              <div key={key} className={styles.imgWrapper}>
                <SanityImage {...image} res={30} key={key} />
              </div>
            )
          );
        })}
      </FlexDiv>
    </div>
  );
};
