import React from "react";
import styles from "./Services.module.scss";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { Block } from "../../containers/Block";
import { IService, IServices } from "../../../../data";
import { Icon, IconType } from "../../../reuse/Icon";
import { Tag } from "../../../reuse/Tag";
import { Button } from "../../../reuse/Button";
import { Splider, SpliderProps } from "../../containers/Splider";

const icons: IconType[] = ["bulb", "layout", "package", "palette"];

export interface ServiceProps extends IService {
  number: number;
}
const Service: React.FC<ServiceProps> = ({
  number,
  title,
  features,
  ctas,
  price,
}) => {
  const [tagIndex, setTagIndex] = React.useState(0);

  const updateChildState = (newState: number) => {
    setTagIndex(newState);
  };

  const splides: SpliderProps[] = features?.map((feature) => {
    return {
      customImage: {
        image: feature.customImage.image,
        alt: feature.customImage.alt,
      },
    };
  });

  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start" }}
      width100
      className={styles.container}
    >
      <FlexDiv
        gapArray={[4]}
        width100
        flex={{ x: "flex-start" }}
        className={styles.top}
        padding={{ horizontal: [4], vertical: [2] }}
      >
        <Icon icon={icons[number]} size="regular" />
        <Heading font="Seto" level="5" as="h5">
          {title}
        </Heading>
      </FlexDiv>
      <FlexDiv width100 className={styles.middle}>
        <Splider
          slides={splides}
          splideProgress={tagIndex}
          setSplideProgress={updateChildState}
        />
      </FlexDiv>

      <FlexDiv
        gapArray={[5]}
        width100
        flex={{ direction: "column", x: "flex-start", y: "space-between" }}
        padding={{ horizontal: [4], vertical: [3] }}
        className={styles.content}
      >
        <FlexDiv
          className={styles.tags}
          gapArray={[1]}
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        >
          {features?.map((feature, key) => {
            return (
              <Tag
                chosen={tagIndex === key}
                key={key}
                onClick={() => setTagIndex(key)}
              >
                {feature.title}
              </Tag>
            );
          })}
        </FlexDiv>
        <FlexDiv
          gapArray={[2]}
          width100
          flex={{ direction: "column", x: "flex-start" }}
          className={styles.botton}
        >
          {price && (
            <FlexDiv gapArray={[2]}>
              <Heading font="Cursive" level="5" as="h3" color="yellow">
                $
              </Heading>
              <Heading font="Seto" level="5" as="h5" color="black">
                {price.toString()}
              </Heading>
            </FlexDiv>
          )}
          {/* {FIX: needs link} */}
          <Button variant="primary" fit="grow">
            {ctas?.cta1.text}
          </Button>
          {ctas?.cta2 && (
            <Button variant="secondary" fit="grow">
              {ctas.cta2.text}
            </Button>
          )}
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  );
};

export const Services: React.FC<IServices> = ({ title, services }) => {
  return (
    <Block title={title} variant="grid">
      <FlexDiv
        gapArray={[4]}
        flex={{ y: "flex-start" }}
        width100
        className={styles.services}
      >
        {services?.map((service: IService, key) => {
          return <Service {...service} key={key} number={key} />;
        })}
      </FlexDiv>
    </Block>
  );
};
