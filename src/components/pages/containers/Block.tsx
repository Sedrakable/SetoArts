import React, { PropsWithChildren } from "react";
import styles from "./Block.module.scss";

import { FlexDiv } from "../../reuse/FlexDiv";
import { Heading } from "../../reuse/Heading";
import { Image } from "../../reuse/Image";
import cn from "classnames";
const stroke = require("../../../assets/photos/TitleStroke.png");

export const tabTexts: string[] = ["home", "services", "about + work"];

interface BlockProps {
  title: string;
  variant: "grid" | "dark" | "fabric";
}
export const Block: React.FC<PropsWithChildren<BlockProps>> = ({
  title,
  variant = "dark",
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
      className={cn(styles.block, { [styles.light]: variant !== "dark" })}
      gapArray={[5, 6, 6, 7]}
      padding={{ top: [6, 7, 7, 8], bottom: [8, 8, 8, 9] }}
      width100
    >
      <FlexDiv className={styles.title} padding={{ horizontal: [5, 6, 6, 7] }}>
        <Heading
          font="Seto"
          as="h2"
          level="2"
          color={variant === "dark" ? "white" : "black"}
          className={styles.heading}
        >
          {title}
        </Heading>
        <Image src={stroke} alt="stroke" />
      </FlexDiv>
      <FlexDiv className={styles.content} width100>
        {children}
      </FlexDiv>
    </FlexDiv>
  );
};
