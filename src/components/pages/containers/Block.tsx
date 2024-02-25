import React, { PropsWithChildren } from "react";
import styles from "./Block.module.scss";

import FlexDiv from "../../reuse/FlexDiv";
import { Image } from "../../reuse/Image";
import cn from "classnames";
import { Title } from "../../reuse/Title/Title";
const bigStroke = require("../../../assets/photos/BigStroke.png");

export type BlockVariant = "grid" | "dark" | "fabric";

interface BlockProps {
  title: string;
  variant: BlockVariant;
  strokes?: boolean;
  shadow?: boolean;
}
export const Block: React.FC<PropsWithChildren<BlockProps>> = ({
  title,
  variant = "dark",
  shadow = true,
  strokes,
  children,
}) => {
  const textures: { [key: string]: React.CSSProperties } = {
    grid: {
      backgroundImage: `url(${require("../../../assets/photos/Textures/GridTexture.png")})`,
    },
    dark: { background: "var(--black)" },
    fabric: {
      backgroundPosition: "bottom",
      backgroundRepeat: "repeat-x",
      backgroundImage: `url(${require("../../../assets/photos/Textures/FabricTexture.png")})`,
    },
  };

  return (
    <FlexDiv
      customStyle={textures[variant]}
      flex={{ direction: "column" }}
      className={cn(styles.block, {
        [styles.light]: variant !== "dark" && shadow,
      })}
      gapArray={[5, 6, 6, 7]}
      padding={{ top: [6, 7, 7, 8], bottom: [8, 8, 8, 9] }}
      width100
    >
      <Title title={title} color={variant === "dark" ? "white" : "black"} />
      {strokes && variant === "dark" && (
        <div className={styles.strokes}>
          <Image src={bigStroke} alt="stroke" />
          <Image src={bigStroke} alt="stroke" />
          <Image src={bigStroke} alt="stroke" />
        </div>
      )}
      <FlexDiv className={styles.content} width100>
        {children}
      </FlexDiv>
    </FlexDiv>
  );
};
